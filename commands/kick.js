module.exports = {
    name: 'kick',
    description: "This command kicks a member from the server!",
    execute(message, args) {

        if (message.member.hasPermission('KICK_MEMBERS')) {
            const member = message.mentions.users.first();
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick();
                message.channel.send("User has been kicked");
            } else {
                message.channel.send("You couldn't kick that member because they do not exist!");
            }

        } else if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply("You do not have the correct permissions to use this command!")
        }
    }
}