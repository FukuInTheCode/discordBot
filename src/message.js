//! bin/node

const { connect_usersdb } = require('./server.js');
const { Events } = require('discord.js');

module.exports = {
    start_Listeners: (client) => {
        client.on('messageCreate', msg => {

            // check if the message is a command, if not then do things or not ;)
            if (!msg.content.startsWith(`!`) || (!msg.channel.name.toLowerCase().includes('fubot') && !msg.channel.name.toLowerCase().includes('mod'))) return;
            // Execute the code below only if the message id a "!" command

            // cut the arguments gave with the command and get the commandName
            const args = msg.content.slice(1).split(' ');
            const commandName = args.shift();

            const command = msg.client.commands.get(commandName);
            if (!command) {
                console.error(`No command found !`);
            } else {
                try {
                    command.execute(msg, args);
                } catch (error) {
                    throw error;
                }

            }
        });

        // message other than commands gestion
        client.on('messageCreate', msg => {
            if (msg.content.startsWith(`!`) && (!msg.channel.name.toLowerCase().includes('fubot') || msg.channel.name.toLowerCase().includes('mod'))) return;

            if (msg.content.includes('quoi')) msg.reply('feur');

            let gained_xp = msg.content.length;
        });

        // Listener for my slash command
        client.on(Events.InteractionCreate, interaction => {
            if (!interaction.isChatInputCommand()) return;

            const command = client.slash_commands.get(interaction.commandName);

            try {
                command.execute(interaction);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }


        })
    }
}