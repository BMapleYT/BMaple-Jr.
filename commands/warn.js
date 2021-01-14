const Discord = require("discord.js");
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: 'warn',
    description: "Warns a user!",
    async execute(message, args) {
        //warn <@user> <reason>
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You do not have permission to do this!");

        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

        let sWarns = warns[wUser.id].warns;
        
        if(!wUser) return message.reply("You cannot warn this member because they do not exist!");
        
        if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot warn this user!")
        
        let reason = args.join(" ").slice(22)
        
        if(!reason) return message.reply("You must specify a reason!");

        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };

        warns[wUser.id] = {
            warns = sWarns + 1
        }

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) {console.log(err)}
        })

        let warnEmbed = new Discord.MessageEmbed()
        .setAuthor(`User  has been warned!`)
        .setColor("#FC6400")
        .addField(`Warned by ${message.author.username}`, `${wUser} has been warned by ${message.author.username} for ${reason}! They now have ${warns[wUser.id].warns} warnings!`)

        message.channel.send(warnEmbed)

        if(warns[wUser.id].warns === 5){
            let muteRole = message.guild.roles.cache.find(`name`, "Muted");
            if(!muteRole) return message.reply("Role could not be found!");

            let muteTime = "5m";
            await(wUser.roles.add(muteRole.id));
            message.channel.send(`${wUser} has been muted for ${muteTime}!`);

            setTimeout(function(){
                wUser.roles.remove(muteRole.id)
            }, ms(muteTime))
        }
        if(warns[wUser.id].warns === 6){
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if(!muteRole) return message.reply("Role could not be found!");

            let muteTime = "10m";
            await(wUser.roles.add(muteRole.id));
            message.channel.send(`${wUser} has been muted for ${muteTime}!`);

            setTimeout(function(){
                wUser.roles.remove(muteRole.id)
            }, ms(muteTime))
        }
        if(warns[wUser.id].warns === 7){
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if(!muteRole) return message.reply("Role could not be found!");

            let muteTime = "15m";
            await(wUser.roles.add(muteRole.id));
            message.channel.send(`${wUser} has been muted for ${muteTime}!`);

            setTimeout(function(){
                wUser.roles.remove(muteRole.id)
            }, ms(muteTime))
        }
        if(warns[wUser.id].warns === 8){
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if(!muteRole) return message.reply("Role could not be found!");

            let muteTime = "20m";
            await(wUser.roles.add(muteRole.id));
            message.channel.send(`${wUser} has been muted for ${muteTime}!`);

            setTimeout(function(){
                wUser.roles.remove(muteRole.id)
            }, ms(muteTime))
        }
        if(warns[wUser.id].warns === 9){
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if(!muteRole) return message.reply("Role could not be found!");

            let muteTime = "25m";
            await(wUser.roles.add(muteRole.id));
            message.channel.send(`${wUser} has been muted for ${muteTime}!`);

            setTimeout(function(){
                wUser.roles.remove(muteRole.id)
            }, ms(muteTime))
        }
        if(warns[wUser.id].warns === 10){
            message.guild.member(wUser).kick(reason);
            message.channel.send(`${wUser} has been kicked because they had too many warnings!`)
        }
        if(warns[wUser.id].warns === 11){
            message.guild.member(wUser).ban(reason);
            message.channel.send(`${wUser} has been banned because they had too many warnings!`)
        }
    }
}