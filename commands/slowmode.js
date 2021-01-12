const Commando = require('commando');
const Discord = require('discord.js');

module.exports = {
    name: "slowmode",
    description: "Set the specified slowmode for a channel",
    aliases: "sm",

    execute(message, args) {
        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            const { channel } = message

            let duration = args.toLowerCase()
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