module.exports = {
    name: 'ping',
    description: 'wesh c la blague ',
    aliases: ['ping', 'ms'],
    execute(message, args) {
        message.reply(`Pong!`);
    },

};