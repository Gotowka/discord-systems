const Canvas = require('canvas')
const Discord = require('discord.js')
module.exports = class Triggered {
    constructor(options = {}) {
        this.message = {}
        this.message.msg = options.message.msg
        this.message.tts = options.message.tts
        this.message.mention = options.message.mention
        this.member = options.member
        this.embed = {}
        this.embed.title = options.embed?.title
        this.embed.color = options.embed?.color
        this.embed.description = options.embed?.description
        this.embed.timestamp = options.embed?.timestamp
        this.embed.footer = {}
        this.embed.footer.text = options.embed?.footer?.text
        this.embed.footer.iconURL = options.embed?.footer?.iconURL
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
        const embed = new Discord.MessageEmbed()
        if (this.embed.title) embed.setTitle(this.embed.title)
        if (this.embed.color) embed.setColor(this.embed.color)
        if (this.embed.description) embed.setDescription(this.embed.description)
        if (this.embed.timestamp == 'true') embed.setTimestamp()
        if (this.embed.footer?.text) {
            embed.setFooter({
                text: this.embed.footer?.text,
                iconURL: this.embed.footer?.iconURL ?? null
            })
        }
        let attachment
        if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), this.member.username + '-triggered.png')
        if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: this.member.username + '-triggered.png'})
        if (this.embed.title) this.message.msg.channel.send({ embeds: [embed], files: [attachment], tts: this.message.tts })
        if (!this.embed.title) this.message.msg.channel.send({ files: [attachment], tts: this.message.tts })
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
        const embed = new Discord.MessageEmbed()
        if (this.embed.title) embed.setTitle(this.embed.title)
        if (this.embed.color) embed.setColor(this.embed.color)
        if (this.embed.description) embed.setDescription(this.embed.description)
        if (this.embed.timestamp == 'true') embed.setTimestamp()
        if (this.embed.footer?.text) {
            embed.setFooter({
                text: this.embed.footer?.text,
                iconURL: this.embed.footer?.iconURL ?? null
            })
        }
        let attachment
        if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), this.member.username + '-triggered.png')
        if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: this.member.username + '-triggered.png'})
        if (this.embed.title) this.message.msg.reply({ embeds: [embed], files: [attachment], allowedMentions: { repliedUser: this.message.mention }, tts: this.message.tts })
        if (!this.embed.title) this.message.msg.reply({ files: [attachment], allowedMentions: { repliedUser: this.message.mention }, tts: this.message.tts })
    }
}


//https://i.imgur.com/x5PDd8x.gif