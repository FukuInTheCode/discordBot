const { connection } = require('../server.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "profile",
    description: "profile visualization",
    aliases: ['profile', 'p'],

    execute(message, args) {


        const profileEmbed = new EmbedBuilder()
            .setTitle(`${message.author.username}'s profile`)
            .setFields(
                { name: `Level:`, value: `999` },
                { name: `XP:`, value: `666/1000` }
            )
            .setFooter({ text: 'Fubot\u00A9', iconURL: `${message.client.user.displayAvatarURL()}` });

        message.reply({ embeds: [profileEmbed] });

    }

}