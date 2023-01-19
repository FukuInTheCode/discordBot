//! bin/node.js

const Discord = require('discord.js');
const { TOKEN } = require('../config.json');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const message = require('./message.js');


// creating the client for the bot 
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
}
);

// the client 'stockage' for all the commands
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, './commands/')).filter(file => file.endsWith('.js'));

// Initialize all the commands from the commands folder
for (const file in commandFiles) {
    const command_fpath = path.join(__dirname, `./commands/${commandFiles[file]}`)

    try {
        const command = require(command_fpath);

        if ('aliases' in command && 'execute' in command) {
            command.aliases.forEach(aliase => {
                client.commands.set(aliase, command);
            });
        } else {
            console.log(`WARNING! The command-file: ${command_fpath}, is missing an argument ! `);
        };


    } catch (err) {
        console.error(err);
    }

    // Create a listener to watch every change in the file to stop always restarting the bot when a change is made
    chokidar.watch(command_fpath).on(`change`, (new_path) => {

        try {
            // delete the former command
            command.aliases.forEach(aliase => {
                client.commands.delete(aliase);
            })
        } catch (err) {
            1 + 1; // this is just to pass the line :)))
        } finally {
            // delete its require cache to re-require it
            delete require.cache[require.resolve(new_path)];

            try {
                const updated_command = require(new_path);

                if ('aliases' in updated_command && 'execute' in updated_command) {
                    updated_command.aliases.forEach(aliase => {
                        client.commands.set(aliase, updated_command);
                    });

                } else {
                    console.error(`WARNING! The command-file: ${new_path}, is missing an argument ! `);
                };
            } catch (err) {
                console.error(err);
            }
        }

    })
};

// create a listener for the ./commands folder to check if a command file is created and add it to the client
fs.watch(path.join(__dirname, `./commands`), (event, filename) => {

    if (!filename || event != 'rename') return;

    if (fs.readdirSync(path.join(__dirname, `./commands`)).length > client.commands.size) {

        const command_fpath = path.join(__dirname, `./commands/${filename}`);

        chokidar.watch(command_fpath).on(`change`, (new_path) => {

            try {
                const command = require(`.\\${new_path}`);

                // delete the former command
                command.aliases.forEach(aliase => {
                    client.commands.delete(aliase);
                })

                // delete it require cache to re-require it
                delete require.cache[require.resolve(new_path)];

                const updated_command = require(new_path);

                if ('aliases' in updated_command && 'execute' in updated_command) {
                    updated_command.aliases.forEach(aliase => {
                        client.commands.set(aliase, updated_command);
                    });

                } else {
                    console.log(`WARNING! The command-file: ${new_path}, is missing an argument ! `);
                };
            } catch (err) {
                console.error(err);
            }



        })
    }
});


// check the client is on
client.on('ready', c => {
    console.log(`Logged in as ${c.user.tag}!`);
});


// Event Listener for any message

message.start_Listeners(client);

// log the client
client.login(TOKEN);