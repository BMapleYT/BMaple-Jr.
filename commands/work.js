const db = require('quick.db');
const ms = require('parse-ms');
const coins = require('../coins.json');
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
            return message.reply(`you cannot work again for ${time.minutes}m and ${time.seconds}s`)
        } else {
            let amount = Math.floor(Math.random() * 80) + 1;

            coins[message.author.id] = {
                coins: sCoins + amount
            }
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())
            message.reply(`you worked and earned ${amount} coins!`)
        }
    }
}