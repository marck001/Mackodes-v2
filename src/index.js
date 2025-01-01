require('dotenv').config();
const initializeDatabase = require('./db/dbInit');
const { MusicPlayer } = require('./modules/music-player');

(async () => {
  try {

    await initializeDatabase();

    const { Client, IntentsBitField} = require('discord.js');
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


    client.player = new MusicPlayer();

    eventHandler(client);
    
    await client.login(process.env.TOKEN);

  } catch (error) {
    console.log(`Error: ${error}`);
  }

})();