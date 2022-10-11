const Canvas = require('canvas')
const Discord = require('discord.js')

Canvas.registerFont('./node_modules/discord-systems/font/Uni_Sans_Heavy.otf', { family: 'Uni-Sans-Heavy' })

module.exports = class Tvpis {
    constructor(options = {}) {
        if (!options.message) options.message = {}
		if (!options.message.msg) throw new Error('NO_MESSAGE')
		if (typeof options.message.msg !== 'object') throw new Error('INVALID_MESSAGE')
        this.message = options.message
        this.text = options.text
    }
    async send() {
        let tekst = this.text
        const style = this.style || '1'
        let photo
        if (style === '1') photo = await Canvas.loadImage('https://i.imgur.com/CEUr9n9.jpg')
        if (style === '2') photo = await Canvas.loadImage('https://i.imgur.com/JmkxYfI.jpg')
    
    
        const canvas = Canvas.createCanvas(512, 341.2)
        const ctx = canvas.getContext('2d')
        const img = photo   
        ctx.fillStyle = 'white'
        ctx.font = '500 22px Uni Sans Heavy'
    
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    
        ctx.textAlign = 'left'
    
        ctx.fillText(tekst.substr(0, 35), 95, 275, 368)
    
        ctx.textAlign = 'center'
    
    
        ctx.textAlign = 'left'
        ctx.font = '500 36px Arial'
        let attachment
        if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), 'tvpis.png')
        if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'tvpis.png'})
        this.message.msg.channel.send({ files: [attachment], tts: this.message.tts })
    }
    async reply() {
        let tekst = this.text
        const style = this.style || '1'
        let photo
        if (style === '1') photo = await Canvas.loadImage('https://i.imgur.com/CEUr9n9.jpg')
        if (style === '2') photo = await Canvas.loadImage('https://i.imgur.com/JmkxYfI.jpg')
    
    
        const canvas = Canvas.createCanvas(512, 341.2)
        const ctx = canvas.getContext('2d')
        const img = photo   
        ctx.fillStyle = 'white'
        ctx.font = '500 22px Uni Sans Heavy'
    
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    
        ctx.textAlign = 'left'
    
        ctx.fillText(tekst.substr(0, 35), 95, 275, 368)
    
        ctx.textAlign = 'center'
    
    
        ctx.textAlign = 'left'
        ctx.font = '500 36px Arial'
        let attachment
        if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), 'tvpis.png')
        if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'tvpis.png'})
        this.message.msg.reply({ files: [attachment], allowedMentions: { repliedUser: this.message.mention }, tts: this.message.tts })
    }
}