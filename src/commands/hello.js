module.exports = {
    name: 'hello',
    description: 'say hello',
    aliases: ['hi'],
    execute(message, args) {
        message.reply(`Hello World!`);
    },

};