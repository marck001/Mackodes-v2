
  const { isVoiceChannel } = require('../../functions/voice-channels/isVoiceChannel')
  const { hasRole} = require('../../functions/general/hasRole')
  module.exports = {
  
    name: 'autoplay',
    description: 'toggles autoplay mode',
    /*options: [
      {
        name: 'playlist',
        description: 'Selected playlist only',
        required: false,
        type: ApplicationCommandOptionType.String,
      },
    ],*/
    devOnly: true,
  
    callback: async (client, interaction) => {
      //const  playlist = interaction.options.getString('playlist');
  
  
      try {
  
        const voiceChannel = interaction.member.voice.channel;
  
        if (!isVoiceChannel(interaction) ||!hasRole(interaction)) return;
  
        console.log('first')
        await interaction.deferReply();
  

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue) {
          interaction.editReply("Queue is empty");
          return;
        }else{
          queue.songs = [];
          console.log('Previous queue cleared.');
 
        }

          const songs = await Song.findAll({ where: { guildId: guildId }})
          if (!songs.length) {
            return interaction.editReply('No songs found.');
          }
    
          console.log('Processing songs:', songs.map(song => song.url));
    
          console.log(queue.songs)

    
         
            songs.sort(() => Math.random() - 0.5);
       
    
          const firstSong = songs[0];
          await client.player.play(voiceChannel, firstSong.url, {
            textChannel: interaction.channel,
            member: interaction.member,
            interaction: interaction,
          });
    
        
    
          for (let i = 1; i < songs.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            console.log(songs[i].url)
            await client.distube.play(voiceChannel, songs[i].url, {
              textChannel: interaction.channel,
              member: interaction.member,
              interaction: interaction,
            });
          }
          console.log('All songs from the playlist are now playing.');
        
        
          console.log('Autplaylist')
    
          await interaction.followUp({
            content: `Auto play list **enabled**`,
            ephemeral:true
          });
        
  
      } catch (err) {
  
        console.log(err)
        await interaction.followUp({
          content: `Someone tell Mac, there's a problem with my system.`,
          ephemeral: true,
        });
  
      }
  
  
  
  
    },
  };
  