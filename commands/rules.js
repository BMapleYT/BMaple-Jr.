const Discord = require('discord.js');

module.exports = {
    name: 'rules',
    description: "Sends an embed with all of the rules!",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setImage('https://i.imgur.com/3cS5Ftw.png')
            .setTitle('Rules')
            .setAuthor('Read the rules!')
            .setDescription("These are all of the rules for the server!")
            .setColor('#00375D')
            .addFields(
                {name: '__**Rules**__', value: "These are the rules of the server"},
                {name: '**#1: **', value: "Don't use slurs or words like the F or S word."},
                {name: '**#2: **', value: "No advertising!"},
                {name: '**#3: **', value: "Don't try to put any viruses on other people's computers by putting random download links."},
                {name: '**#4: **', value: "Use the right topics for the right channels. I don't want #general having a ton of bot commands in it."},
                {name: '**#5: **', value: "Don't bully people."},
                {name: '**#6: **', value: "Don't spam"},
                {name: '**#7: **', value: "Don't beg for roles it's hopeless"},
                {name: '**#8: **', value: "Don't impersonate bots/staff."},
                {name: '**#9: **', value: "Don't ask people for personal information."},
                {name: '**#10: **', value: "Don't minimod the server. If you want to moderate the chat, apply for mod in #staff-application"},
                {name: '**#11: **', value: "If you want to report someone, don't go crying about it in chat. Just DM a staff member"}
            )


        message.channel.send(embed)
    }
}