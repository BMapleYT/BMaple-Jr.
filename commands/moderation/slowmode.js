const Discord = require('discord.js');

module.exports = {
    name: "slowmode",
    description: "Set the specified slowmode for a channel",
    aliases: "sm",

    execute(message, args) {
        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            const { channel } = message

            if (!args[0]) return message.reply("you must provide a slowmode to set this channel to!");
            
            let duration = args.shift().toLowerCase();
            if (duration === 'off') {
                duration = 0
            }

            if (isNaN(duration)) {
                message.reply('please provide a valid number!')
                return
            }

            channel.setRateLimitPerUser(duration)
            message.reply(`The slowmode for this channel is now ${duration}!`)
        }
    }
}