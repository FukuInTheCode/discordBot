const { connect_usersdb } = require('../server.js');
const { EmbedBuilder, User } = require('discord.js');

module.exports = {
    name: "profile",
    description: "profile visualization",
    aliases: ['profile', 'p'],

    execute(message, args) {

        const author = message.author;

        console.log(message.mentions.parsedUsers.at(0))

        if (args.length == 1) {
            const user_mentionned = message.mentions.parsedUsers.at(0);
            connect_usersdb.query(`CALL get_user('${user_mentionned.id}', '${user_mentionned.username}')`, (err, results, fields) => {
                if (err) throw err;

                console.log(results[0]);
            })
        } else if (args.length > 1) {
            message.reply('prout');
        }
    }
}