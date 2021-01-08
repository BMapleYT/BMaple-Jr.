module.exports = {
    name: 'detester',
    description: "Removes the bot tester role from the user!",
    execute(message, args){
        if(message.member.hasPermission('MANAGE_ROLES')){
            const target = message.mentions.users.first();
            if(target){
                let testRole = message.guild.roles.cache.find(role => role.name === 'Bot Tester');
     
                let memberTarget= message.guild.members.cache.get(target.id);
     
                memberTarget.roles.remove(testRole.id);
                message.channel.send(`<@${memberTarget.user.id}> is no longer a bot tester!`);
            } else{
                message.channel.send('Cant find that member!');
            }
        }
    }
}