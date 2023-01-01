//! bin/node

const Discord = require('discord.js');
const { TOKEN } = require('../config.json');
const chokidar = require('chokidar');
const fs = require('fs');


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

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// Initialize all the commands from the commands folder
for (const file in commandFiles) {
    const path = `./commands/${commandFiles[file]}`
    const command = require(path);

    if ('name' in command && 'execute' in command) {
        client.commands.set(command.name, command);
    } else {
        console.log(`WARNING! The command-file: ${path}, is missing an argument ! `);
    };

    // Create a listener to watch every change in the file to stopalways restarting the bot when a change is made
    chokidar.watch(path).on(`change`, (new_path) => {

        // delete the former command
        client.commands.delete(command.name);

        // delele it require cache to re-require it
        delete require.cache[require.resolve(`.\\${new_path}`)];

        const updated_command = require(`.\\${new_path}`);

        if ('name' in updated_command && 'execute' in updated_command) {
            client.commands.set(updated_command.name, updated_command);

        } else {
            console.log(`WARNING! The command-file: ${new_path}, is missing an argument ! `);
        };
    })

};

// create a listener for the ./commands folder to check if a command file is created and add it to the client
fs.watch(`./commands`, (event, filename) => {

    if (!filename || event != 'rename') return;

    if (fs.readdirSync(`./commands`).length > client.commands.size) {

        const path = `./commands/${filename}`;

        chokidar.watch(path).on(`change`, (new_path) => {

            const command = require(`.\\${new_path}`);

            // delete the former command
            client.commands.delete(command.name);

            // delete it require cache to re-require it
            delete require.cache[require.resolve(`.\\${new_path}`)];

            const updated_command = require(`.\\${new_path}`);

            if ('name' in updated_command && 'execute' in updated_command) {
                client.commands.set(updated_command.name, updated_command);

            } else {
                console.log(`WARNING! The command-file: ${new_path}, is missing an argument ! `);
            };
        })
    }
});


// check the client is on
client.on('ready', c => {
    console.log(`Logged in as ${c.user.tag}!`);
});


// Event Listener for any message
client.on(`messageCreate`, msg => {

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
            console.error(error);
        }

    }
});


// log the client
client.login(TOKEN);