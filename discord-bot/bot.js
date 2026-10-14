import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  PermissionFlagsBits
} from 'discord.js';
import * as db from '../lib/db.js';

const SITE_URL = process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || 'https://lg-economy.onrender.com';
const PAYOUT_HOUR = 18;
const PAYOUT_MINUTE = 30;
const EPHEMERAL = { flags: MessageFlags.Ephemeral };

// 8 Activity Tiers & 24h Salaries (все остальные — 0)
const ACTIVITY_ROLES = [
  { tag: "act+10", name: "Превосходный актив", salary: 450 },
  { tag: "act+9", name: "Крайне высокий актив", salary: 300 },
  { tag: "act+8", name: "Очень хороший актив", salary: 210 },
  { tag: "act+7", name: "Отличный актив", salary: 120 },
  { tag: "act+6", name: "Высокий актив", salary: 100 },
  { tag: "act+5", name: "Хороший актив", salary: 80 },
  { tag: "act+4", name: "Нормальный актив", salary: 50 },
  { tag: "act+3", name: "Не особый актив", salary: 30 }
];

// Helper to detect a member's highest activity tier role
function getMemberActivityRole(member) {
  if (!member || !member.roles || !member.roles.cache) return null;
  for (const roleTier of ACTIVITY_ROLES) {
    const hasRole = member.roles.cache.some(r => {
      const name = r.name.toLowerCase();
      return name.includes(roleTier.tag.toLowerCase()) ||
             name.includes(roleTier.name.toLowerCase());
    });
    if (hasRole) return roleTier;
  }
  return null;
}

// Helper to check if member is Leader / Administrator
function isLeader(member, guild) {
  if (!member) return false;
  if (guild && guild.ownerId === member.id) return true;
  return member.permissions?.has(PermissionFlagsBits.Administrator) || false;
}

const memberProfile = (member) => ({
  username: member.displayName || member.user.username,
  avatar: member.user.displayAvatarURL({ size: 128 }),
});

const displayName = (user, member) => member?.displayName || user.globalName || user.username;

async function syncGuildMembers(guild) {
  const members = await guild.members.fetch();
  const items = [...members.values()]
    .filter(m => !m.user.bot)
    .map(m => ({ id: m.id, amount: 0, ...memberProfile(m) }));
  for (let i = 0; i < items.length; i += 500) {
    await db.addBalances(items.slice(i, i + 500));
  }
  return items.length;
}

// Initialize Discord Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.GuildMember]
});

// Define Slash Commands
const commands = [
  new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Проверить баланс монет в экономике LG'),

  new SlashCommandBuilder()
    .setName('upgrader')
    .setDescription('Ссылка на Hi-Tech сайт Upgrader монет'),

  new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Показать тарифную сетку уровней активности и зарплат'),

  new SlashCommandBuilder()
    .setName('pay')
    .setDescription('Перевести монеты другому участнику сервера')
    .addUserOption(opt => opt.setName('user').setDescription('Кому перевести').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('Сумма монет').setRequired(true).setMinValue(1)),

  new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Топ богатейших участников сообщества LG'),

  new SlashCommandBuilder()
    .setName('payout')
    .setDescription('⚡ [Лидер] Начислить суточную зарплату всем участникам по их ролям прямо сейчас')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName('setup_roles')
    .setDescription('🛠️ Автоматически создать 8 ролей активности на сервере ([act+10] - [act+3])')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName('give')
    .setDescription('👑 [Лидер] Начислить монеты конкретному пользователю')
    .addUserOption(opt => opt.setName('user').setDescription('Кому начислить').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('Количество монет').setRequired(true).setMinValue(1))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
];

async function payGuildSalaries(guild) {
  const members = await guild.members.fetch();
  const items = [];
  for (const member of members.values()) {
    if (member.user.bot) continue;
    const role = getMemberActivityRole(member);
    if (role && role.salary > 0) items.push({ id: member.id, amount: role.salary, ...memberProfile(member) });
  }
  await db.addBalances(items);
  return items.length;
}

async function announcePayout(guild, paidCount) {
  if (paidCount === 0) return;
  const channel = guild.systemChannel || guild.channels.cache.find(c =>
    c.isTextBased() && (c.name.includes('основн') || c.name.includes('general') || c.name.includes('чат') || c.name.includes('бот'))
  );
  if (!channel) return;
  const embed = new EmbedBuilder()
    .setColor('#00F0FF')
    .setTitle('⚡ СУТОЧНАЯ ВЫПЛАТА ЗАРПЛАТ [18:30]')
    .setDescription(`Каждые 24 часа в **18:30** бот начисляет монеты всем участникам по активным ролям.\nВыплачено участникам: **${paidCount}**`)
    .setFooter({ text: 'LG ECONOMY 2026 // Прозрачная система' });
  await channel.send({ embeds: [embed] }).catch(() => {});
}

const todayLocal = () => new Date().toLocaleDateString('sv-SE');

// scheduled=true → at most once per guild per day (tracked in Supabase), safe across restarts/redeploys
async function processDailySalaries({ scheduled }) {
  console.log(`⚡ [SALARY] Запуск ${scheduled ? 'плановой' : 'ручной'} выплаты зарплат по ролям активности...`);
  const today = todayLocal();
  for (const guild of client.guilds.cache.values()) {
    if (scheduled && !(await db.claimPayout(guild.id, today))) {
      console.log(`ℹ️ [SALARY] ${guild.name}: выплата за ${today} уже была`);
      continue;
    }
    try {
      const paidCount = await payGuildSalaries(guild);
      console.log(`✅ [SALARY] ${guild.name}: выплачено участникам: ${paidCount}`);
      await announcePayout(guild, paidCount);
    } catch (err) {
      console.error(`Ошибка начисления зарплат для гильдии ${guild.id}:`, err);
      if (scheduled) await db.releasePayout(guild.id, today).catch(() => {});
    }
  }
}

function payoutTimeToday() {
  const t = new Date();
  t.setHours(PAYOUT_HOUR, PAYOUT_MINUTE, 0, 0);
  return t;
}

function scheduleDailySalary() {
  const target = payoutTimeToday();
  if (Date.now() >= target.getTime()) target.setDate(target.getDate() + 1);
  const delay = target.getTime() - Date.now();
  console.log(`⏰ [SCHEDULE] Следующая автоматическая выплата: ${target.toLocaleString('ru-RU')} (через ${Math.round(delay / 60000)} мин)`);
  setTimeout(async () => {
    await processDailySalaries({ scheduled: true }).catch(err => console.error('Ошибка плановой выплаты:', err));
    scheduleDailySalary();
  }, delay);
}

async function registerGuildCommands(rest, guild) {
  await rest.put(
    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guild.id),
    { body: commands.map(c => c.toJSON()) }
  );
  console.log(`⚡ Слэш-команды зарегистрированы для сервера: ${guild.name}`);
}

client.once(Events.ClientReady, async () => {
  console.log(`🤖 Бот LG ECONOMY запущен под именем: ${client.user.tag}`);
  console.log(`🔗 Ссылка для добавления бота: https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`);

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
  for (const guild of client.guilds.cache.values()) {
    try {
      await registerGuildCommands(rest, guild);
      const synced = await syncGuildMembers(guild);
      console.log(`👥 ${guild.name}: синхронизировано ${synced} участников в Supabase`);
    } catch (err) {
      console.warn(`Не удалось подготовить сервер ${guild.name}:`, err.message);
    }
  }

  // Catch up if the service was asleep/restarting at 18:30 today
  if (Date.now() >= payoutTimeToday().getTime()) {
    await processDailySalaries({ scheduled: true }).catch(err => console.error('Ошибка догоняющей выплаты:', err));
  }
  scheduleDailySalary();
});

client.on(Events.GuildCreate, async (guild) => {
  console.log(`📥 Бот добавлен на новый сервер: ${guild.name} (ID: ${guild.id})`);
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
  try {
    await registerGuildCommands(rest, guild);
    await syncGuildMembers(guild);
  } catch (err) {
    console.error(`Ошибка подготовки сервера ${guild.name}:`, err.message);
  }
});

client.on(Events.GuildMemberAdd, async (member) => {
  if (member.user.bot) return;
  await db.addBalance(member.id, 0, memberProfile(member).username, memberProfile(member).avatar).catch(() => {});
});

function leaderboardText(rows) {
  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
  return rows.map((u, i) => `${medals[i] || `${i + 1}.`} **${u.username || 'Участник'}** — \`${u.balance.toLocaleString('ru-RU')} 🪙\``).join('\n') || 'Пока нет данных.';
}

const rolesText = () =>
  ACTIVITY_ROLES.map(r => `\`[${r.tag}]\` — **${r.name}**: \`${r.salary} 🪙 / 24ч\``).join('\n') + '\n*Все остальные роли — 0 🪙.*';

const dbErrorText = (err) => `❌ ${err.userMessage || 'Ошибка базы данных, попробуйте позже.'}`;

// Command Handlers
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  const userId = interaction.user.id;
  const username = displayName(interaction.user, interaction.member);
  console.log(`📥 [COMMAND] /${commandName} от ${username} (${userId})`);

  try {
    if (commandName === 'balance') {
      const bal = await db.getBalance(userId);
      const embed = new EmbedBuilder()
        .setColor('#00F0FF')
        .setTitle('⚡ БАЛАНС МОНЕТ // LG ECONOMY')
        .setDescription(`Участник: **${username}**\nТекущий баланс: **${bal.toLocaleString('ru-RU')} 🪙**`)
        .setFooter({ text: 'LG ECONOMY 2026 // Прозрачная система' });
      return interaction.reply({ embeds: [embed] });
    }

    if (commandName === 'roles') {
      const embed = new EmbedBuilder()
        .setColor('#00F0FF')
        .setTitle('📊 ТАРИФНАЯ СЕТКА АКТИВНОСТИ И ЗАРПЛАТ')
        .setDescription(rolesText())
        .setFooter({ text: 'Каждый день в 18:30 бот начисляет выплату на баланс' });
      return interaction.reply({ embeds: [embed] });
    }

    if (commandName === 'upgrader') {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel('Открыть UPGRADER 2.0').setStyle(ButtonStyle.Link).setURL(SITE_URL)
      );
      const embed = new EmbedBuilder()
        .setColor('#00F0FF')
        .setTitle('🚀 UPGRADER МОНЕТ LG ECONOMY')
        .setDescription('Апгрейдите свои монеты с множителями до **x96** на официальном сайте!')
        .setFooter({ text: 'Вход на сайте через Discord — баланс общий с ботом' });
      return interaction.reply({ embeds: [embed], components: [row] });
    }

    if (commandName === 'payout') {
      if (!isLeader(interaction.member, interaction.guild)) {
        return interaction.reply({ content: '❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.', ...EPHEMERAL });
      }
      await interaction.deferReply(EPHEMERAL);
      await processDailySalaries({ scheduled: false });
      return interaction.editReply({ content: '✅ Выплаты зарплат по ролям активности начислены всем участникам!' });
    }

    if (commandName === 'pay') {
      const targetUser = interaction.options.getUser('user');
      const amount = interaction.options.getInteger('amount');
      if (targetUser.bot) return interaction.reply({ content: '❌ Нельзя переводить монеты ботам.', ...EPHEMERAL });

      const targetMember = interaction.options.getMember('user');
      try {
        await db.transfer(userId, targetUser.id, amount, username, displayName(targetUser, targetMember));
      } catch (err) {
        if (err instanceof db.DbError && err.userMessage) return interaction.reply({ content: dbErrorText(err), ...EPHEMERAL });
        throw err;
      }
      return interaction.reply({
        content: `💸 **${username}** успешно перевёл **${amount.toLocaleString('ru-RU')} 🪙** пользователю <@${targetUser.id}>!`
      });
    }

    if (commandName === 'leaderboard') {
      const rows = await db.leaderboard(5);
      const embed = new EmbedBuilder()
        .setColor('#00F0FF')
        .setTitle('🏆 ТОП БОГАТЕЙШИХ УЧАСТНИКОВ LG')
        .setDescription(leaderboardText(rows));
      return interaction.reply({ embeds: [embed] });
    }

    if (commandName === 'setup_roles') {
      await interaction.deferReply();
      const guild = interaction.guild;
      if (!guild) return interaction.editReply('❌ Команда доступна только на сервере.');

      const existingRoles = await guild.roles.fetch();
      const created = [];
      const colors = ['#FFD700', '#FF4500', '#9932CC', '#1E90FF', '#00CED1', '#32CD32', '#708090', '#A9A9A9'];

      for (let i = 0; i < ACTIVITY_ROLES.length; i++) {
        const tier = ACTIVITY_ROLES[i];
        const roleName = `[${tier.tag}] ${tier.name}`;
        const exists = existingRoles.some(r => r.name.toLowerCase().includes(tier.tag.toLowerCase()));
        if (exists) {
          created.push(`ℹ️ Роль уже есть: **${roleName}**`);
          continue;
        }
        try {
          const newRole = await guild.roles.create({ name: roleName, color: colors[i], reason: 'LG ECONOMY Activity Tier' });
          created.push(`✅ Создана роль: **${newRole.name}** (\`${tier.salary} 🪙/24ч\`)`);
        } catch (err) {
          created.push(`⚠️ Ошибка создания ${roleName}: ${err.message}`);
        }
      }

      return interaction.editReply({
        content: `🎉 **Настройка 8 ролей активности завершена:**\n${created.join('\n')}\n\n👉 Назначьте нужные роли участникам, чтобы они получали суточную зарплату!`
      });
    }

    if (commandName === 'give') {
      if (!isLeader(interaction.member, interaction.guild)) {
        return interaction.reply({ content: '❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.', ...EPHEMERAL });
      }
      const targetUser = interaction.options.getUser('user');
      const amount = interaction.options.getInteger('amount');
      const newBal = await db.addBalance(targetUser.id, amount, displayName(targetUser, interaction.options.getMember('user')));
      return interaction.reply({
        content: `👑 **[ЛИДЕР]** Начислено **+${amount.toLocaleString('ru-RU')} 🪙** пользователю <@${targetUser.id}>!\nНовый баланс участника: **${newBal.toLocaleString('ru-RU')} 🪙**.`
      });
    }
  } catch (err) {
    console.error(`Ошибка команды /${commandName}:`, err);
    const payload = { content: dbErrorText(err), ...EPHEMERAL };
    if (interaction.deferred || interaction.replied) await interaction.editReply(payload).catch(() => {});
    else await interaction.reply(payload).catch(() => {});
  }
});

// Text Message Commands Fallback (!balance, !roles, !pay, !leaderboard, !give, etc.)
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const content = message.content?.trim() || '';
  const isMention = message.mentions.has(client.user.id);
  const isPrefix = content.startsWith('!') || content.startsWith('.');
  if (!isMention && !isPrefix) return;

  const clean = content
    .replace(new RegExp(`^<@!?${client.user.id}>`), '')
    .trim()
    .replace(/^[!\.]/, '')
    .trim();

  const [cmdRaw, ...args] = clean.split(/\s+/);
  const cmd = cmdRaw?.toLowerCase();
  const authorName = displayName(message.author, message.member);
  const parseAmount = () => {
    const arg = args.find(a => !a.startsWith('<@') && /^\d+$/.test(a));
    return arg ? parseInt(arg, 10) : 0;
  };

  try {
    if (cmd === 'balance' || cmd === 'баланс') {
      const bal = await db.getBalance(message.author.id);
      return message.reply(`⚡ Твой баланс в LG ECONOMY: **${bal.toLocaleString('ru-RU')} 🪙**`);
    }

    if (cmd === 'roles' || cmd === 'роли') {
      return message.reply(`📊 **Тарифная сетка активности и зарплат:**\n${rolesText()}`);
    }

    if (cmd === 'daily') {
      return message.reply('ℹ️ Ручной сбор зарплаты не требуется! Монеты по вашей роли начисляются автоматически каждый день в **18:30**.');
    }

    if (cmd === 'pay' || cmd === 'перевод') {
      const targetUser = message.mentions.users.filter(u => u.id !== client.user.id).first();
      const amount = parseAmount();
      if (!targetUser) return message.reply('❌ Укажите пользователя через тег: `!pay @user сумма`');
      if (!amount) return message.reply('❌ Укажите корректную сумму монет для перевода: `!pay @user сумма`');
      if (targetUser.bot) return message.reply('❌ Нельзя переводить монеты ботам.');

      try {
        await db.transfer(message.author.id, targetUser.id, amount, authorName, displayName(targetUser, message.mentions.members?.get(targetUser.id)));
      } catch (err) {
        if (err instanceof db.DbError && err.userMessage) return message.reply(dbErrorText(err));
        throw err;
      }
      return message.reply(`💸 **${authorName}** успешно перевёл **${amount.toLocaleString('ru-RU')} 🪙** пользователю <@${targetUser.id}>!`);
    }

    if (cmd === 'leaderboard' || cmd === 'топ') {
      const embed = new EmbedBuilder()
        .setColor('#00F0FF')
        .setTitle('🏆 ТОП БОГАТЕЙШИХ УЧАСТНИКОВ LG ECONOMY')
        .setDescription(leaderboardText(await db.leaderboard(5)));
      return message.reply({ embeds: [embed] });
    }

    if (cmd === 'give' || cmd === 'выдать') {
      if (!isLeader(message.member, message.guild)) {
        return message.reply('❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.');
      }
      const targetUser = message.mentions.users.filter(u => u.id !== client.user.id).first();
      const amount = parseAmount();
      if (!targetUser) return message.reply('❌ Укажите пользователя: `!give @user сумма`');
      if (!amount) return message.reply('❌ Укажите сумму монет: `!give @user сумма`');

      const newBal = await db.addBalance(targetUser.id, amount, displayName(targetUser, message.mentions.members?.get(targetUser.id)));
      return message.reply(`👑 **[ЛИДЕР]** Начислено **+${amount.toLocaleString('ru-RU')} 🪙** пользователю <@${targetUser.id}>!\nНовый баланс участника: **${newBal.toLocaleString('ru-RU')} 🪙**.`);
    }

    if (cmd === 'upgrader' || cmd === 'сайт') {
      return message.reply(`🚀 **Официальный Upgrader LG ECONOMY:**\n${SITE_URL}`);
    }

    if (cmd === 'payout') {
      if (!isLeader(message.member, message.guild)) {
        return message.reply('❌ **Доступ запрещен!** Ручной запуск выплат доступен только Лидеру / Администратору сервера.');
      }
      await message.reply('⚡ Запускаю выплаты по ролям активности...');
      await processDailySalaries({ scheduled: false });
      return message.reply('✅ Выплаты зарплат по ролям активности начислены всем участникам!');
    }

    if (cmd === 'help' || cmd === 'помощь' || isMention) {
      return message.reply(
        `🤖 **LG ECONOMY Бот на связи!**\n\n` +
        `Команды для всех (работают со слэшем \`/\` или префиксом \`!\`):\n` +
        `• \`/balance\` или \`!balance\` — проверить баланс монет\n` +
        `• \`/roles\` или \`!roles\` — тарифная сетка 8 уровней активности (выплата каждый день в 18:30)\n` +
        `• \`/pay @user сумма\` или \`!pay @user сумма\` — перевести монеты\n` +
        `• \`/leaderboard\` или \`!leaderboard\` — топ богатейших участников\n` +
        `• \`/upgrader\` или \`!upgrader\` — ссылка на сайт Upgrader\n\n` +
        `👑 **Команды Лидера / Администратора:**\n` +
        `• \`/give @user сумма\` или \`!give @user сумма\` — начислить монеты участнику\n` +
        `• \`/payout\` или \`!payout\` — запустить выплаты всем прямо сейчас\n` +
        `• \`/setup_roles\` — создать все 8 ролей активности автоматически`
      );
    }
  } catch (err) {
    console.error(`Ошибка команды !${cmd}:`, err);
    await message.reply(dbErrorText(err)).catch(() => {});
  }
});

client.on(Events.Error, (err) => console.error('Discord client error:', err));

if (process.env.DISCORD_BOT_TOKEN) {
  client.login(process.env.DISCORD_BOT_TOKEN).catch((err) => {
    console.error('❌ Не удалось войти ботом в Discord:', err.message);
    if (/disallowed intents/i.test(err.message)) {
      console.error('👉 Включите Server Members Intent и Message Content Intent: Discord Developer Portal → Bot → Privileged Gateway Intents.');
    }
  });
} else {
  console.log('ℹ️ DISCORD_BOT_TOKEN не задан — бот не запущен.');
}
