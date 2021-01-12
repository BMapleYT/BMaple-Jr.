const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let warnings = require("./warnings.json");
// const config = require('./config.json');
// client.config = config;
const prefix = ".";

const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storeate: "./giveaways.json",
    updateCountDownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`${client.user.username} is now active!`);
    client.user.setActivity('BMaple', { type: 'WATCHING' });
});

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('760216039316389888').send(`Welcome <@${guildMember.user.id}> to the BMaple Community Discord Server! Make sure to read the rules!`)
});

client.on('message', message => {
    //prevents the bot from getting xp
    if (message.author.bot) return;

    //-- Start of AntiPing --
    const user = message.mentions.users.first()
    const bmaple = client.users.cache.find(user => user.id === '395261516250873858');

    if (user === bmaple) {
        message.delete();
        message.reply("please do not ping the owner!")
    }
    //-- End of AntiPing --


    //-- Start of AutoMod --

    if (message === "poggers") {
        message.delete();

    }

    //-- End of AutoMod --


    //XP System
    if (!message.channel.id === '797246144874020904' || '771478402255421500') {
        let xpAdd = Math.floor(Math.random() * 7) + 8;
        console.log(xpAdd);

        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };
        }
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);

    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;

    //Level Rank Definitions
    let lvlFive = message.guild.roles.cache.find(role => role.name === 'Low Level Fan (Lvl 5+)');
    let lvlTen = message.guild.roles.cache.find(role => role.name === 'Okish Level Fan (Lvl 10+)');
    let lvlFifteen = message.guild.roles.cache.find(role => role.name === 'Medium Level Fan (Lvl 15+)');
    let lvlTwenty = message.guild.roles.cache.find(role => role.name === 'Decent Level Fan (Lvl 20+)');
    let lvlTwentyFive = message.guild.roles.cache.find(role => role.name === 'Highish Level Fan (Lvl 20+)');
    let lvlThirty = message.guild.roles.cache.find(role => role.name === 'High Level Fan (Lvl 30+)');
    let lvlFourty = message.guild.roles.cache.find(role => role.name === 'Supreme Level Fan (Lvl 40+)');
    let lvlFifty = message.guild.roles.cache.find(role => role.name === 'GOD Level Fan (Lvl 50+)');
    let lvlSixty = message.guild.roles.cache.find(role => role.name === 'TITAN Level Fan (Lvl 60+)');
    let lvlSeventy = message.guild.roles.cache.find(role => role.name === 'OVERLORD Level Fan (Lvl 70+)');
    let lvlEighty = message.guild.roles.cache.find(role => role.name === 'GALAXY Level Fan (Lvl 80+)');
    let lvlNinety = message.guild.roles.cache.find(role => role.name === 'UNIVERSE Level Fan (Lvl 90+)');
    let lvlOneHundred = message.guild.roles.cache.find(role => role.name === 'MULTIVERSE Level Fan (Lvl 100+)');


    //Level Ups
    xp[message.author.id].xp = curxp + xpAdd;
    if (nxtLvl <= xp[message.author.id].xp) {
        xp[message.author.id].level = curlvl + 1;
        xp[message.author.id].xp = 0;

        message.channel.send(`${message.author} has advanced to level ${curlvl + 1}! Good job! <:peepopoggers:760270954760503316>`);
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if (err) console.log(err)
    });

    //XP Level Roles
    if (curlvl >= 5) {
        message.member.roles.add(lvlFive);
    }
    if (curlvl >= 10) {
        message.member.roles.add(lvlTen);
    }
    if (curlvl >= 15) {
        message.member.roles.add(lvlFifteen);
    }
    if (curlvl >= 20) {
        message.member.roles.add(lvlTwenty);
    }
    if (curlvl >= 25) {
        message.member.roles.add(lvlTwentyFive);
    }
    if (curlvl >= 30) {
        message.member.roles.add(lvlThirty);
    }
    if (curlvl >= 40) {
        message.member.roles.add(lvlFourty);
    }
    if (curlvl >= 50) {
        message.member.roles.add(lvlFifty);
    }
    if (curlvl >= 60) {
        message.member.roles.add(lvlSixty);
    }
    if (curlvl >= 70) {
        message.member.roles.add(lvlSeventy);
    }
    if (curlvl >= 80) {
        message.member.roles.add(lvlEighty);
    }
    if (curlvl >= 90) {
        message.member.roles.add(lvlNinety);
    }
    if (curlvl >= 100) {
        message.member.roles.add(lvlOneHundred);
    }




    //Coin system
    if (!coins[message.author.id]) {
        coins[message.author.id] = {
            coins: 0
        };
    }

    //Coin Earning System
    let coinAmt = Math.floor(Math.random() * 15) + 1;
    let baseAmt = Math.floor(Math.random() * 15) + 1;

    if (coinAmt === baseAmt) {
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        });
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //Command Handler
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args)
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message, args)
    } else if (command === 'ban') {
        client.commands.get('ban').execute(message, args)
    } else if (command === 'mute') {
        client.commands.get('mute').execute(message, args)
    } else if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args)
    } else if (command === 'rules') {
        client.commands.get('rules').execute(message, args)
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args)
    } else if (command === '8ball') {
        client.commands.get('8ball').execute(message, args)
    } else if (command === 'meme') {
        client.commands.get('meme').execute(message, args)
    } else if (command === 'tester') {
        client.commands.get('tester').execute(message, args)
    } else if (command === 'detester') {
        client.commands.get('detester').execute(message, args)
    } else if (command === 'warn') {
        client.commands.get('warn').execute(message, args)
    } else if (command === 'coins') {
        client.commands.get('coins').execute(message, args)
    } else if (command === 'pay') {
        client.commands.get('pay').execute(message, args)
    } else if (command === 'shop') {
        client.commands.get('shop').execute(message, args)
    } else if (command === 'buy') {
        client.commands.get('buy').execute(message, args)
    } else if (command === 'daily') {
        client.commands.get('daily').execute(message, args)
    } else if (command === 'work') {
        client.commands.get('work').execute(message, args)
    } else if (command === 'level') {
        client.commands.get('level').execute(message, args)
    } else if (command === 'doggo') {
        client.commands.get('doggo').execute(message, args)
    }
});



//Bot Login Token
client.login("NzgzODA3OTIzNjQ1ODQxNDI5.X8gIAw.tTpev-6u2WoZOCfC6CJ1gMgofdQ");