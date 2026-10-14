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
  ButtonStyle
} from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DB_PATH = path.join(__dirname, 'economy.json');

// 11 Activity Tiers & 24h Salaries
const ACTIVITY_ROLES = [
  { tag: "@[act+10]", name: "Превосходный Актив", salary: 1000 },
  { tag: "@[act+9]", name: "Крайне Высокий Актив", salary: 800 },
  { tag: "@[act+8]", name: "Очень Хороший Актив", salary: 650 },
  { tag: "@[act+7]", name: "Отличный Актив", salary: 500 },
  { tag: "@[act+6]", name: "Высокий Актив", salary: 400 },
  { tag: "@[act+5]", name: "Хороший Актив", salary: 300 },
  { tag: "@[act+4]", name: "Нормальный Актив", salary: 200 },
  { tag: "@[act+3]", name: "Не особый Актив", salary: 120 },
  { tag: "@[act+2]", name: "Низкий Актив", salary: 70 },
  { tag: "@[act+1]", name: "Ужасный Актив", salary: 30 },
  { tag: "@[act-0]", name: "Мертв", salary: 0 }
];

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
        body: JSON.stringify({ discord_id: discordId, username, balance: 1000 })
      });
      return 1000;
    } catch (e) {
      console.warn("Supabase fetch error, fallback to local:", e);
    }
  }

  // Fallback to local JSON
  const db = loadLocalDB();
  if (!db.users[discordId]) {
    db.users[discordId] = { username, balance: 1000, lastDaily: 0 };
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
    db.users[discordId] = { username, balance: 1000, lastDaily: 0 };
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
  ],
  partials: [Partials.Channel, Partials.GuildMember]
});

// Define Slash Commands
const commands = [
  new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Проверить баланс монет в экономике ЛГ'),

  new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Получить суточную зарплату по уровню актива'),

  new SlashCommandBuilder()
    .setName('upgrader')
    .setDescription('Ссылка на Hi-Tech сайт Upgrader монет'),

  new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Показать тарифную сетку 11 уровней активности и зарплат'),

  new SlashCommandBuilder()
    .setName('pay')
    .setDescription('Перевести монеты другому участнику сервера')
    .addUserOption(opt => opt.setName('user').setDescription('Кому перевести').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('Сумма монет').setRequired(true)),

  new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Топ богатейших участников сообщества ЛГ')
];

// Automatic 24h Salary Payout Loop
async function processDailySalaries() {
  console.log("⚡ [AUTO-SALARY] Запуск ежедневной выплаты зарплат по 11 ролям...");
  for (const guild of client.guilds.cache.values()) {
    try {
      const members = await guild.members.fetch();
      for (const [id, member] of members) {
        if (member.user.bot) continue;

        // Find member's highest activity tier
        let highestRole = null;
        for (const roleTier of ACTIVITY_ROLES) {
          const hasRole = member.roles.cache.some(r => 
            r.name.toLowerCase().includes(roleTier.tag.toLowerCase()) || 
            r.name.toLowerCase().includes(roleTier.name.toLowerCase())
          );
          if (hasRole) {
            highestRole = roleTier;
            break;
          }
        }

        // If no specific role found, default to @[act+4] (200 LC)
        if (!highestRole) {
          highestRole = ACTIVITY_ROLES[6]; // @[act+4]
        }

        if (highestRole.salary > 0) {
          await addBalance(id, highestRole.salary, member.user.username);
        }
      }
      console.log(`✅ [AUTO-SALARY] Зарплаты успешно начислены на сервере: ${guild.name}`);
    } catch (err) {
      console.error(`Ошибка начисления зарплат для гильдии ${guild.id}:`, err);
    }
  }
}

// Bot Ready Event
client.once('ready', async () => {
  console.log(`🤖 Бот предвыборной кампании Fazenn запущен под именем: ${client.user.tag}`);

  // Register Slash Commands
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');
  try {
    if (process.env.DISCORD_CLIENT_ID) {
      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
        { body: commands.map(c => c.toJSON()) }
      );
      console.log('✅ Слэш-команды (/balance, /daily, /roles, /upgrader, /pay, /leaderboard) зарегистрированы!');
    }
  } catch (e) {
    console.warn('Регистрация слэш-команд пропущена (укажите DISCORD_BOT_TOKEN и DISCORD_CLIENT_ID в .env):', e.message);
  }

  // Schedule auto-salary every 24 hours (86,400,000 ms)
  setInterval(processDailySalaries, 24 * 60 * 60 * 1000);
});

// Command Handlers
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  const userId = interaction.user.id;
  const username = interaction.user.username;

  if (commandName === 'balance') {
    const bal = await getUserBalance(userId, username);
    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('⚡ БАЛАНС МОНЕТ // ЭКОНОМИКА ЛГ')
      .setDescription(`Участник: **${username}**\nТекущий баланс: **${bal.toLocaleString()} LC**`)
      .setFooter({ text: 'Fazenn 2026 // Прозрачная демократия' });

    return interaction.reply({ embeds: [embed] });
  }

  if (commandName === 'roles') {
    const list = ACTIVITY_ROLES.map(r => `\`${r.tag}\` — **${r.name}**: \`${r.salary} LC / 24ч\``).join('\n');
    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('📊 11 УРОВНЕЙ АКТИВНОСТИ И ЗАРПЛАТЫ')
      .setDescription(list)
      .setFooter({ text: 'Каждые 24 часа бот начисляет выплату на баланс' });

    return interaction.reply({ embeds: [embed] });
  }

  if (commandName === 'upgrader') {
    const siteUrl = process.env.UPGRADER_WEBSITE_URL || 'https://fazenn-campaign.vercel.app';
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Открыть UPGRADER 2.0')
        .setStyle(ButtonStyle.Link)
        .setURL(siteUrl)
    );

    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('🚀 UPGRADER МОНЕТ ЛГ')
      .setDescription('Апгрейдите свои монеты с множителями до **x50** на официальном Hi-Tech сайте кампании Fazenn!')
      .setFooter({ text: 'Синхронизация баланса через Discord OAuth2' });

    return interaction.reply({ embeds: [embed], components: [row] });
  }

  if (commandName === 'daily') {
    const bal = await addBalance(userId, 300, username);
    return interaction.reply({
      content: `✅ Вы получили суточную выплату! Ваш новый баланс: **${bal.toLocaleString()} LC**.`,
      ephemeral: true
    });
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
      content: `💸 **${username}** успешно перевёл **${amount.toLocaleString()} LC** пользователю <@${targetUser.id}>!`
    });
  }

  if (commandName === 'leaderboard') {
    const db = loadLocalDB();
    const sorted = Object.entries(db.users)
      .sort(([, a], [, b]) => b.balance - a.balance)
      .slice(0, 5);

    const text = sorted.map(([id, u], i) => `${i + 1}. **${u.username}** — \`${u.balance.toLocaleString()} LC\``).join('\n') || 'Пока нет данных.';

    const embed = new EmbedBuilder()
      .setColor('#00F0FF')
      .setTitle('🏆 ТОП БОГАТЕЙШИХ УЧАСТНИКОВ ЛГ')
      .setDescription(text);

    return interaction.reply({ embeds: [embed] });
  }
});

// Login
if (process.env.DISCORD_BOT_TOKEN) {
  client.login(process.env.DISCORD_BOT_TOKEN);
} else {
  console.log('ℹ️ Бот готов к запуску! Укажите DISCORD_BOT_TOKEN в файле .env');
}
