const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const coins = require('../../coins.json');
const { execute } = require('./daily');

module.exports = {
    name: "work",
    description: "Work your a** off",

    async execute (message, args) {
        let user = message.author;
        let timeout = 600000;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`);
        let sCoins = coins[message.author.id].coins;

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.reply(`You need to wait **${time.minutes} and ${time.seconds}** until you can work again!`)
        } else {
            let amount = Math.floor(Math.random() * 80) + 1;

            coins[message.author.id] = {
                coins: sCoins + amount
            }
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())
            message.reply(`**BOSS:** Good job on that work ${message.author}. You were given ${amount} for 10 minutes of hard work.`);
        }
    }
}