const Discord = require("discord.js");
const superagent = require("superagent");
const { execute } = require("./level");

module.exports = {
    name: 'doggo',
    Description: "Pulls up an image/gif of a cute doggo!",
    async execute(message, args) {
        let {body} = await superagent
        .get(`https://random.dog/woof.json`);

        let dogembed = new Discord.MessageEmbed()
        .setColor("#c4b26a")
        .setTitle("Bork bork 🐶")
        .setImage(body.url)
        .setDescription(`Requested by ${message.author.username}`)
        message.channel.send(dogembed);
    }
}