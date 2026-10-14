import { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  REST, 
  Routes, 
  SlashCommandBuilder, 
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DB_PATH = path.join(__dirname, 'economy.json');

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


// Local JSON Database Helper
function loadLocalDB() {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify({ users: {}, logs: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf-8'));
}

function saveLocalDB(data) {
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
}

// User Balance getters and setters (Supabase or Local DB)
async function getUserBalance(discordId, username = "User") {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/users?discord_id=eq.${discordId}`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      const data = await res.json();
      if (data && data.length > 0) return data[0].balance;

      // create new user
      await fetch(`${SUPABASE_URL}/rest/v1/users`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ discord_id: discordId, username, balance: 0 })
      });
      return 0;
    } catch (e) {
      console.warn("Supabase fetch error, fallback to local:", e);
    }
  }

  // Fallback to local JSON
  const db = loadLocalDB();
  if (!db.users[discordId]) {
    db.users[discordId] = { username, balance: 0, lastDaily: 0 };
    saveLocalDB(db);
  }
  return db.users[discordId].balance;
}

async function addBalance(discordId, amount, username = "User") {
  const current = await getUserBalance(discordId, username);
  const updated = Math.max(0, current + amount);

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/users?discord_id=eq.${discordId}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ balance: updated, updated_at: new Date().toISOString() })
      });
      return updated;
    } catch (e) {
      console.warn("Supabase update error:", e);
    }
  }

  const db = loadLocalDB();
  if (!db.users[discordId]) {
    db.users[discordId] = { username, balance: 0, lastDaily: 0 };
  }
  db.users[discordId].balance = updated;
  saveLocalDB(db);
  return updated;
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
    .addIntegerOption(opt => opt.setName('amount').setDescription('Сумма монет').setRequired(true)),

  new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Топ богатейших участников сообщества LG'),

  new SlashCommandBuilder()
    .setName('payout')
    .setDescription('⚡ Начислить суточную зарплату всем участникам по их ролям прямо сейчас'),

  new SlashCommandBuilder()
    .setName('setup_roles')
    .setDescription('🛠️ Автоматически создать 8 ролей активности на сервере ([act+10] - [act+3])'),

  new SlashCommandBuilder()
    .setName('give')
    .setDescription('👑 [Лидер] Начислить монеты конкретному пользователю')
    .addUserOption(opt => opt.setName('user').setDescription('Кому начислить').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('Количество монет').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
];

// Automatic 24h Salary Payout Loop
async function processDailySalaries() {
  console.log("⚡ [AUTO-SALARY] Запуск ежедневной выплаты зарплат по ролям активности...");
  for (const guild of client.guilds.cache.values()) {
    try {
      const members = await guild.members.fetch();
      let paidCount = 0;
      for (const [id, member] of members) {
        if (member.user.bot) continue;

        // Find member's highest activity tier
        const role = getMemberActivityRole(member);
        if (role && role.salary > 0) {
          await addBalance(id, role.salary, member.user.username);
          paidCount++;
        }
      }
      console.log(`✅ [AUTO-SALARY] Зарплаты успешно начислены на сервере: ${guild.name} (выплачено участникам: ${paidCount})`);
      
      // Optional: Send announcement in general channel if found
      const channel = guild.systemChannel || guild.channels.cache.find(c => 
        c.isTextBased() && (c.name.includes('основн') || c.name.includes('general') || c.name.includes('чат') || c.name.includes('бот'))
      );
      if (channel && paidCount > 0) {
        try {
          const embed = new EmbedBuilder()
            .setColor('#00F0FF')
            .setTitle('⚡ СУТОЧНАЯ ВЫПЛАТА ЗАРПЛАТ [18:30]')
            .setDescription(`Каждые 24 часа в **18:30** бот начисляет монеты всем участникам по активным ролям.\nВыплачено участникам: **${paidCount}**`)
            .setFooter({ text: 'LG ECONOMY 2026 // Прозрачная система' });
          await channel.send({ embeds: [embed] });
        } catch (e) {}
      }
    } catch (err) {
      console.error(`Ошибка начисления зарплат для гильдии ${guild.id}:`, err);
    }
  }
}

// Precise 18:30 Daily Schedule (без сдвигов таймера)
function scheduleDailySalaryAt1830() {
  function getMsUntil1830() {
    const now = new Date();
    const target = new Date(now);
    target.setHours(18, 30, 0, 0);
    if (now.getTime() >= target.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    return target.getTime() - now.getTime();
  }

  function planNextRun() {
    const delay = getMsUntil1830();
    const targetDate = new Date(Date.now() + delay);
    console.log(`⏰ [SCHEDULE-18:30] Следующая автоматическая выплата: ${targetDate.toLocaleString('ru-RU')} (через ${Math.round(delay / 60000)} мин)`);

    setTimeout(async () => {
      console.log('⚡ [AUTO-18:30] Время 18:30! Запуск суточной выплаты зарплат по ролям активности...');
      try {
        await processDailySalaries();
      } catch (err) {
        console.error('Ошибка в автоматической выплате в 18:30:', err);
      }
      planNextRun();
    }, delay);
  }

  planNextRun();
}

// Bot Ready Event
client.once('ready', async () => {
  console.log(`🤖 Бот LG ECONOMY запущен под именем: ${client.user.tag}`);
  console.log(`🌐 Бот находится на серверах (${client.guilds.cache.size}):`);
  for (const guild of client.guilds.cache.values()) {
    console.log(`   - ${guild.name} (ID: ${guild.id})`);
  }

  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
  console.log(`🔗 Ссылка для добавления бота на сервер: ${inviteUrl}`);

  // Register Slash Commands: Global + Per-Guild for instant availability
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');
  try {
    if (process.env.DISCORD_CLIENT_ID) {
      // 1. Global registration
      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
        { body: commands.map(c => c.toJSON()) }
      );
      
      // 2. Instant Guild registration for all active guilds (no 1-hour delay)
      for (const guild of client.guilds.cache.values()) {
        try {
          await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guild.id),
            { body: commands.map(c => c.toJSON()) }
          );
          console.log(`⚡ Слэш-команды мгновенно зарегистрированы для сервера: ${guild.name}`);
          
          console.log(`📋 Роли на сервере "${guild.name}":`);
          const roles = await guild.roles.fetch();
          roles.forEach(r => {
            if (r.name !== '@everyone') console.log(`   - "${r.name}" (ID: ${r.id})`);
          });

          // Sync server members into economy DB for website leaderboard & transfers
          const members = await guild.members.fetch();
          const db = loadLocalDB();
          for (const [id, member] of members) {
            if (member.user.bot) continue;
            const displayName = member.displayName || member.user.username;
            const avatar = member.user.displayAvatarURL({ size: 128 });
            if (!db.users[id]) {
              db.users[id] = { username: displayName, balance: 0, avatar, lastDaily: 0 };
            } else {
              db.users[id].username = displayName;
              db.users[id].avatar = avatar;
            }
          }
          saveLocalDB(db);
          console.log(`👥 Синхронизировано ${members.filter(m => !m.user.bot).size} участников сервера в базу экономики`);
        } catch (err) {
          console.warn(`Не удалось зарегистрировать команды для сервера ${guild.name}:`, err.message);
        }
      }
      console.log('✅ Слэш-команды (/balance, /roles, /upgrader, /pay, /leaderboard, /payout, /give, /setup_roles) готовы!');
    }
  } catch (e) {
    console.warn('Регистрация слэш-команд пропущена:', e.message);
  }

  // Schedule auto-salary every 24 hours at 18:30
  scheduleDailySalaryAt1830();
});

// Auto-register commands when invited to a new guild
client.on('guildCreate', async (guild) => {
  console.log(`📥 Бот добавлен на новый сервер: ${guild.name} (ID: ${guild.id})`);
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guild.id),
      { body: commands.map(c => c.toJSON()) }
    );
    console.log(`⚡ Слэш-команды мгновенно зарегистрированы для сервера: ${guild.name}`);
  } catch (err) {
    console.error(`Ошибка регистрации команд для ${guild.name}:`, err.message);
  }
});

// Command Handlers
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  const userId = interaction.user.id;
  const username = interaction.user.username;
  console.log(`📥 [COMMAND] Вызов /${commandName} от пользователя: ${username} (${userId}) на канале #${interaction.channel?.name || 'DM'}`);


  if (commandName === 'balance') {
    const bal = await getUserBalance(userId, username);
    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('⚡ БАЛАНС МОНЕТ // LG ECONOMY')
      .setDescription(`Участник: **${username}**\nТекущий баланс: **${bal.toLocaleString()} 🪙**`)
      .setFooter({ text: 'LG ECONOMY 2026 // Прозрачная система' });

    return interaction.reply({ embeds: [embed] });
  }

  if (commandName === 'roles') {
    const list = ACTIVITY_ROLES.map(r => `\`[${r.tag}]\` — **${r.name}**: \`${r.salary} 🪙 / 24ч\``).join('\n') + '\n*Все остальные роли — 0 🪙.*';
    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('📊 ТАРИФНАЯ СЕТКА АКТИВНОСТИ И ЗАРПЛАТ')
      .setDescription(list)
      .setFooter({ text: 'Каждые 24 часа бот начисляет выплату на баланс' });

    return interaction.reply({ embeds: [embed] });
  }

  if (commandName === 'upgrader') {
    const siteUrl = process.env.UPGRADER_WEBSITE_URL || 'https://lg-economy.onrender.com';
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Открыть UPGRADER 2.0')
        .setStyle(ButtonStyle.Link)
        .setURL(siteUrl)
    );

    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('🚀 UPGRADER МОНЕТ LG ECONOMY')
      .setDescription('Апгрейдите свои монеты с множителями до **x50** на официальном сайте!')
      .setFooter({ text: 'Синхронизация баланса через Discord OAuth2' });

    return interaction.reply({ embeds: [embed], components: [row] });
  }

  if (commandName === 'payout') {
    await interaction.deferReply({ ephemeral: true });
    await processDailySalaries();
    return interaction.editReply({ content: '✅ Ежедневные выплаты зарплат по ролям активности успешно начислены всем участникам сервера!' });
  }

  if (commandName === 'pay') {
    const targetUser = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    if (amount <= 0) return interaction.reply({ content: 'Сумма перевода должна быть больше 0!', ephemeral: true });
    if (targetUser.id === userId) return interaction.reply({ content: 'Нельзя переводить монеты самому себе!', ephemeral: true });

    const senderBal = await getUserBalance(userId, username);
    if (senderBal < amount) return interaction.reply({ content: 'У вас недостаточно монет!', ephemeral: true });

    await addBalance(userId, -amount, username);
    await addBalance(targetUser.id, amount, targetUser.username);

    return interaction.reply({
      content: `💸 **${username}** успешно перевёл **${amount.toLocaleString()} 🪙** пользователю <@${targetUser.id}>!`
    });
  }

  if (commandName === 'leaderboard') {
    const db = loadLocalDB();
    const sorted = Object.entries(db.users)
      .sort(([, a], [, b]) => b.balance - a.balance)
      .slice(0, 5);

    const text = sorted.map(([id, u], i) => `${i + 1}. **${u.username}** — \`${u.balance.toLocaleString()} 🪙\``).join('\n') || 'Пока нет данных.';

    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('🏆 ТОП БОГАТЕЙШИХ УЧАСТНИКОВ LG')
      .setDescription(text);

    return interaction.reply({ embeds: [embed] });
  }

  if (commandName === 'setup_roles') {
    await interaction.deferReply();
    const guild = interaction.guild;
    if (!guild) return interaction.editReply('❌ Команда доступна только на сервере.');

    const existingRoles = await guild.roles.fetch();
    const created = [];
    const colors = [
      '#FFD700', // act+10 Gold
      '#FF4500', // act+9 OrangeRed
      '#9932CC', // act+8 DarkOrchid
      '#1E90FF', // act+7 DodgerBlue
      '#00CED1', // act+6 DarkTurquoise
      '#32CD32', // act+5 LimeGreen
      '#708090', // act+4 SlateGray
      '#A9A9A9', // act+3 DarkGray
    ];

    for (let i = 0; i < ACTIVITY_ROLES.length; i++) {
      const tier = ACTIVITY_ROLES[i];
      const roleName = `[${tier.tag}] ${tier.name}`;
      const exists = existingRoles.some(r => r.name.toLowerCase().includes(tier.tag.toLowerCase()));
      if (!exists) {
        try {
          const newRole = await guild.roles.create({
            name: roleName,
            color: colors[i] || '#00F0FF',
            reason: 'LG ECONOMY Activity Tier'
          });
          created.push(`✅ Создана роль: **${newRole.name}** (\`${tier.salary} 🪙/24ч\`)`);
        } catch (err) {
          created.push(`⚠️ Ошибка создания ${roleName}: ${err.message}`);
        }
      } else {
        created.push(`ℹ️ Роль уже есть: **${roleName}**`);
      }
    }

    return interaction.editReply({
      content: `🎉 **Настройка 8 ролей активности завершена:**\n${created.join('\n')}\n\n👉 Назначьте нужные роли участникам, чтобы они получали суточную зарплату!`
    });
  }

  if (commandName === 'give') {
    if (!isLeader(interaction.member, interaction.guild)) {
      return interaction.reply({
        content: '❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.',
        ephemeral: true
      });
    }

    const targetUser = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    if (!targetUser) return interaction.reply({ content: 'Укажите пользователя.', ephemeral: true });
    if (!amount || amount <= 0) return interaction.reply({ content: 'Сумма монет должна быть больше нуля.', ephemeral: true });

    const newBal = await addBalance(targetUser.id, amount, targetUser.username);
    return interaction.reply({
      content: `👑 **[ЛИДЕР]** Успешно начислено **+${amount.toLocaleString()} 🪙** пользователю <@${targetUser.id}>!\nНовый баланс участника: **${newBal.toLocaleString()} 🪙**.`
    });
  }
});

// Text Message Commands Fallback (!balance, !daily, !roles, !pay, !leaderboard, !give, etc.)
client.on('messageCreate', async (message) => {
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
  console.log(`💬 [MESSAGE-CMD] Команда "${cmd}" от ${message.author.tag}`);

  if (cmd === 'balance' || cmd === 'баланс') {
    const bal = await getUserBalance(message.author.id, message.author.username);
    return message.reply(`⚡ Твой баланс в LG ECONOMY: **${bal.toLocaleString()} 🪙**`);
  }

  if (cmd === 'roles' || cmd === 'роли') {
    const list = ACTIVITY_ROLES.map(r => `\`[${r.tag}]\` — **${r.name}**: \`${r.salary} 🪙 / 24ч\``).join('\n') + '\n*Все остальные роли — 0 🪙.*';
    return message.reply(`📊 **Тарифная сетка активности и зарплат:**\n${list}`);
  }

  if (cmd === 'daily') {
    return message.reply('ℹ️ Ручной сбор зарплаты не требуется! Монеты по вашей роли начисляются строго автоматически каждый день ровно в **18:30**.');
  }

  if (cmd === 'pay' || cmd === 'перевод') {
    const targetUser = message.mentions.users.first();
    const amountArg = args.find(a => !a.startsWith('<@') && !isNaN(parseInt(a, 10)));
    const amount = amountArg ? parseInt(amountArg, 10) : 0;

    if (!targetUser) {
      return message.reply('❌ Укажите пользователя через тег: `!pay @user сумма`');
    }
    if (!amount || amount <= 0) {
      return message.reply('❌ Укажите корректную сумму монет для перевода: `!pay @user сумма`');
    }
    if (targetUser.id === message.author.id) {
      return message.reply('❌ Нельзя переводить монеты самому себе!');
    }

    const senderBal = await getUserBalance(message.author.id, message.author.username);
    if (senderBal < amount) {
      return message.reply(`❌ У вас недостаточно монет! Ваш баланс: **${senderBal.toLocaleString()} 🪙**.`);
    }

    await addBalance(message.author.id, -amount, message.author.username);
    await addBalance(targetUser.id, amount, targetUser.username);

    return message.reply(`💸 **${message.author.username}** успешно перевёл **${amount.toLocaleString()} 🪙** пользователю <@${targetUser.id}>!`);
  }

  if (cmd === 'leaderboard' || cmd === 'топ') {
    const db = loadLocalDB();
    const sorted = Object.entries(db.users)
      .sort(([, a], [, b]) => b.balance - a.balance)
      .slice(0, 5);

    const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    const text = sorted.map(([id, u], i) => `${medals[i] || `${i + 1}.`} **${u.username}** — \`${u.balance.toLocaleString()} 🪙\``).join('\n') || 'Пока нет данных.';

    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('🏆 ТОП БОГАТЕЙШИХ УЧАСТНИКОВ LG ECONOMY')
      .setDescription(text);

    return message.reply({ embeds: [embed] });
  }

  if (cmd === 'give' || cmd === 'выдать') {
    if (!isLeader(message.member, message.guild)) {
      return message.reply('❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.');
    }

    const targetUser = message.mentions.users.first();
    const amountArg = args.find(a => !a.startsWith('<@') && !isNaN(parseInt(a, 10)));
    const amount = amountArg ? parseInt(amountArg, 10) : 0;

    if (!targetUser) {
      return message.reply('❌ Укажите пользователя: `!give @user сумма`');
    }
    if (!amount || amount <= 0) {
      return message.reply('❌ Укажите сумму монет: `!give @user сумма`');
    }

    const newBal = await addBalance(targetUser.id, amount, targetUser.username);
    return message.reply(`👑 **[ЛИДЕР]** Начислено **+${amount.toLocaleString()} 🪙** пользователю <@${targetUser.id}>!\nНовый баланс участника: **${newBal.toLocaleString()} 🪙**.`);
  }

  if (cmd === 'upgrader' || cmd === 'сайт') {
    return message.reply(`🚀 **Официальный Upgrader LG ECONOMY:**\nhttps://lg-economy.onrender.com`);
  }

  if (cmd === 'payout') {
    if (!isLeader(message.member, message.guild)) {
      return message.reply('❌ **Доступ запрещен!** Ручной запуск выплат доступен только Лидеру / Администратору сервера.');
    }
    await message.reply('⚡ Запускаю суточные выплаты по ролям активности...');
    await processDailySalaries();
    return message.reply('✅ Выплаты зарплат по ролям активности успешно начислены всем участникам!');
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
});

// Login
if (process.env.DISCORD_BOT_TOKEN) {
  client.login(process.env.DISCORD_BOT_TOKEN);
} else {
  console.log('ℹ️ Бот готов к запуску! Укажите DISCORD_BOT_TOKEN в файле .env');
}
