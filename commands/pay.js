const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports = {
    name: 'pay',
    description: "Pay a user with your coins!",
    async execute(message, args) {
        //.pay <user> <amount>
        
        if(!coins[message.author.id]){
            return message.reply("you don't have any coins!")
        }
        if(!args[0]){
            return message.reply("you must specify a user!")
        }
        if(!args[1]){
            return message.reply("you must specify the amount of coins that you want to pay!")
        }

        let pUser = message.guild.member(message.mentions.users.first());

        if (pUser.id === message.author.id) return message.reply("you are not able to pay yourself!");

        if(!coins[pUser.id]){
            coins[pUser.id] = {
                coins: 0
            };
        }

        let pCoins = coins[pUser.id].coins;
        let sCoins = coins[message.author.id].coins;
        let transactions = message.guild.channels.cache.find(channel => channel.name === 'transactions');

        if(sCoins < args[1]) return message.reply("you do not have enough coins!");

        coins[message.author.id] = {
            coins: sCoins - parseInt(args[1])
        };

        coins[pUser.id] = {
            coins: pCoins + parseInt(args[1])
        };

        message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins!`);

        let transactionEmbed = new Discord.MessageEmbed()
        .setTitle("New Transaction!")
        .addField("Sender:", message.author)
        .addField("Receiver:", pUser)
        .addField("Amount:", parseInt(args[1]))
        .setTimestamp();

        transactions.send(transactionEmbed);

        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if(err) console.log(err);
        });
    }
}