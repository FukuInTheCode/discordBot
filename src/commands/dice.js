module.exports = {
    name: 'dice',
    description: 'roll a dice',
    aliases: ['dice'],
    execute(message, args) {

        if (args.length != 1 || isNaN(Number(args[0]))) {
            message.reply(`${message.author}, you did not use correctly the command.\n !dice \`\`NUMBER\`\`.`);
            return;
        }
        message.reply(
            `You rolled a ${Math.floor(Math.random() * (args[0])) + 1} !`
        );
    },

};