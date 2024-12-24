
const { isVoiceChannel } = require('../../functions/voice-channels/isVoiceChannel')
const { hasRole} = require('../../functions/general/hasRole')
module.exports = {

    name: 'shuffle',
    description: 'Shuffle a playlist getting played',
    devOnly: true,

    callback: async (client, interaction) => {

        try {

            if (!isVoiceChannel(interaction) ||!hasRole(interaction)) return; 

            await interaction.deferReply();
          //  const voiceChannel = interaction.member.voice.channel;

            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue) {
                await interaction.followUp({
                    content: `There's no queue`,
                    ephemeral: true
                });
                return;
            }

            if (queue.playing) {
                await queue.shuffle();
                await interaction.followUp({
                    content: `🔀 The queue has been shuffled.`,
                    ephemeral: true,
                });
            } else {
                interaction.editReply("Nothing is getting played");
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
