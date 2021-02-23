const Discord = require("discord.js");

module.exports = {
    commands: '8ball',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<question>',
    callback: async (message, arguments, text) => {

        //.8ball <question ghjgajkdj>
        let replies = ["Yes.", "No.", "I don't know.", "Ask again later.", "100% YES!!!!", "Definitiely Not.", "That's a hard no."];

        let result = Math.floor((Math.random() * replies.length));
        let question = arguments.slice(0).join(" ");

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setColor("#FF9900")
            .addField("Question", question)
            .addField("Answer", replies[result]);

        message.channel.send(embed);
    }
}