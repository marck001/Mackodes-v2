const { hasRole } = require('../../functions/general/hasRole')
const { isVoiceChannel } = require('../../functions/voice-channels/isVoiceChannel')
module.exports = {

    name: 'previous',
    description: 'goes back to previous song',
    devOnly: true,
    callback: async (client, interaction) => {

        try {

            //const voiceChannel = interaction.member.voice.channel;

            if (!isVoiceChannel(interaction) || !hasRole(interaction)) return;

            console.log('first')
            await interaction.deferReply();

            if (!queue || !queue.playing || queue.previousTracks.length === 0) {
                return interaction.editReply({ content: 'There is no previous song to go back to!', ephemeral: true });
            }

          //  await queue.previous();

            console.log('previous')

            await interaction.followUp({
                content: `**Previous song**`,
                ephemeral: true
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
