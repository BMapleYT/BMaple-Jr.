module.exports = (client) => {
    const isInvite = async (guild, code) => {
        return await new Promise(resolve => {
            guild.fetchInvites().then(invites => {
                for (const invite of invites) {
                    if (code === invite[0]) {
                        resolve(true)
                        return
                    }
                }

                resolve(false)
            })
        })
    }

    client.on('message', async (message) => {
        const { guild, member, content } = message

        //discord.gg/uJRpyq3

        const code = content.split('discord.gg/' || 'discord.com/invite/') [1]
        console.log('CODE: ', code)

        if (content.includes('discord.gg/' || 'discord.com/invite/')) {

            const IsOurInvite = await isInvite(guild, code)
            if (!IsOurInvite) {
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                if (!member.hasPermission("MANAGE_ROLES")) {
                    member.roles.add(muteRole)
                    message.channel.send(`${member} has been muted for advertising!`)
                } else {
                    return
                }
            }
        }
    })
}