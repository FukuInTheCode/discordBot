const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_API_KEY } = require('../../config.json');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    name: 'ask',
    description: 'ask a question',
    aliases: ['ask', 'askto'],
    async execute(message, args) {

        if (args.length == 0) {
            message.reply(`${message.author}, please use the command correctly as follow: \n !ask \`\`YOUR QUESTION\`\`.`)
            return
        };

        const question = args.join(` `);

        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                temperature: 1,
                max_tokens: 2000,
            });

            message.reply(`\`\`\`${response.data.choices[0].text}\`\`\``);

        } catch (error) {
            console.error(error);
        }


    },

};