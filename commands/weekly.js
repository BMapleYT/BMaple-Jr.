const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
let coins = require('../coins.json');

module.exports = {
    name: 'weekly',
    description: 'Receive a weekly sum of money!',

    async execute (message, args) {

        let user = message.author;
        let timeout = 604800000;
        let amount = Math.floor(Math.random() * 1000) + 1000;
        let sCoins = coins[message.author.id].coins

        let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0){
            let time = ms(timeout - (Date.now() - weekly));

            let weeklyCooldown = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("**Slow it down!**")
            .setDescription(`I can't afford to pay you this much! Come back in **${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s**!`)
            .setTimestamp();

            message.channel.send(weeklyCooldown);
        } else {
            coins[message.author.id] = {
                coins: sCoins + amount
            }
            db.set(`weekly_${message.guild.id}_${user.id}`, Date.now());

            let weeklyEmbed = new Discord.MessageEmbed()
            .setColor('#3cba85')
            .setTitle(`**Here are your weekly coins, ${message.author.username}**`)
            .setDescription(`Here is $${amount} for your patience!`)
            .setTimestamp();

            message.channel.send(weeklyEmbed);
        }
    }
}