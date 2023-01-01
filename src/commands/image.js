//! bin/node

const { createCanvas, loadImage } = require('canvas');
const discord = require('discord.js');
const request = require('request');
const sizeOf = require('image-size')

module.exports = {
    name: 'image',
    description: 'get a image',
    aliases: ['image'],
    execute(message, args) {

        const canvas = createCanvas(200, 100);
        const ctx = canvas.getContext('2d');

        request(message.author.displayAvatarURL(), { encoding: null }, (err, response, imageData) => {
            if (err) throw err;

            loadImage(imageData).then((image) => {
                ctx.drawImage(image, 0, 0, 50, 50);
                return new Promise((resolve, reject) => {
                    const image = new discord.AttachmentBuilder(canvas.toBuffer('image/jpeg'))

                    message.reply({ files: [image] })
                })
            })
        })

    }
}