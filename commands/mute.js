const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "This mutes a member",
    execute(message, args) {
        if(message.member.hasPermission('MANAGE_ROLES')){
            const target = message.mentions.users.first();
            if (target) {
     
                let muteRole = message.guild.roles.cache.find(role => role.id === '759129133094666310');
     
                let memberTarget = message.guild.members.cache.get(target.id);
     
                if (!args[1]) {
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> has been muted!`);
                    return
                }
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
     
                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                }, ms(args[1]));
            } else {
                message.channel.send('Cant find that member!');
            }
        } else if(!message.member.hasPermission('MANAGE_ROLES')){
            message.reply("you do not have the correct permissions to use this command!")
        }
    }
}