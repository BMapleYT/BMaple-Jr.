const { Client } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: "giveaway",
    description: "Starts a giveaway!",

    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you do not have permission to run this command!");

        let channel = message.mentions.channels.first();

        if (!channel) return message.reply("please provide a channel!");

        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.reply("please provide a valid duration for this giveaway!");

        let giveawayWinners = args[2];

        if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.reply("please provide a valid number of winners!");

        let giveawayPrize = args.slice(3).join(" ");

        if (!giveawayPrize) return message.reply("you must specify the prize that you want to give away!");

        client.giveawaysManager.start(channel, {
            hostedBy: client.config.hostedBy ? message.author : null,

            messages: {
                giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY",
                giveawayEned: (client.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY ENDED",
                timeRemaining: `Time remaining: **${giveawayDuration}**`,
                inviteToParticipate: "React with 🎉 to enter!",
                winMessage: `Congrats **${giveawayWinners}**, you won **${giveawayPrize}`,
                embedFooter: "Giveaway time!",
                noWinner: "Couldn't determine a winner!",
                hostedBy: `Hosted by ${user}!`,
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        })

        message.channel.send(`Giveaway starting in ${channel}!`);
    }
}