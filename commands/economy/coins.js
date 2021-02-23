const Discord = require("discord.js");
let coins = require("../../coins.json");

module.exports = {
    commands: ['coins', 'bal', 'balance'],
    expectedArgs: [],
    permissionError: [],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        //.coins
        if(!coins[message.author.id]){
            coins[message.author.id] = {
                coins: 0
            };
        }

    let uCoins = coins[message.author.id].coins;

    let coinEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor("#0f9946")
    .addField("💸", uCoins);

    message.channel.send(coinEmbed);
    },
    permissions: [],
    requiredRoles: [],
}