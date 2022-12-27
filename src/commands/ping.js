module.exports = {
    name: 'ping',
    description: 'wesh c la blague ',
    aliases: ['pong'],
    execute(message, args) {
        message.reply(`Pong!`);
    },

};