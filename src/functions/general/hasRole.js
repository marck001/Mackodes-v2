const { allowedRoles } = require('../../../config.json');


function hasRole(interaction) {

    const checkRole = interaction.member.roles.cache.some(role => allowedRoles.includes(role.id));

    if(!checkRole) {
        interaction.reply({content:"You need special role for using this command.", ephemeral:true});
        return false
    }else{
        return true
    }

}


module.exports = { hasRole }