module.exports = {
    name: 'ping',
    description: "thi is a ping command!",
    execute(message, args){
        message.channel.send('pong!');
    }
}