const Discord = require("discord.js");

module.exports = {
    name: 'shop',
    description: 'Displays the shop!',

    async execute(message, args) {

        const embed = new Discord.MessageEmbed()
        .setTitle('Shop')
        .setDescription('VIP Rank - 1,000 coins (.buy vip) \n \n MVP Rank - 2,500 coins (.buy mvp) \n \n Access to Private Chat - 5,000 coins (.buy privatechat) \n \n Shoutout in Discord - 50,000 coins (.buy shoutoutdisc) \n \n Shoutout in Video - 100,000 coins (.buy shoutoutyt)')
        .setTimestamp();

        message.channel.send(embed);
    }
}