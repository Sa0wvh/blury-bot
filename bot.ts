import 'dotenv/config';
import { Client, GatewayIntentBits, Events, TextChannel } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TARGET_CHANNEL_ID = '1491770627944615947';
const KEYWORDS = ['blury textures', 'fflags', 'blurry textures', 'blurry texture',  'blury texture'];

client.once(Events.ClientReady, (c) => {
  console.log(`🤖 Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.guild) return;

  const content = message.content.toLowerCase();
  const matched = KEYWORDS.some((kw) => content.includes(kw.toLowerCase()));

  if (!matched) return;

  const channel = await client.channels.fetch(TARGET_CHANNEL_ID).catch(() => null);
  if (!channel || !(channel instanceof TextChannel)) return;

  await message.reply({
    content: `Check out ${channel}!`,
  });
});

client.login(process.env.DISCORD_TOKEN);