const {
    ApplicationCommandOptionType,

} = require('discord.js');
const { isVoiceChannel } = require('../../functions/voice-channels/isVoiceChannel')
const { hasRole} = require('../../functions/general/hasRole')
module.exports = {

    name: 'loop',
    description: 'Repeats songs',
    options: [
        {
            name: 'mode',
            description: 'Repeat mode: 0 (Off), 1 (Song), 2 (Queue)',
            required: false,
            type: ApplicationCommandOptionType.Number
        },
    ],
    devOnly: true,

    callback: async (client, interaction) => {

        const modeOption = interaction.options.get("mode");
        const num = modeOption ? modeOption.value : 0;

        if(num>2 || num<0)
            return interaction.reply({
                content: `No valid mode \n Please try: 0 (Off), 1 (Song), 2 (Queue) `,
                ephemeral: true
            });
    


        try {

            if (!isVoiceChannel(interaction) ||!hasRole(interaction)) return; 

            await interaction.deferReply();
            
            //const voiceChannel= interaction.member.voice.channel;

            const queue = client.player.getQueue(interaction.guild.id);

            if (!queue) {
                await interaction.editReply({
                    content: `There's no queue`,
                    ephemeral: true
                });
                return;
            }

            if (queue.playing) {
            let mode = queue.setRepeatMode(num);
                mode = mode ? (mode === 2 ? "queue" : "song") : "Off";
                await interaction.followUp({
                    content: `Repeating ${mode}`,
                    ephemeral: true,
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
