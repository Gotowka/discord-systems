const Canvas = require('canvas')
const Discord = require('discord.js')
//const defaults = {
//	text: '#FFFFFF',
//	avatarborder: '#FFFFFF',
//	avatarbg: '#FFFFFF',
//	background: '',
//	bottom: ''
//}

Canvas.registerFont('./node_modules/discord-systems/font/DynaPuff-VariableFont_wdth,wght.ttf', { family: 'DynaPuff' })
Canvas.registerFont('./node_modules/discord-systems/font/RubikMaze-Regular.ttf', { family: 'Rubik Maze'})

module.exports = class leaveCard {
    constructor(options = {}) {
    this.channel = options.channel
    this.member = options.member
    this.bottom = options.bottom
	this.avatar = this.member.displayAvatarURL().replace('.webp', '.png')
	this.middle = options.middle.toUpperCase()
	this.name = options.name.toUpperCase()
    this.embed = {}
    this.embed.title = options.embed?.title
    this.embed.color = options.embed?.color
    this.embed.description = options.embed?.description
    this.embed.timestamp = options.embed?.timestamp
    this.embed.footer = {}
    this.embed.footer.text = options.embed?.footer?.text
    this.embed.footer.iconURL = options.embed?.footer?.iconURL
	this.text = options.text ?? '#FFFFFF'
	this.avatarborder = options.avatarborder ?? '#FFFFFF'
	this.avatarbg = options.avatarbg ?? '#FFFFFF'
	this.background = options.background ?? 'https://i.imgur.com/pcFnuDK.jpg'
    }

    sendMessage(content) {
        return this.channel.send(content)
    }

    async send() {
        let avatar = this.avatar
        let name = this.name
        let middle = this.middle
        let text = this.text
        let avatarborder = this.avatarborder
        let avatarbg = this.avatarbg
        let background = this.background
        let bottom = this.bottom
        avatar = await Canvas.loadImage(avatar)
        const image = await Canvas.loadImage(background)
        background = image
    
        const canvas = Canvas.createCanvas(768, 375)
        const ctx = canvas.getContext('2d')
    
        if (background instanceof Object) {
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        } else if (typeof background == 'string' && background.length) {
            ctx.fillStyle = background
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
    
        ctx.textAlign = 'center'
        ctx.fillStyle = text
        ctx.strokeStyle = 'rgba(0, 0, 0, 0)'
        ctx.shadowColor = '#000000'
        ctx.lineWidth = 4
    
        ctx.font = '700 50px DynaPuff'
    
        ctx.shadowBlur = 7
    
        ctx.strokeText(middle, 384, 275, 500)
    
        ctx.shadowBlur = 0
    
        ctx.fillText(middle, 384, 275, 500)
    
        ctx.font = '700 40px DynaPuff'
    
        ctx.shadowBlur = 7
    
        ctx.strokeText(name, 384, 315, 600)
    
        ctx.shadowBlur = 0
    
        ctx.fillText(name, 384, 315, 600)
    
        ctx.font = '700 30px DynaPuff'
    
        ctx.shadowBlur = 7
    
        ctx.strokeText(bottom, 384, 350, 700)
    
        ctx.shadowBlur = 0
    
        ctx.fillText(bottom, 384, 350, 700)
    
        ctx.beginPath()
        ctx.arc(384, 130, 105, 0, 2 * Math.PI, true)
        ctx.closePath()
    
        ctx.shadowBlur = 7
    
        ctx.stroke()
    
        ctx.shadowBlur = 0
    
        ctx.clip()
    
        ctx.lineWidth = 12
    
        ctx.fillStyle = avatarbg
        ctx.strokeStyle = avatarborder
    
        ctx.fill()
        
        ctx.drawImage(avatar, 279, 25, 210, 210)
    
        ctx.stroke()
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
        if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), this.member.username + '-leaveCard.png')
        if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: this.member.username + '-leaveCard.png'})
        if (this.embed.title) this.channel.send({ embeds: [embed], files: [attachment], tts: this.message.tts })
        if (!this.embed.title) this.channel.send({ files: [attachment], tts: this.message.tts })
}
}
