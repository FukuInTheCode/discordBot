//! bin/node

module.exports = {
    start_Listeners: (client) => {
        client.on('messageCreate', msg => {

            // check if the message is a command, if not then do things or not ;)
            if (!msg.content.startsWith(`!`) || (!msg.channel.name.toLowerCase().includes('fubot') && !msg.channel.name.toLowerCase().includes('mod'))) {
                return;
            };

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

        client.on('messageCreate', msg => {
            // ^^
            if (msg.content.includes('quoi')) msg.reply('feur');
        })
    }
}