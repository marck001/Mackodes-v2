const { ApplicationCommandOptionType } = require('discord.js');
const { join } = require('path');
const fs = require('fs');
const { QueryType } = require('discord-player');
const { isVoiceChannel } = require('../../functions/voice-channels/isVoiceChannel');

module.exports = {
  name: 'play',
  description: 'Play music or add to the current queue',
  devOnly: true,

  callback: async (client, interaction) => {
    const voiceChannel = interaction.member.voice.channel;

    if (!isVoiceChannel(interaction)) return;

    try {
      const fileName = 'echo-crusher.mp3';
      const filePath = join(__dirname, '../../music', fileName);

      if (!fs.existsSync(filePath)) {
        return interaction.reply({ content: 'The specified file does not exist.', ephemeral: true });
      }else{
        console.log('it exists')
      }

      console.log('Resolved file path:', filePath);

      const queue = client.player.nodes.create(interaction.guild, {
        metadata: { channel: interaction.channel },
      });

      if (!queue.connection) await queue.connect(voiceChannel);

      const track = await client.player.search(filePath, {
        requestedBy: interaction.user,
        searchEngine: 'attachment',
      }).then(x => x.tracks[0]);

      if (!track) {
        return interaction.reply({ content: 'Could not find or play the file.', ephemeral: true });
      }

      queue.addTrack(track);
      if (!queue.node.isPlaying()) await queue.node.play();

      await interaction.reply({
        content: `Now playing local file: **${track.title}**`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error trying to play the file.',
        ephemeral: true,
      });
    }
  },
};
