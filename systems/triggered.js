const Canvas = require('canvas')
const Discord = require('discord.js')
module.exports = class Triggered {
    constructor(options = {}) {
        this.message = options.message
        this.member = options.member
    }
    sendReply(content) {
		return this.message.msg.reply(content)
	}
    sendMessage(content) {
        return this.message.msg.channel.send(content)
    }
    async send() {
        let image = this.member.user.displayAvatarURL().replace('.webp', '.png')
        image = decodeURI(image)
        image = await Canvas.loadImage(image)
        const bgimg = await Canvas.loadImage('https://i.imgur.com/8ag52j1.png')
        const canvas = Canvas.createCanvas(520, 520)
        const ctx = canvas.getContext('2d')
        
        ctx.drawImage(image, 0, 0, 520, 520)
        
        ctx.fillStyle = 'rgba(255, 0, 0, 0.0)';
        ctx.fillRect(0, 0, 520, 520)
        
        ctx.drawImage(bgimg, 0, 0, 520, 520)
        
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.0)';
        ctx.strokeRect(0, 0, 520, 520)
        let attachment
        if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), this.member.username + '-triggered.png')
        if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: this.member.username + '-triggered.png'})
        this.message.channel.send({ files: [attachment] })
    }
    async reply() {
        let image = this.member.user.displayAvatarURL().replace('.webp', '.png')
        image = decodeURI(image)
        image = await Canvas.loadImage(image)
        const bgimg = await Canvas.loadImage('https://i.imgur.com/8ag52j1.png')
        const canvas = Canvas.createCanvas(520, 520)
        const ctx = canvas.getContext('2d')
        
        ctx.drawImage(image, 0, 0, 520, 520)
        
        ctx.fillStyle = 'rgba(255, 0, 0, 0.0)';
        ctx.fillRect(0, 0, 520, 520)
        
        ctx.drawImage(bgimg, 0, 0, 520, 520)
        
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.0)';
        ctx.strokeRect(0, 0, 520, 520)
        let attachment
        if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), this.member.username + '-triggered.png')
        if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: this.member.username + '-triggered.png'})
        this.message.msg.reply({ files: [attachment], allowedMentions: { repliedUser: this.message.mention }, tts: this.message.tts })
    }
}


//https://i.imgur.com/x5PDd8x.gif