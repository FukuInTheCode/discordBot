//! bin/node

const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { clientId, guildId, TOKEN } = require('../config.json');
const fs = require('node:fs');

const commands = [];

const cmd = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Find out!'),

    async execute(message) {
        await message.reply('Pong!');
    },
};

commands.push(cmd.data.toJSON())

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();