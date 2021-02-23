const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
let coins = require('../../coins.json');

module.exports = {
    name: 'monthly',
    description: 'Receive a monthly sum of money!',

    async execute (message, args) {

        let user = message.author;
        let timeout = 2628000000;
        let amount = Math.floor(Math.random() * 250000) + 500000;
        let sCoins = coins[message.author.id].coins

        let monthly = await db.fetch(`monthly_${message.guild.id}_${user.id}`);

        if (monthly !== null && timeout - (Date.now() - monthly) > 0){
            let time = ms(timeout - (Date.now() - monthly));

            let monthlyCooldown = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("**Slow it down!**")
            .setDescription(`I can't afford to pay you this much! Come back in **${time.days} ${time.hours}h, ${time.minutes}m, and ${time.seconds}s**!`)
            .setTimestamp();

            message.channel.send(monthlyCooldown);
        } else {
            coins[message.author.id] = {
                coins: sCoins + amount
            }
            db.set(`monthly_${message.guild.id}_${user.id}`, Date.now());

            let monthlyEmbed = new Discord.MessageEmbed()
            .setColor('#3cba85')
            .setTitle(`**Here are your monthly coins, ${message.author.username}`)
            .setDescription(`Here is $${amount} for your patience`)
            .setTimestamp();

            message.channel.send(monthlyEmbed);
        }
    }
}