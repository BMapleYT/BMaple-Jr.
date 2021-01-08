module.exports = {
    name: 'tester',
    description: "Gives the user the bot tester role",
    execute(message, args){
        if(message.member.hasPermission('MANAGE_ROLES')){
            const target = message.mentions.users.first();
            if(target){
                let testRole = message.guild.roles.cache.find(role => role.name === 'Bot Tester');
     
                let memberTarget= message.guild.members.cache.get(target.id);
     
                memberTarget.roles.add(testRole.id);
                message.channel.send(`<@${memberTarget.user.id}> is now a bot tester!`);
            } else{
                message.channel.send('Cant find that member!');
            }
        }
    }
}