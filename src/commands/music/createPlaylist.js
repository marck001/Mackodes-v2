const {
    ApplicationCommandOptionType,
    PermissionFlagsBits, ChannelType,
} = require('discord.js');
const Playlist = require('../../models/Playlist');

module.exports = {

    name: 'create-playlist',
    description: 'Creates a playlist',
    options: [
        {
            name: 'name',
            description: 'Name for the playlist',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'embed-img',
            description: 'Attach an image url for playlist',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    devOnly: true,
    permissionsRequired: [PermissionFlagsBits.Administrator],

    callback: async (client, interaction) => {
        const name = interaction.options.getString('name');
        const embedImg = interaction.options.getString('embed-img');


        try {

            const userId = interaction.user.id;
            const guildId = interaction.guild.id;

            await interaction.deferReply();
            const playlist = new Playlist({userId: userId,  name: name,  guildId: guildId ,embed:embedImg});
            await playlist.save();

            await interaction.followUp({
                content: `Playlist **${name}** has been created. Add songs with /add-song command`,
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
