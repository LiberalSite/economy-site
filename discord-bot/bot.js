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
import { setAlertClient, sendAlert, alertsCommand, handleAlertsInteraction } from './alerts.js';

const SITE_URL = process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || 'https://lg-economy.onrender.com';
const PAYOUT_HOUR = 18;
const PAYOUT_MINUTE = 30;
const EPHEMERAL = { flags: MessageFlags.Ephemeral };
const POOL_REFRESH_MS = 10 * 60 * 1000;
const LOAN_TICK_MS = 60 * 60 * 1000;

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

// guildId -> earnings role id. The DB only stores the id, so the bot resolves holders here.
const earningsRoles = new Map();

async function loadEarningsRole(guild) {
  const cfg = await db.getGuildConfig(guild.id);
  const roleId = cfg?.earnings_role_id || '';
  if (roleId) earningsRoles.set(guild.id, roleId);
  else earningsRoles.delete(guild.id);
  return roleId;
}

// Rewrites earnings_pool with the members that hold the earnings role right now —
// those are the accounts that receive losses, transfer fees and pay for salaries.
async function refreshEarningsPool(guild, roleId = earningsRoles.get(guild.id)) {
  if (!roleId) return 0;
  const members = await guild.members.fetch();
  const items = [...members.values()]
    .filter(m => !m.user.bot && m.roles.cache.some(r => r.id === roleId))
    .map(m => ({ id: m.id, username: memberProfile(m).username }));
  return db.syncEarningsPool(guild.id, items);
}

// The loan daily payment is a share of the activity salary, which only lives on Discord roles,
// so the DB keeps a mirror of it. Members without an activity role get salary 0 → no loan for them.
async function syncActivitySalaries(guild) {
  const members = await guild.members.fetch();
  const items = [...members.values()]
    .filter(m => !m.user.bot)
    .map(m => {
      const tier = getMemberActivityRole(m);
      return { id: m.id, salary: tier?.salary || 0, role: tier ? `${tier.tag} ${tier.name}` : null };
    });
  for (let i = 0; i < items.length; i += 500) {
    await db.syncActivity(items.slice(i, i + 500));
  }
  return items.length;
}

async function syncMemberSalary(member) {
  const tier = getMemberActivityRole(member);
  await db.syncActivity([{
    id: member.id,
    salary: tier?.salary || 0,
    role: tier ? `${tier.tag} ${tier.name}` : null,
  }]);
}

async function prepareGuild(guild) {
  await loadEarningsRole(guild).catch(() => {});
  await refreshEarningsPool(guild).catch(err => console.warn(`Не обновил пул роли на ${guild.name}:`, err.message));
  await syncActivitySalaries(guild).catch(err => console.warn(`Не синхронизировал зарплаты на ${guild.name}:`, err.message));
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
    .setDescription('Перевести монеты участнику — комиссия 15%')
    .addUserOption(opt => opt.setName('user').setDescription('Кому перевести').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('Сколько списать с твоего баланса').setMinValue(1))
    .addIntegerOption(opt => opt.setName('receive').setDescription('Сколько получит получатель').setMinValue(1)),

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
    .setName('set_earnings_role')
    .setDescription('👑 [Лидер] Роль, которой достаются все проигрыши и комиссии переводов')
    .addRoleOption(opt => opt.setName('role').setDescription('Роль-получатель').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName('set_salary_source')
    .setDescription('👑 [Лидер] Откуда берутся монеты на суточные зарплаты')
    .addStringOption(opt => opt
      .setName('source')
      .setDescription('print — печатаются, pool — собираются с роли-получателя')
      .setRequired(true)
      .addChoices(
        { name: 'Печатаются из ниоткуда', value: 'print' },
        { name: 'С баланса роли-получателя', value: 'pool' }
      ))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName('earnings')
    .setDescription('👑 [Лидер] Показать роль-получателя, её участников и их балансы')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName('loan')
    .setDescription('💸 Кредит под зарплату за активность: состояние, взятие и погашение')
    .addSubcommand((s) => s.setName('info').setDescription('Мой кредит, зарплата и доступный максимум'))
    .addSubcommand((s) => s
      .setName('take')
      .setDescription('Взять кредит: платёж каждый день — часть твоей дневной зарплаты')
      .addIntegerOption((o) => o.setName('amount').setDescription('Сколько монет').setRequired(true).setMinValue(100))
      .addIntegerOption((o) => o
        .setName('percent')
        .setDescription('Какая часть дневной зарплаты уходит на кредит (10–100, по умолчанию 100)')
        .setMinValue(10)
        .setMaxValue(100)))
    .addSubcommand((s) => s
      .setName('repay')
      .setDescription('Погасить кредит: полностью или частями')
      .addIntegerOption((o) => o.setName('amount').setDescription('Сколько погасить (пусто = всё, что могу)').setMinValue(1))),

  new SlashCommandBuilder()
    .setName('give')
    .setDescription('👑 [Лидер] Начислить монеты конкретному пользователю')
    .addUserOption(opt => opt.setName('user').setDescription('Кому начислить').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('Количество монет').setRequired(true).setMinValue(1))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName('remove')
    .setDescription('👑 [Лидер] Забрать монеты у участника — они уходят роли-получателю')
    .addUserOption(opt => opt.setName('user').setDescription('У кого забрать').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('Сколько забрать').setRequired(true).setMinValue(1))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  new SlashCommandBuilder()
    .setName('alerts')
    .setDescription('👑 [Лидер] Настроить оповещения: канал, текст, цвет и кого упоминать')
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
  if (items.length === 0) return { count: 0, total: 0, collected: 0, printed: 0 };
  const res = await db.paySalaries(guild.id, items);
  return {
    count: items.length,
    total: res?.total ?? items.reduce((s, i) => s + i.amount, 0),
    collected: res?.collected ?? 0,
    printed: res?.printed ?? 0,
  };
}

async function announcePayout(guild, result) {
  if (result.count === 0) return;
  const source = result.collected > 0
    ? `Собрано с роли-получателя: **${num(result.collected)} 🪙**${result.printed > 0 ? `, напечатано недостающего: **${num(result.printed)} 🪙**` : ''}`
    : 'Монеты напечатаны (зарплаты «из ниоткуда»).';
  await sendAlert('payout', { count: num(result.count), total: num(result.total), source }, guild);
}

const todayLocal = () => new Date().toLocaleDateString('sv-SE');

// scheduled=true → at most once per guild per day (tracked in Supabase), safe across restarts/redeploys
async function processDailySalaries({ scheduled }) {
  console.log(`⚡ [SALARY] Запуск ${scheduled ? 'плановой' : 'ручной'} выплаты зарплат по ролям активности...`);
  const today = todayLocal();
  const results = [];
  for (const guild of client.guilds.cache.values()) {
    if (scheduled && !(await db.claimPayout(guild.id, today))) {
      console.log(`ℹ️ [SALARY] ${guild.name}: выплата за ${today} уже была`);
      continue;
    }
    try {
      const result = await payGuildSalaries(guild);
      results.push({ name: guild.name, ...result });
      console.log(`✅ [SALARY] ${guild.name}: участников ${result.count}, сумма ${result.total}, собрано с роли ${result.collected}, напечатано ${result.printed}`);
      await announcePayout(guild, result);
    } catch (err) {
      console.error(`Ошибка начисления зарплат для гильдии ${guild.id}:`, err);
      if (scheduled) await db.releasePayout(guild.id, today).catch(() => {});
    }
  }
  return results;
}

const payoutSummary = (results) => {
  if (!results.length) return '✅ Выплата прошла — на серверах нет участников с ролью активности.';
  return results.map(r =>
    `**${r.name}:** ${r.count} участн. на **${r.total.toLocaleString('ru-RU')} 🪙**` +
    (r.collected > 0
      ? ` (снято с роли ${r.collected.toLocaleString('ru-RU')}${r.printed > 0 ? `, напечатано ${r.printed.toLocaleString('ru-RU')}` : ''})`
      : ' (напечатано)')
  ).join('\n');
};

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
  setAlertClient(client);
  console.log(`🔗 Ссылка для добавления бота: https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`);

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
  for (const guild of client.guilds.cache.values()) {
    try {
      await registerGuildCommands(rest, guild);
      const synced = await syncGuildMembers(guild);
      await prepareGuild(guild);
      console.log(`👥 ${guild.name}: синхронизировано ${synced} участников в Supabase`);
    } catch (err) {
      console.warn(`Не удалось подготовить сервер ${guild.name}:`, err.message);
    }
  }

  setInterval(() => {
    for (const guild of client.guilds.cache.values()) {
      refreshEarningsPool(guild).catch(() => {});
      syncActivitySalaries(guild).catch(() => {});
    }
  }, POOL_REFRESH_MS);

  // The daily payment is charged per calendar day; the DB also does it lazily, this just keeps it moving
  setInterval(() => {
    db.accrueLoans().then((r) => {
      if (r?.loans) console.log(`💸 [LOAN] Списано платежей: кредитов ${r.loans}, сумма ${r.collected}, из них процентов ${r.interest}, роли ушло ${r.paid_to_role}`);
    }).catch(() => {});
  }, LOAN_TICK_MS);
  await db.accrueLoans().catch(() => {});

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
    await prepareGuild(guild);
  } catch (err) {
    console.error(`Ошибка подготовки сервера ${guild.name}:`, err.message);
  }
});

client.on(Events.GuildMemberAdd, async (member) => {
  if (member.user.bot) return;
  await db.addBalance(member.id, 0, memberProfile(member).username, memberProfile(member).avatar).catch(() => {});
});

client.on(Events.GuildMemberRolesUpdate, async (oldMember, newMember) => {
  const roleId = earningsRoles.get(newMember.guild.id);
  if (roleId) {
    const had = oldMember?.roles?.cache?.some(r => r.id === roleId) || false;
    const has = newMember.roles.cache.some(r => r.id === roleId);
    if (had !== has) await refreshEarningsPool(newMember.guild, roleId).catch(() => {});
  }
  if (getMemberActivityRole(oldMember)?.tag !== getMemberActivityRole(newMember)?.tag) {
    await syncMemberSalary(newMember).catch(() => {});
  }
});

function leaderboardText(rows) {
  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
  return rows.map((u, i) => `${medals[i] || `${i + 1}.`} **${u.username || 'Участник'}** — \`${u.balance.toLocaleString('ru-RU')} 🪙\``).join('\n') || 'Пока нет данных.';
}

const rolesText = () =>
  ACTIVITY_ROLES.map(r => `\`[${r.tag}]\` — **${r.name}**: \`${r.salary} 🪙 / 24ч\``).join('\n') + '\n*Все остальные роли — 0 🪙.*';

const dbErrorText = (err) => `❌ ${err.userMessage || 'Ошибка базы данных, попробуйте позже.'}`;

const feeNote = (r, roleId) => {
  if (!r.fee) return '';
  if (!roleId) return ' (роли-получателя нет — монеты сгорели)';
  if (r.fee_paid_out > 0) return ` → участникам роли <@&${roleId}>`;
  return ' (в роли нет участников с балансом — монеты сгорели)';
};

const num = (v) => Number(v || 0).toLocaleString('ru-RU');
const loanDate = (value) => new Date(value).toLocaleString('ru-RU', {
  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
});
const rateText = (value) => `${Number(value).toLocaleString('ru-RU', { maximumFractionDigits: 1 })}%`;

// Announced through the leader's 'loan' template, so a broken alert can never break the command
function announceLoan(guild, username, loan) {
  if (!loan) return;
  sendAlert('loan', {
    user: username,
    amount: num(loan.principal),
    days: num(loan.term_days),
    payment: num(loan.daily_payment),
  }, guild);
}

// offer = public.loan_offer() result
function loanEmbed(o) {
  const embed = new EmbedBuilder().setColor('#FFB020').setTitle('💸 КРЕДИТ ПОД ЗАРПЛАТУ // LG ECONOMY');
  const lines = [
    `Баланс: **${num(o.balance)} 🪙**`,
    `Зарплата по роли: **${num(o.salary_daily)} 🪙/день** (${o.activity_role || 'роли активностей нет'})`,
  ];

  if (o.loan) {
    const l = o.loan;
    lines.push(
      '',
      `День ${l.day + 1} из ${l.term_days} · платёж **${num(l.daily_payment)} 🪙/день** (${rateText(l.salary_percent)} зарплаты)`,
      `Тело долга: **${num(l.principal)} 🪙**, погашено **${num(l.repaid)} 🪙**`,
      `Осталось заплатить: **${num(l.remaining_due)} 🪙**, из них самого долга **${num(l.remaining)} 🪙**`,
      `Следующее списание: **${loanDate(l.next_charge_at)}**`,
      `Конец срока: ${loanDate(l.due_at)}`,
      `Уплачено процентов: **${num(l.interest_paid)} 🪙**`,
      `⚠️ Пока кредит открыт, на балансе должно оставаться не меньше **${num(l.daily_payment)} 🪙** — этот запас нельзя ставить или переводить.`
    );
  } else if (Number(o.salary_daily) >= 1) {
    lines.push(
      '',
      `Открытого кредита нет. Максимум сейчас: **${num(o.max_amount)} 🪙** — при платеже 100% зарплаты (${num(o.salary_daily)} 🪙/день).`,
      `Минимальная сумма: **${num(o.min_amount)} 🪙**`
    );
  } else {
    lines.push('', 'Кредит дают за роль активностей: без дневной зарплаты платить нечем. Список ролей — `/roles`.');
  }

  lines.push(
    '',
    `Ставка: ${rateText(o.day_rate)} в день от остающегося долга, весь процент уходит роли, которая собирает проигрыши и комиссии.`,
    'Платёж списывается с баланса автоматически раз в сутки. Пока кредит не погашен целиком, второй не выдают.'
  );

  return embed.setDescription(lines.join('\n'));
}

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
      const results = await processDailySalaries({ scheduled: false });
      return interaction.editReply({ content: `✅ Выплаты начислены!\n${payoutSummary(results)}` });
    }

    if (commandName === 'pay') {
      const targetUser = interaction.options.getUser('user');
      const payOpt = interaction.options.getInteger('amount');
      const recvOpt = interaction.options.getInteger('receive');
      if (targetUser.bot) return interaction.reply({ content: '❌ Нельзя переводить монеты ботам.', ...EPHEMERAL });
      if (!payOpt && !recvOpt) {
        return interaction.reply({
          content: '❌ Укажи сумму: `amount` — сколько списать с твоего баланса, **или** `receive` — сколько получит получатель.',
          ...EPHEMERAL,
        });
      }
      if (payOpt && recvOpt) {
        return interaction.reply({ content: '❌ Укажи только одну из сумм: `amount` **или** `receive`.', ...EPHEMERAL });
      }

      const pay = payOpt || db.payForReceive(recvOpt);
      const targetMember = interaction.options.getMember('user');
      let r;
      try {
        r = await db.transfer(userId, targetUser.id, pay, username, displayName(targetUser, targetMember), interaction.guild?.id);
      } catch (err) {
        if (err instanceof db.DbError && err.userMessage) return interaction.reply({ content: dbErrorText(err), ...EPHEMERAL });
        throw err;
      }
      sendAlert('transfer', {
        user: username,
        target: displayName(targetUser, targetMember),
        amount: num(r.paid),
        action: 'перевёл',
      }, interaction.guild);
      return interaction.reply({
        content: [
          `💸 **${username}** → <@${targetUser.id}>`,
          `Списано с тебя: **${r.paid.toLocaleString('ru-RU')} 🪙**`,
          `Получено: **${r.received.toLocaleString('ru-RU')} 🪙**`,
          `Комиссия 15%: **${r.fee.toLocaleString('ru-RU')} 🪙**${feeNote(r, earningsRoles.get(interaction.guild?.id))}`,
        ].join('\n')
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

    if (commandName === 'set_earnings_role') {
      const guild = interaction.guild;
      if (!guild) return interaction.reply({ content: '❌ Команда доступна только на сервере.', ...EPHEMERAL });
      const role = interaction.options.getRole('role');
      await db.setGuildEarningsRole(guild.id, role.id);
      earningsRoles.set(guild.id, role.id);
      await interaction.deferReply(EPHEMERAL);
      const holders = await refreshEarningsPool(guild, role.id);
      return interaction.editReply({
        content: `✅ Теперь все проигрыши в Upgrader и комиссии переводов (15%) достаются роли **${role.name}**.\nУчастников в роли: **${holders}**.`
      });
    }

    if (commandName === 'set_salary_source') {
      const guild = interaction.guild;
      if (!guild) return interaction.reply({ content: '❌ Команда доступна только на сервере.', ...EPHEMERAL });
      const source = interaction.options.getString('source');
      await db.setGuildSalarySource(guild.id, source);
      return interaction.reply({
        content: source === 'pool'
          ? '✅ Зарплаты собираются с баланса участников роли-получателя. Чего не хватает — печатается.'
          : '✅ Зарплаты печатаются из ниоткуда и не трогают баланс роли-получателя.'
      });
    }

    if (commandName === 'earnings') {
      const guild = interaction.guild;
      if (!guild) return interaction.reply({ content: '❌ Команда доступна только на сервере.', ...EPHEMERAL });
      await interaction.deferReply(EPHEMERAL);
      const cfg = await db.getGuildConfig(guild.id);
      const roleId = cfg?.earnings_role_id || '';
      const holders = cfg?.holders || [];
      const total = holders.reduce((s, h) => s + (h.balance || 0), 0);
      const role = roleId ? guild.roles.cache.get(roleId) : null;
      const lines = holders.slice(0, 10)
        .map((h, i) => `${i + 1}. **${h.username || h.id}** — \`${(h.balance || 0).toLocaleString('ru-RU')} 🪙\``)
        .join('\n');
      const embed = new EmbedBuilder()
        .setColor('#00F0FF')
        .setTitle('💰 РОЛЬ-ПОЛУЧАТЕЛЬ ПРОИГРЫШЕЙ И КОМИССИЙ')
        .setDescription(
          `Роль: ${roleId ? `**${role?.name || roleId}** (<@&${roleId}>)` : '_не настроена — монеты сгорают_\nНастрой командой \`/set_earnings_role\`'}\n` +
          `Источник зарплат: ${cfg?.salary_source === 'pool' ? '**с баланса роли**' : '**печатаются из ниоткуда**'}\n` +
          `Участников: **${holders.length}**, общий баланс: **${total.toLocaleString('ru-RU')} 🪙**\n\n` +
          (lines || '_В роли пока нет участников с аккаунтом в экономике._')
        )
        .setFooter({ text: 'Каждый проигрыш и каждая комиссия 15% делятся между этими участниками' });
      return interaction.editReply({ embeds: [embed] });
    }

    if (commandName === 'loan') {
      const sub = interaction.options.getSubcommand();
      const guildId = interaction.guild?.id || null;
      const avatar = interaction.user.displayAvatarURL({ size: 128 });

      // The loan is measured against the activity salary, so the mirror has to be fresh
      if (interaction.member?.roles?.cache) await syncMemberSalary(interaction.member).catch(() => {});

      if (sub === 'info') {
        await interaction.deferReply(EPHEMERAL);
        return interaction.editReply({ embeds: [loanEmbed(await db.loanOffer(userId))] });
      }

      if (sub === 'take') {
        const amount = interaction.options.getInteger('amount');
        const percent = interaction.options.getInteger('percent') || 100;
        await interaction.deferReply(EPHEMERAL);
        const o = await db.takeLoan(userId, amount, percent, username, avatar, guildId);
        announceLoan(interaction.guild, username, o.loan);
        return interaction.editReply({
          embeds: [loanEmbed(o).setTitle(`✅ КРЕДИТ ВЫДАН: ${num(amount)} 🪙`)],
        });
      }

      if (sub === 'repay') {
        const requested = interaction.options.getInteger('amount');
        await interaction.deferReply(EPHEMERAL);
        const current = await db.loanOffer(userId);
        if (!current.loan) return interaction.editReply({ content: '❌ У тебя нет открытого кредита.' });
        const amount = requested || Math.min(current.loan.remaining, Math.max(current.balance, 0));
        if (amount < 1) {
          return interaction.editReply({ content: '❌ Нечем гасить. Монеты придут с зарплатой или победами.' });
        }
        const o = await db.repayLoan(userId, amount);
        const closed = !o.loan;
        return interaction.editReply({
          embeds: [loanEmbed(o).setTitle(closed ? '✅ КРЕДИТ ПОЛНОСТЬЮ ПОГАШЕН' : `🔄 ПОГАШЕНО ${num(amount)} 🪙`)],
        });
      }
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

    if (commandName === 'alerts') {
      if (!isLeader(interaction.member, interaction.guild)) {
        return interaction.reply({ content: '❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.', ...EPHEMERAL });
      }
      return alertsCommand(interaction);
    }

    if (commandName === 'remove') {
      if (!isLeader(interaction.member, interaction.guild)) {
        return interaction.reply({ content: '❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.', ...EPHEMERAL });
      }
      const targetUser = interaction.options.getUser('user');
      const amount = interaction.options.getInteger('amount');
      await interaction.deferReply(EPHEMERAL);
      const r = await db.removeCoins(targetUser.id, amount, interaction.guild?.id || null);
      const back = r.reserve > 0
        ? `\n💸 ${num(r.reserve)} 🪙 не тронуты — они зарезерированы под дневной платёж по кредиту.`
        : '';
      const short = r.removed < amount
        ? `\nЗабрал столько, сколько было свободно: просил ${num(amount)}, забрал ${num(r.removed)}.`
        : '';
      return interaction.editReply({
        content: `👑 **[ЛИДЕР]** У <@${targetUser.id}> забрано **-${r.removed.toLocaleString('ru-RU')} 🪙**.\n` +
          `Баланс участника теперь: **${num(r.balance)} 🪙**. Монеты ушли роли-получателю.${back}${short}`
      });
    }
  } catch (err) {
    console.error(`Ошибка команды /${commandName}:`, err);
    const payload = { content: dbErrorText(err), ...EPHEMERAL };
    if (interaction.deferred || interaction.replied) await interaction.editReply(payload).catch(() => {});
    else await interaction.reply(payload).catch(() => {});
  }
});

// Buttons / menus / modals of the /alerts panel
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton() && !interaction.isAnySelectMenu() && !interaction.isModalSubmit()) return;
  try {
    await handleAlertsInteraction(interaction);
  } catch (err) {
    console.error('Ошибка панели оповещений:', err);
    await interaction.reply({ content: '❌ Не получилось сохранить, попробуй ещё раз.', ...EPHEMERAL }).catch(() => {});
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

      let r;
      try {
        r = await db.transfer(message.author.id, targetUser.id, amount, authorName, displayName(targetUser, message.mentions.members?.get(targetUser.id)), message.guild?.id);
      } catch (err) {
        if (err instanceof db.DbError && err.userMessage) return message.reply(dbErrorText(err));
        throw err;
      }
      sendAlert('transfer', {
        user: authorName,
        target: displayName(targetUser, message.mentions.members?.get(targetUser.id)),
        amount: num(r.paid),
        action: 'перевёл',
      }, message.guild);
      return message.reply(
        `💸 **${authorName}** → <@${targetUser.id}>\n` +
        `Списано: **${r.paid.toLocaleString('ru-RU')} 🪙** · Получено: **${r.received.toLocaleString('ru-RU')} 🪙** · ` +
        `Комиссия 15%: **${r.fee.toLocaleString('ru-RU')} 🪙**${feeNote(r, earningsRoles.get(message.guild?.id))}`
      );
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

    if (cmd === 'remove' || cmd === 'забрать' || cmd === 'забери') {
      if (!isLeader(message.member, message.guild)) {
        return message.reply('❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.');
      }
      const targetUser = message.mentions.users.filter(u => u.id !== client.user.id).first();
      const amount = parseAmount();
      if (!targetUser) return message.reply('❌ Укажите пользователя: `!remove @user сумма`');
      if (!amount) return message.reply('❌ Укажите сумму монет: `!remove @user сумма`');

      const r = await db.removeCoins(targetUser.id, amount, message.guild.id);
      return message.reply(
        `👑 **[ЛИДЕР]** У <@${targetUser.id}> забрано **-${num(r.removed)} 🪙**.\n` +
        `Баланс участника теперь: **${num(r.balance)} 🪙**. Монеты ушли роли-получателю.` +
        (r.reserve > 0 ? `\n💸 ${num(r.reserve)} 🪙 не тронуты — они зарезерированы под дневной платёж по кредиту.` : '')
      );
    }

    if (cmd === 'upgrader' || cmd === 'сайт') {
      return message.reply(`🚀 **Официальный Upgrader LG ECONOMY:**\n${SITE_URL}`);
    }

    if (cmd === 'payout') {
      if (!isLeader(message.member, message.guild)) {
        return message.reply('❌ **Доступ запрещен!** Ручной запуск выплат доступен только Лидеру / Администратору сервера.');
      }
      await message.reply('⚡ Запускаю выплаты по ролям активности...');
      const results = await processDailySalaries({ scheduled: false });
      return message.reply(`✅ Выплаты начислены!\n${payoutSummary(results)}`);
    }

    if (cmd === 'earnings_role' || cmd === 'роль_получатель') {
      if (!isLeader(message.member, message.guild)) {
        return message.reply('❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.');
      }
      const roleId = message.mentions.roles.first()?.id;
      if (!roleId) return message.reply('❌ Отметь роль тегом: `!earnings_role @роль`');
      await db.setGuildEarningsRole(message.guild.id, roleId);
      earningsRoles.set(message.guild.id, roleId);
      const holders = await refreshEarningsPool(message.guild, roleId);
      return message.reply(`✅ Роли <@&${roleId}> достаются все проигрыши и комиссии переводов. Участников в роли: **${holders}**.`);
    }

    if (cmd === 'salary_source' || cmd === 'источник_зарплат') {
      if (!isLeader(message.member, message.guild)) {
        return message.reply('❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.');
      }
      const source = args.find(a => /^(print|pool)$/i.test(a))?.toLowerCase();
      if (!source) return message.reply('❌ Укажи источник: `!salary_source print` (печатаются) или `!salary_source pool` (с баланса роли-получателя).');
      await db.setGuildSalarySource(message.guild.id, source);
      return message.reply(source === 'pool'
        ? '✅ Зарплаты собираются с баланса участников роли-получателя. Чего не хватает — печатается.'
        : '✅ Зарплаты печатаются из ниоткуда и не трогают баланс роли-получателя.');
    }

    if (cmd === 'earnings' || cmd === 'получатель') {
      if (!isLeader(message.member, message.guild)) {
        return message.reply('❌ **Доступ запрещен!** Команда доступна только Лидеру / Администратору сервера.');
      }
      const cfg = await db.getGuildConfig(message.guild.id);
      const roleId = cfg?.earnings_role_id || '';
      const holders = cfg?.holders || [];
      const total = holders.reduce((s, h) => s + (h.balance || 0), 0);
      return message.reply(
        `💰 **Роль-получатель:** ${roleId ? `<@&${roleId}>` : '_не настроена — используй !earnings_role @роль_'}\n` +
        `Зарплаты: ${cfg?.salary_source === 'pool' ? 'снимаются с роли' : 'печатаются из ниоткуда'}\n` +
        `Участников в роли: **${holders.length}**, их общий баланс: **${total.toLocaleString('ru-RU')} 🪙**`
      );
    }

    if (cmd === 'loan' || cmd === 'кредит') {
      const amount = parseAmount();
      const percentArg = args.find((a) => /^\d{2,3}$/.test(a) && Number(a) >= 10 && Number(a) <= 100);
      const percent = Number(percentArg) || 100;
      const avatar = message.author.displayAvatarURL({ size: 128 });
      const guildId = message.guild?.id || null;

      if (amount) {
        if (message.member?.roles?.cache) await syncMemberSalary(message.member).catch(() => {});
        const o = await db.takeLoan(message.author.id, amount, percent, authorName, avatar, guildId);
        announceLoan(message.guild, authorName, o.loan);
        return message.reply({ embeds: [loanEmbed(o).setTitle(`✅ КРЕДИТ ВЫДАН: ${num(amount)} 🪙`)] });
      }
      if (message.member?.roles?.cache) await syncMemberSalary(message.member).catch(() => {});
      const o = await db.loanOffer(message.author.id);
      return message.reply({ embeds: [loanEmbed(o)] });
    }

    if (cmd === 'repay' || cmd === 'погасить') {
      const current = await db.loanOffer(message.author.id);
      if (!current.loan) return message.reply('❌ У тебя нет открытого кредита.');
      const amount = parseAmount() || Math.min(current.loan.remaining, Math.max(current.balance, 0));
      if (amount < 1) return message.reply('❌ Нечем гасить. Монеты придут с зарплатой или победами.');
      const o = await db.repayLoan(message.author.id, amount);
      return message.reply({
        embeds: [loanEmbed(o).setTitle(o.loan ? `🔄 ПОГАШЕНО ${num(amount)} 🪙` : '✅ КРЕДИТ ПОЛНОСТЬЮ ПОГАШЕН')],
      });
    }

    if (cmd === 'help' || cmd === 'помощь' || isMention) {
      return message.reply(
        `🤖 **LG ECONOMY Бот на связи!**\n\n` +
        `Команды для всех (работают со слэшем \`/\` или префиксом \`!\`):\n` +
        `• \`/balance\` или \`!balance\` — проверить баланс монет\n` +
        `• \`/roles\` или \`!roles\` — тарифная сетка 8 уровней активности (выплата каждый день в 18:30)\n` +
        `• \`/pay @user сумма\` или \`!pay @user сумма\` — перевести монеты (комиссия 15% уходит роли-получателю)\n` +
        `• \`/leaderboard\` или \`!leaderboard\` — топ богатейших участников\n` +
        `• \`/upgrader\` или \`!upgrader\` — ссылка на сайт Upgrader\n` +
        `• \`/loan info\` или \`!loan\` — мой кредит, зарплата и доступный максимум\n` +
        `• \`/loan take\` или \`!loan 5000 50\` — взять кредит: сумма и доля дневной зарплаты на погашение (10–100, по умолчанию 100)\n` +
        `• \`/loan repay\` или \`!repay 2000\` — погасить кредит\n\n` +
        `👑 **Команды Лидера / Администратора:**\n` +
        `• \`/give @user сумма\` или \`!give @user сумма\` — начислить монеты участнику\n` +
        `• \`/remove @user сумма\` или \`!remove @user сумма\` — забрать монеты у участника (уходят роли-получателю)\n` +
        `• \`/payout\` или \`!payout\` — запустить выплаты всем прямо сейчас\n` +
        `• \`/setup_roles\` — создать все 8 ролей активности автоматически\n` +
        `• \`/set_earnings_role @роль\` или \`!earnings_role @роль\` — кто получает проигрыши и комиссии\n` +
        `• \`/set_salary_source\` или \`!salary_source print|pool\` — зарплаты печатать или снимать с этой роли\n` +
        `• \`/earnings\` или \`!earnings\` — текущие настройки и участники роли\n` +
        `• \`/alerts\` — настроить оповещения: в какой канал, включать или нет, заголовок, текст, цвет и кого упоминать\n\n` +
        `⚠️ Кредит: раз в сутки с баланса автоматически списывают фиксированный платёж (часть твоей дневной зарплаты). Пока кредит открыт, на балансе должен оставаться запас в один платёж — его нельзя поставить или перевести. Новый кредит — после полного погашения.`
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
