const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const ms = require('parse-ms');
let coins = require('../../coins.json');
let xp = require("../../xp.json");

module.exports = {
    commands: ['buy'],
    expectedArgs: '<item>',
    permissionError: [],
    minArgs: 1,
    maxArgs: 1,

    callback: async (message, arguments, text) => {
        //.buy <item>

        if (!coins[message.author.id]) {
            return message.reply("you don't have any coins!")
        }
        if (!args[0]) {
            return message.reply("you must specify the item that you want to buy!")
        }
        let sCoins = coins[message.author.id].coins;
        let itemBuyer = message.guild.members.cache.get(message.author.id);
        let vip = message.guild.roles.cache.find(role => role.name === 'VIP');
        let mvp = message.guild.roles.cache.find(role => role.name === 'MVP');
        let private = message.guild.roles.cache.find(role => role.name === 'Private Chatter');
        let shoutouts = message.guild.channels.cache.find(channel => channel.name === 'shoutout-requests');

        //.buy vip
        if (args[0] === "vip") {
            if (sCoins < 1000) {
                message.reply("you don't have enough coins to buy this item!")
            } else {
                itemBuyer.roles.add(vip.id)
                message.reply("you now have the VIP Rank!")
                coins[message.author.id] = {
                    coins: sCoins - 1000
                }
            }
        }

        //.buy mvp
        if (args[0] === "mvp") {
            if (sCoins < 2500) {
                message.reply("you don't have enough coins to buy this item!")
            } else {
                itemBuyer.roles.add(mvp.id)
                message.reply("you now have the MVP Rank!")
                coins[message.author.id] = {
                    coins: sCoins - 2500
                }
            }
        }

        //.buy privatechat
        if (args[0] === "privatechat") {
            if (sCoins < 5000) {
                message.reply("you don't have enough coins to buy this item!")
            } else {
                itemBuyer.roles.add(private.id)
                message.reply("you now have access to the private chat!")
                coins[message.author.id] = {
                    coins: sCoins - 5000
                }
            }
        }

        //.buy shoutoutdisc
        if (args[0] === "shoutoutdisc") {
            if (sCoins < 50000) {
                message.reply("you don't have enough coins to buy this item!")
            } else {
                let discEmbed = new Discord.MessageEmbed()
                .setTitle("New Shoutout Request!")
                .addField("Requested By: ", message.author)
                .addField("Type Requested: ", "Discord")
                .setTimestamp();

                shoutouts.send(discEmbed);
                message.reply("your shoutout request is being processed! BMaple will shout you out as soon as he can!");
            }
        }

        //.buy shoutoutyt
        if (args[0] === "shoutoutyt") {
            if (sCoins < 100000) {
                message.reply("you don't have enough coins to buy this item!")
            } else {
                let ytEmbed = new Discord.MessageEmbed()
                .setTitle("New Shoutout Request!")
                .addField("Requested By: ", message.author)
                .addField("Type Requested: ", "YouTube")
                .setTimestamp();

                shoutouts.send(ytEmbed);
                message.reply("your shoutout request is being processed! BMaple will shout you out in his next video!");
            }
        }
    },
    permissions: [],
    requiredRoles: [],
}