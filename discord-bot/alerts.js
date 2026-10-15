// Announcements the leader tunes with /alerts (channel, on/off, title, text, color, who to ping).
// bot.js hands its client to setAlertClient(), so the website (server.js) posts the very same
// alerts from the same process without owning a Discord connection.
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ChannelType,
  MessageFlags,
  PermissionFlagsBits,
} from 'discord.js';
import * as db from '../lib/db.js';

const EPHEMERAL = { flags: MessageFlags.Ephemeral };
const CACHE_MS = 60_000;

// An Upgrader round pays this much (or more) before the 'upgrader' alert fires
export const BIG_WIN_MIN = 10_000;

export const ALERT_KEYS = ['payout', 'loan', 'transfer', 'upgrader'];

// Which tokens each template understands, plus a realistic sample for the preview
const ALERT_HINTS = {
  payout: {
    vars: '`{count}` — участников, `{total}` — сумма, `{source}` — откуда монеты',
    sample: { count: '12', total: '1 540', source: 'Собрано с роли-получателя: 1 540 🪙' },
  },
  loan: {
    vars: '`{user}` — кто взял, `{amount}` — сумма, `{days}` — дней, `{payment}` — платёж в день',
    sample: { user: 'Fazenn', amount: '5 000', days: '52', payment: '100' },
  },
  transfer: {
    vars: '`{user}` — отправитель, `{target}` — получатель, `{amount}` — сумма, `{action}` — перевёл/купил',
    sample: { user: 'Fazenn', target: 'Nikita', amount: '1 200', action: 'перевёл' },
  },
  upgrader: {
    vars: '`{user}` — кто сорвал, `{amount}` — выплата, `{mult}` — множитель, `{bet}` — ставка',
    sample: { user: 'Fazenn', amount: '25 000', mult: '96', bet: '260' },
  },
};

const MODAL_TITLES = {
  title: '✏️ Заголовок оповещения',
  template: '✏️ Текст оповещения',
  color: '🎨 Цвет оповещения',
};

// An empty string means "back to the built-in default" on the DB side
const RESET = { enabled: true, channel_id: '', title: '', template: '', color: '', mention: '' };

const normalizeHex = (value) => {
  const m = /^#?([0-9a-f]{6})$/i.exec((value || '').trim());
  return m ? `#${m[1].toUpperCase()}` : null;
};

const cache = new Map();
let client = null;

export function setAlertClient(discordClient) {
  client = discordClient;
}

export function invalidateAlerts(guildId) {
  cache.delete(guildId);
}

async function cachedAlerts(guildId) {
  const hit = cache.get(guildId);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.alerts;
  const alerts = await db.getAlerts(guildId);
  cache.set(guildId, { at: Date.now(), alerts });
  return alerts;
}

// The panel always reads fresh — the leader must see his own change immediately.
const loadAlert = async (guildId, key) => (await db.getAlerts(guildId))?.[key] || null;

async function saveAlert(guildId, key, fields) {
  const alert = await db.setAlert(guildId, key, fields);
  invalidateAlerts(guildId);
  return alert || await loadAlert(guildId, key);
}

const fill = (text, vars) =>
  String(text || '').replace(/\{(\w+)\}/g, (token, name) => (vars[name] === undefined ? token : String(vars[name])));

const isAlertAdmin = (interaction) =>
  interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)
  || interaction.guild?.ownerId === interaction.user.id;

function mentionText(mention, guild) {
  if (!mention || mention === 'none') return null;
  if (mention === 'everyone') return '@everyone';
  if (mention === 'here') return '@here';
  // The @everyone role carries the id of the guild itself
  if (guild && mention === guild.id) return '@everyone';
  return `<@&${mention}>`;
}

function buildMessage(cfg, vars, guild) {
  const embed = new EmbedBuilder()
    .setTitle(fill(cfg.title, vars).slice(0, 256))
    .setDescription(fill(cfg.template, vars).slice(0, 4000))
    .setColor(normalizeHex(cfg.color) || '#00F0FF');
  const content = mentionText(cfg.mention, guild);
  return content ? { content, embeds: [embed] } : { embeds: [embed] };
}

// A guild with no configured channel keeps the old behaviour: system channel, then the usual names
async function resolveChannel(guild, channelId) {
  if (channelId) {
    const found = guild.channels.cache.get(channelId) || await guild.channels.fetch(channelId).catch(() => null);
    if (found?.isTextBased()) return found;
  }
  return guild.systemChannel || guild.channels.cache.find((c) =>
    c.isTextBased() && (c.name.includes('основн') || c.name.includes('general') || c.name.includes('чат') || c.name.includes('бот'))
  ) || null;
}

// Never throws: a broken announcement must not break a payout or a transfer.
export async function sendAlert(key, vars, guildOrId = null) {
  try {
    if (!client) return false;
    const guild = typeof guildOrId === 'object' && guildOrId
      ? guildOrId
      : client.guilds.cache.get(guildOrId) || client.guilds.cache.first();
    if (!guild) return false;
    const cfg = (await cachedAlerts(guild.id))?.[key];
    if (!cfg || cfg.enabled === false) return false;
    const channel = await resolveChannel(guild, cfg.channel_id);
    if (!channel) return false;
    await channel.send(buildMessage(cfg, vars, guild));
    return true;
  } catch (err) {
    console.warn(`⚠️ Оповещение ${key} не отправлено:`, err.message);
    return false;
  }
}

async function mentionLabel(guild, mention) {
  if (!mention || mention === 'none') return 'никто';
  if (mention === 'everyone' || mention === guild.id) return '@everyone';
  if (mention === 'here') return '@here';
  const role = guild.roles.cache.get(mention) || await guild.roles.fetch(mention).catch(() => null);
  return role ? `роль **${role.name}**` : '⚠️ роли больше нет';
}

function panelRows(key, cfg) {
  const on = cfg.enabled !== false;
  return [
    new ActionRowBuilder().addComponents(
      new ChannelSelectMenuBuilder()
        .setCustomId(`al:ch:${key}`)
        .setChannelTypes(ChannelType.GuildText)
        .setPlaceholder('Куда постить оповещение')
    ),
    new ActionRowBuilder().addComponents(
      new RoleSelectMenuBuilder()
        .setCustomId(`al:ro:${key}`)
        .setMaxValues(1)
        .setPlaceholder('Какую роль упоминать')
    ),
    new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`al:tg:${key}`).setLabel(on ? '✅ Показывать' : '🔕 Скрыто')
        .setStyle(on ? ButtonStyle.Success : ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`al:mo:${key}:title`).setLabel('✏️ Заголовок').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId(`al:mo:${key}:template`).setLabel('✏️ Текст').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId(`al:mo:${key}:color`).setLabel('🎨 Цвет').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId(`al:pv:${key}`).setLabel('👁 Предпросмотр').setStyle(ButtonStyle.Secondary),
    ),
    new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`al:me:${key}:everyone`).setLabel('@everyone').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`al:me:${key}:here`).setLabel('@here').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`al:me:${key}:none`).setLabel('🚫 Никого').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`al:rs:${key}`).setLabel('♻️ Сбросить').setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId('al:bk').setLabel('⬅️ Все оповещения').setStyle(ButtonStyle.Secondary),
    ),
  ];
}

async function panelMessage(guild, key) {
  const cfg = await loadAlert(guild.id, key);
  if (!cfg) return { content: '❌ Такое оповещение не найдено.', ...EPHEMERAL };
  const channel = cfg.channel_id
    ? guild.channels.cache.get(cfg.channel_id) || await guild.channels.fetch(cfg.channel_id).catch(() => null)
    : null;
  const where = cfg.channel_id
    ? (channel ? `**#${channel.name}**` : '⚠️ **канала больше нет** — выбери другой')
    : '*не выбран — пишу в общий канал*';
  return {
    embeds: [
      new EmbedBuilder()
        .setColor(normalizeHex(cfg.color) || '#00F0FF')
        .setTitle(`🔔 ${cfg.label}`)
        .setDescription([
          `**Показывать:** ${cfg.enabled === false ? '🔕 нет' : '✅ да'}`,
          `**Канал:** ${where}`,
          `**Упоминание:** ${await mentionLabel(guild, cfg.mention)}`,
          '',
          `**Заголовок:**\n${cfg.title}`,
          `**Текст:**\n${cfg.template}`,
          '',
          `Переменные: ${ALERT_HINTS[key].vars}`,
        ].join('\n'))
        .setFooter({ text: 'Сохраняется сразу — отдельной кнопки «Сохранить» нет' }),
    ],
    components: panelRows(key, cfg),
    ...EPHEMERAL,
  };
}

export async function alertsCommand(interaction) {
  const guild = interaction.guild;
  if (!guild) return interaction.reply({ content: '❌ Команда доступна только на сервере.', ...EPHEMERAL });
  const alerts = await db.getAlerts(guild.id);
  const buttons = ALERT_KEYS.map((key) => {
    const cfg = alerts?.[key] || {};
    return new ButtonBuilder()
      .setCustomId(`al:pk:${key}`)
      .setLabel(cfg.label || key)
      .setStyle(cfg.enabled === false ? ButtonStyle.Secondary : ButtonStyle.Primary);
  });
  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setColor('#00F0FF')
        .setTitle('🔔 ОПОВЕЩЕНИЯ СЕРВЕРА')
        .setDescription([
          'Выбери, какое оповещение настроить. Серая кнопка — сейчас оно выключено.',
          '',
          'В карточке: канал, показывать/скрыть, заголовок, текст, цвет и кого упоминать.',
          'Текст можно писать свой — вставь переменные вида `{user}`, `{amount}`.',
        ].join('\n'))
        .setFooter({ text: 'Настройки действуют и на бота, и на сайт: выплаты, кредиты, переводы, крупные раздачи' }),
    ],
    components: [
      new ActionRowBuilder().addComponents(buttons.slice(0, 2)),
      new ActionRowBuilder().addComponents(buttons.slice(2)),
    ],
    ...EPHEMERAL,
  });
}

function modalFor(key, field, cfg) {
  const input = new TextInputBuilder().setCustomId(field).setRequired(field !== 'color');
  if (field === 'title') {
    input.setLabel('Заголовок оповещения').setPlaceholder('⚡ СУТОЧНАЯ ВЫПЛАТА ЗАРПЛАТ').setMaxLength(200)
      .setValue(String(cfg.title || '').slice(0, 200)).setStyle(TextInputStyle.Short);
  } else if (field === 'template') {
    input.setLabel('Текст оповещения').setPlaceholder('{user} перевёл {amount} 🪙 → {target}')
      .setMaxLength(1000).setValue(String(cfg.template || '').slice(0, 1000)).setStyle(TextInputStyle.Paragraph);
  } else {
    input.setLabel('Цвет — 6 символов, пусто = по умолчанию').setPlaceholder('#00F0FF').setMaxLength(7)
      .setValue(String(cfg.color || '').slice(0, 7)).setStyle(TextInputStyle.Short);
  }
  return new ModalBuilder().setCustomId(`al:sv:${key}:${field}`).setTitle(MODAL_TITLES[field])
    .addComponents(new ActionRowBuilder().addComponents(input));
}

const deny = (interaction) => interaction.reply({
  content: '❌ **Доступ запрещен!** Настройка оповещений доступна только Лидеру / Администратору сервера.',
  ...EPHEMERAL,
}).catch(() => {});

// Returns true when the custom_id belongs to this panel, so the caller stays out of the way.
export async function handleAlertsInteraction(interaction) {
  const id = interaction.customId || '';
  if (!id.startsWith('al:')) return false;
  if (!interaction.guild) {
    await interaction.reply({ content: '❌ Настройка оповещений доступна только на сервере.', ...EPHEMERAL }).catch(() => {});
    return true;
  }
  if (!isAlertAdmin(interaction)) {
    await deny(interaction);
    return true;
  }

  const [, action, rest = ''] = id.split(':');
  if (action === 'bk') {
    await alertsCommand(interaction);
    return true;
  }

  const [key, field] = action === 'pk' ? [rest] : rest.split(':');
  if (!ALERT_HINTS[key]) return false;

  const guild = interaction.guild;
  const refresh = async () => {
    await interaction.update(await panelMessage(guild, key)).catch(() => {});
    return true;
  };

  if (action === 'pk') return refresh();

  if (action === 'tg') {
    const cfg = await loadAlert(guild.id, key);
    await saveAlert(guild.id, key, { enabled: cfg?.enabled === false });
    return refresh();
  }

  if (action === 'ch' || action === 'ro') {
    const value = interaction.values?.[0] || '';
    await saveAlert(guild.id, key, { [action === 'ch' ? 'channel_id' : 'mention']: value });
    return refresh();
  }

  if (action === 'me') {
    await saveAlert(guild.id, key, { mention: field });
    return refresh();
  }

  if (action === 'rs') {
    await saveAlert(guild.id, key, RESET);
    return refresh();
  }

  if (action === 'pv') {
    const cfg = await loadAlert(guild.id, key);
    if (!cfg) {
      await interaction.reply({ content: '❌ Оповещение не найдено.', ...EPHEMERAL }).catch(() => {});
      return true;
    }
    const msg = buildMessage(cfg, ALERT_HINTS[key].sample, guild);
    // a preview must never ping the whole server
    await interaction.reply({
      ...(msg.content ? { content: msg.content.replace(/@/g, '\\@') } : {}),
      embeds: msg.embeds,
      ...EPHEMERAL,
    }).catch(() => {});
    return true;
  }

  if (action === 'mo') {
    const cfg = await loadAlert(guild.id, key);
    if (!cfg) {
      await interaction.reply({ content: '❌ Оповещение не найдено.', ...EPHEMERAL }).catch(() => {});
      return true;
    }
    await interaction.showModal(modalFor(key, field, cfg));
    return true;
  }

  if (action === 'sv') {
    const value = (interaction.fields?.getTextInputValue(field) || '').trim();
    if (field === 'color' && value && !normalizeHex(value)) {
      await interaction.reply({
        content: '❌ Цвет — 6 символов, например `00F0FF` или `#00F0FF`. Пусто — цвет по умолчанию.',
        ...EPHEMERAL,
      }).catch(() => {});
      return true;
    }
    await saveAlert(guild.id, key, { [field]: field === 'color' ? (normalizeHex(value) || '') : value });
    // a modal can only answer with a new message, so the refreshed panel comes back as one
    await interaction.reply(await panelMessage(guild, key)).catch(() => {});
    return true;
  }

  return false;
}
