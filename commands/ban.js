module.exports = {
    name: 'ban',
    description: "This command bans a member from the server!",
    execute(message, args){

        if(message.member.hasPermission('BAN_MEMBERS')){
            const member = message.mentions.users.first();
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
            message.channel.send("User has been banned");
        }else{
            message.channel.send("You couldn't ban that member because they do not exist!");
        }

        }else{
            message.channel.send("You can't send this command because you don't have the right permissions!");
        }
    }
}