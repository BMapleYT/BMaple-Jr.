const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: "Sends an embed with all of the commands for the bot",
    execute(message, args) {

        if (!args[0]) {
            const helpCmds = new Discord.MessageEmbed()
                .setTitle("`Command Help`")
                .addField("`Fun Commands`", ".help fun")
                .addField("`Moderator Commands`", ".help moderator")
                .addField("`Currency Commands`", ".help currency")
                .setTimestamp()

            message.channel.send(helpCmds)

        }


        //Mod Commands
        if (args[0] = "moderator") {
            const modCmds = new Discord.MessageEmbed()
                .setTitle("`Moderator Commands`")
                .addField("`.ban [user] [reason]`", "Bans a user from the server")
                .addField("`.kick [user] [reason]`", "Kicks a user from the server")
                .addField("`.mute [user] [optional time] [reason]`", "Mutes a user for an optional amount of time")
                .addField("`.unmute [user]`", "Unmutes a user")
                .addField("`.warn [user] [optional reason]`", "Warns a user")
                .setTimestamp()

            message.channel.send(modCmds)

        }
        

        //Fun Commands
        if (args[0] = "fun") {
            const funCmds = new Discord.MessageEmbed()
                .setTitle("`Fun Commands`")
                .addField("Coming Soon!", "In Development!")
                .setTimestamp();

            message.channel.send(funCmds)
        }
    }
}