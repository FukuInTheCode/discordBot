const { connection } = require('../server.js');



module.exports = {
    name: 'signup',
    description: 'test for the signup command',
    aliases: ['signup'],
    execute(message, args) {
        if (args.length != 0) {
            message.reply(`${message.author}, please use the command correctly as follow: \n !signup`);
            return;
        }

        connection.query(`SELECT signup('${message.author.id}', '${message.author.username}')`, (err, result, field) => {
            if (err) throw err;

            console.log(result);
        })

    }
};