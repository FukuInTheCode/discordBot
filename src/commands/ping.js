module.exports = {
    name: 'ping',
    description: 'wesh c la blague ',
    aliases: ['ping', 'ms'],
    execute(message, args) {
        message.reply('Calculating...').then(reply => {
            reply.edit(`Bot ping: \`\`${reply.createdTimestamp - message.createdTimestamp}\`\` ms, API ping: \`\`${message.client.ws.ping}\`\` ms`)
        })


    }
}