const connection = require('../server.js');

console.log(connection);

module.exports = {
    name: 'sqltest',
    description: 'test a sql program',
    aliases: ['sql'],
    async execute(message, args) {
        if (args.length != 1) {
            message.reply(`${message.author}, please use the command correctly as follow: \n !sqltest \`\`AN USERNAME\`\`.`);
            return;
        }

    }
};