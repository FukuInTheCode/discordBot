const { connection } = require('../server.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "profile",
    description: "profile visualization",
    aliases: ['profile', 'p'],

    execute(message, args) {

        if (args == 1) {
            connection.query(``)
        }


        const profileEmbed = new EmbedBuilder()
            .setTitle(`${message.author.username}'s profile`)
            .setFields(
                { name: `Level:`, value: `999` },
                { name: `XP:`, value: `666/1000` }
            )
            .setColor(0x0099FF)
            .setThumbnail(message.author.displayAvatarURL());


        message.reply({ embeds: [profileEmbed] });

    }

}