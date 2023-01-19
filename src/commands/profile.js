const { connect_usersdb } = require('../server.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "profile",
    description: "profile visualization",
    aliases: ['profile', 'p'],

    execute(message, args) {

        message.reply('Retreiving profile data...').then(reply => {

            const embedProfile = new EmbedBuilder;

            let user = message.author;


            if (args.length >= 1) {

                user = message.mentions.parsedUsers.at(0);

            }

            connect_usersdb.query(`CALL get_user('${user.id}', '${user.username}')`, (err, results, fields) => {
                if (err) throw err;

                const query = results[0][0];

                console.log(query);
            })
        })
    }
}