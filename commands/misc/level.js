const Discord = require("discord.js");
let xp = require("../xp.json");

module.exports = {
    name: 'level',
    description: "Displays the user's current level!",
    async execute(message, args) {
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1,
            };
        }
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvlXp = curlvl * 300;
        let difference = nxtLvlXp - curxp;

        let lvlEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor('#1de0c0')
        .addField("Level", curlvl, true)
        .addField("XP", curxp, true)
        .setFooter(`${difference} XP until next level!`);

        message.channel.send(lvlEmbed);
    }
}