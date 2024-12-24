const { getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const { isVoiceChannel } =require("../../functions/voice-channels/isVoiceChannel")
module.exports = {
  name: 'leave-vc',
  description: 'Leaves the voice channel where you are in',
  deleted: false,
  devOnly: true,

  callback: async (client, interaction) => {

    if (!isVoiceChannel(interaction)) return;
    const myChannel = interaction.member.voice.channel;
    const connection = getVoiceConnection(myChannel.guild.id);


    if (connection) {
      connection.destroy();

      interaction.reply({
        content: `Successfully left the voice channel **${myChannel.name}**`,
        ephemeral: true,
      });

      connection.on(VoiceConnectionStatus.Disconnected, () => {
        console.log('The connection has entered the disconnected state');
      });

    } else {
      interaction.reply({
        content: `There's no a voice chat connection established`,
        ephemeral: true,
      });
    }
  },
};
