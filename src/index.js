//! bin/node

const Discord = require('discord.js');
const { TOKEN } = require('../config.json');
const { connection } = require('./server.js')

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

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
console.log(commandFiles)

// loading all the commands from the commands folder
for (const file in commandFiles) {
    const command = require(`./commands/${commandFiles[file]}`);

    if ('name' in command && 'execute' in command) {
        client.commands.set(command.name, command);
    } else {
        console.log(`WARNING! The command-file: ${file}, is missing an argument ! `);
    };

};

// check the client is on
client.on('ready', c => {
    console.log(`Logged in as ${c.user.tag}!`);
});


// Event Listener for any message
client.on(`messageCreate`, msg => {

    // check if the message is a command, if not then do things
    if (!msg.content.startsWith(`!`) || (!msg.channel.name.toLowerCase().includes('fubot') && !msg.channel.name.toLowerCase().includes('mod'))) {
        return;
    };

    // Execute the code below only if the message id a "!" command

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