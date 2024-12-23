const { hasRole} = require('../../functions/general/hasRole')
const { isVoiceChannel } = require('../../functions/voice-channels/isVoiceChannel')
module.exports = {

    name: 'skip',
    description: 'skips one song to the next',
    devOnly: true,
    callback: async (client, interaction) => {

        try {

            if (!isVoiceChannel(interaction) ||!hasRole(interaction)) return;

            
            await interaction.deferReply();
            console.log('first')
            const queue = client.distube.getQueue(interaction);

            if (!queue || !queue.songs.length) {
              await  interaction.editReply("Queue is empty");
                return;
            }

            if (queue.playing) {

                if(queue.songs.length<=0){
               await     interaction.editReply("There's no next song");
                    return;
                }
       
                await queue.skip();

                console.log('skip')

                await interaction.followUp({
                    content: `**Skipped Song**`,
                    ephemeral: true
                });
            } else {
              await  interaction.editReply("Nothing is getting played");
            }

        } catch (err) {

            console.log(err)
            await interaction.followUp({
                content: `Someone tell Mac, there's a problem with my system.`,
                ephemeral: true,
            });

        }




    },
};
