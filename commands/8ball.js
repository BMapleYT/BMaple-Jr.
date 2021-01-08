const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    description: "Test the wisdom of the magic 8ball by asking it questions!",
    async execute(message, args) {

        //.8ball <question ghjgajkdj>
        if (!args[1]) return message.reply("Please ask a full question!");
        let replies = ["Yes.", "No.", "I don't know.", "Ask again later.", "100% YES!!!!", "Definitiely Not.", "That's a hard no."];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setColor("#FF9900")
            .addField("Question", question)
            .addField("Answer", replies[result]);

        message.channel.send(embed);



    }
}