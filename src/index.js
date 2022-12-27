const Discord = require('discord.js');
const { TOKEN } = require('../packages/config.json');
const fs = require('fs');

console.log(TOKEN)


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

for (const file in commandFiles) {
    const command = require(`./commands/${commandFiles[file]}`);

    if ('name' in command && 'execute' in command) {
        client.commands.set(command.name, command);
    } else {
        console.log(`WARNING! The command-file: ${file}, is missing an argument ! `);
    };

};

client.on('ready', c => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.on(`messageCreate`, msg => {
    if (!msg.content.startsWith(`!`) || (!msg.channel.name.toLowerCase().includes('fubot') && !msg.channel.name.toLowerCase().includes('mod'))) return;

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


client.login(TOKEN);