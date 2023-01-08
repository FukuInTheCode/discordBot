module.exports = {
    name: 'hello',
    description: 'say hello',
    aliases: ['hi', 'hello'],
    execute(message, args) {
        message.reply(`Hello World!`);
    },

};