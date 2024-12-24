const { VoiceConnectionStatus, joinVoiceChannel} = require('@discordjs/voice');
const { isVoiceChannel } =require("../../functions/voice-channels/isVoiceChannel")
module.exports = {
  name: 'join-vc',
  description: 'Joins the voice channel where you are in',
  deleted: false,
  devOnly: true,

  callback: async (client, interaction) => {

   
      const myChannel = interaction.member.voice.channel;


      if (isVoiceChannel(interaction)){
          const connection = joinVoiceChannel({
            channelId: myChannel.id,
            guildId: myChannel.guild.id,
            adapterCreator: myChannel.guild.voiceAdapterCreator,
          });
    
          connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('The connection has entered the Ready state - ready to play audio!');
          });
    
          interaction.reply({
            content: `Successfully joined the voice channel **${myChannel.name}** - ready to play audio!`,
            ephemeral: true,
          });
    
        } else {
          interaction.reply({
            content: 'You must be in a Voice Channel!',
            ephemeral: true,
          });
        }
      }


  
};
