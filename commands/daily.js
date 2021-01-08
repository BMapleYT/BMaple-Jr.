const db = require('quick.db');
const ms = require('parse-ms');
let coins = require('../coins.json')

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

            return message.reply(`you have already collected your daily coins! Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s!`);
        } else {
            coins[message.author.id] = {
                coins: sCoins + amount
            }
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            message.reply(`You have received ${amount} as your daily sum of coins!`);
        }
    }
}