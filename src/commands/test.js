//! bin/node

const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'test',
    aliases: ['test'],
    execute(message, args) {

        const exampleEmbed = new EmbedBuilder().setTitle('updated gg');

        message.reply({ embeds: [exampleEmbed] });

    }
}