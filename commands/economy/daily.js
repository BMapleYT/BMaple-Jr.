const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
let coins = require('../../coins.json');

module.exports = {
    name: 'daily',
    description: 'Receive a daily sum of money!',

    async execute (message, args) {

        let user = message.author;
        let timeout = 86400000;
        let amount = Math.floor(Math.random() * 500) + 500;
        let sCoins = coins[message.author.id].coins

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));

            let dailyCooldown = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("**Slow it down!**")
            .setDescription(`I can't afford to pay you this much! Come back in **${time.hours}h, ${time.minutes}m, and ${time.seconds}s**!`)
            .setTimestamp();

            message.channel.send(dailyCooldown);
        } else {
            coins[message.author.id] = {
                coins: sCoins + amount
            }
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            let dailyEmbed = new Discord.MessageEmbed()
            .setColor('#3cba85')
            .setTitle(`**Here are your daily coins, ${message.author.username}`)
            .setDescription(`Here is $${amount} for your patience`)
            .setTimestamp();

            message.channel.send(dailyEmbed);
        }
    }
}