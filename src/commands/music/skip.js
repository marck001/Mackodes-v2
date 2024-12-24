const { hasRole } = require('../../functions/general/hasRole')
const { isVoiceChannel } = require('../../functions/voice-channels/isVoiceChannel')
module.exports = {

    name: 'skip',
    description: 'skips one song to the next',
    devOnly: true,
    callback: async (client, interaction) => {

        try {

            if (!isVoiceChannel(interaction) || !hasRole(interaction)) return;


            await interaction.deferReply();
            console.log('first')
            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue || !queue.playing) {
                return interaction.editReply({ content: 'There is no song currently playing!', ephemeral: true });
            }

            queue.skip();
            await interaction.editReply({ content: 'Skipped to the next song!', ephemeral: true });

        } catch (err) {

            console.log(err)
            await interaction.followUp({
                content: `Someone tell Mac, there's a problem with my system.`,
                ephemeral: true,
            });

        }




    },
};
