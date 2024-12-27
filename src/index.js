require('dotenv').config();
const initializeDatabase = require('./db/dbInit');
const { Player } = require('discord-player');
const { AttachmentExtractor } = require('@discord-player/extractor');

(async () => {
  try {

    await initializeDatabase();

    const { Client, IntentsBitField, Message } = require('discord.js');
    const eventHandler = require('./handlers/eventHandler');

    const client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildIntegrations

      ],
    });

    /**
     *
     * @param {Client} client
     * @param {Message} message
     */

    client.deleteMessages = false;

    const player = new Player(client);

    player.events.on('playerError', (queue, error) => {
      console.error(`Player error in guild ${queue.guild.id}:`, error);
   });
  
   player.events.on('error', (error) => {
      console.error('Global player error:', error);
  });
  

    eventHandler(client);
    await player.extractors.register(AttachmentExtractor);
    console.log("Extractor plugin registered successfully.");

    client.on('ready', (c) => {
      client.user.setActivity('Music');

    });

    await client.login(process.env.TOKEN);

  } catch (error) {
    console.log(`Error: ${error}`);
  }

})();