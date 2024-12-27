const { join } = require('path');
const fs = require('fs');
const { useMainPlayer } = require('discord-player');
const { isVoiceChannel } = require('../../functions/voice-channels/isVoiceChannel');
const ffmpeg = require('fluent-ffmpeg');
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
      }

      console.log('Resolved file path:', filePath);

     
      const player = useMainPlayer();

    
      const queue = player.nodes.create(interaction.guild, {
        metadata: {
          channel: interaction.channel, 
        },
      });

    
      if (!queue.connection) await queue.connect(voiceChannel);

     // const stream = fs.createReadStream(filePath);
     const stream = ffmpeg(filePath)
     .format('mp3')  // Set the format you need
     .audioCodec('libmp3lame') // Ensure compatibility
     .pipe();

      
      queue.addTrack({
        title: 'Echo Crusher',
        description: 'Local File',
        author: 'Local File',
        url: filePath,
        duration: 'Unknown',
        requestedBy: interaction.user,
        createStream: () =>stream,
      });

      if (!queue.node.isPlaying()) await queue.node.play();

      await interaction.reply({
        content: `Now playing: **${fileName}** in **${interaction.guild.name}**!`,
        ephemeral: false, 
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error trying to play the file in your server.',
        ephemeral: true,
      });
    }
  },
};
