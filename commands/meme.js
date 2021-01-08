const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'meme',
    description: "Displays a meme from a public API",
    execute(message, args) {
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(async json => {
                let msg = await message.channel.send('Fetching you a meme!');
                const memeEmbed = new Discord.MessageEmbed()
                    .setTitle(json.title)
                    .setImage(json.url)
                    .setFooter(`Subreddit: ${json.subreddit}`)
                    .setURL(json.postLink);

                msg.edit(memeEmbed);
            });
    }
}