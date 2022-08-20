const Canvas = require('canvas')
const Discord = require('discord.js')
//const defaults = {
//	text: '#FFFFFF',
//	avatarborder: '#FFFFFF',
//	avatarbg: '#FFFFFF',
//	background: '',
//	bottom: ''
//}

//Canvas.registerFont('./font/DynaPuff-VariableFont_wdth,wght.ttf', { family: 'DynaPuff' })
//Canvas.registerFont('./font/RubikMaze-Regular.ttf', { family: 'Rubik Maze'})
Canvas.registerFont('./node_modules/discord-systems/font/DynaPuff-VariableFont_wdth,wght.ttf', { family: 'DynaPuff' })
Canvas.registerFont('./node_modules/discord-systems/font/RubikMaze-Regular.ttf', { family: 'Rubik Maze'})
let ff
let cc
module.exports = class joinCard {
    constructor(options = {}) {
    this.client = options.client
    this.captcha = options.captcha
    this.channel = options.channel
    this.member = options.member.user
    this.member2 = options.member
    this.role = options.role
    this.bottom = options.bottom
	this.avatar = this.member.displayAvatarURL().replace('.webp', '.png')
	this.middle = options.middle.toUpperCase()
	this.name = options.name.toUpperCase()
	this.text = '#FFFFFF'
	this.avatarborder = '#FFFFFF'
	this.avatarbg = '#FFFFFF'
	this.background = 'https://i.imgur.com/pcFnuDK.jpg'
    this.language = options.language
    ff = this.member
    cc = this.channel
    }

    sendMessage(content) {
        return this.channel.send(content)
    }
    sendMessage2(content) {
        return this.memeber.send(content)
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
        async function canvas1() {
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
            let attachment
            if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), ff.username + '-joinCard.png')
            if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas.toBuffer('image/png'), { name: ff.username + '-joinCard.png'})
            cc.send({ files: [attachment] })
        }
        if (!this.language) this.language = 'eng'
        if (this.language === 'eng') {
            this.error1 = '\`[❌]\` **Wrong code!**'
            this.error2 = '\`[❌]\` **Wrong code!**\nExit the server and join again.'
            this.success = '\`[✅]\` **Correct code!**'
        } else if (this.language === 'pl') {
            this.error1 = '\`[❌]\` **Błędny kod!**'
            this.error2 = '\`[❌]\` **Błędny kod!**\nWyjdż z serwera i dołącz ponownie.'
            this.success = '\`[✅]\` **Poprawny kod!**'
        } else {
            this.error1 = '\`[❌]\` **Wrong code!**'
            this.error2 = '\`[❌]\` **Wrong code!**\nExit the server and join again.'
            this.success = '\`[✅]\` **Correct code!**' 
        }
        if (this.captcha === true) {
                const randomize = require('randomatic');
                const random = randomize('aA', '6');
                const img = await Canvas.loadImage('https://i.imgur.com/vdRZNpk.jpg')
                const canvas2 = Canvas.createCanvas(480, 320)
                const ctx2 = canvas2.getContext('2d')
                ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height)
                ctx2.font = '700 40px Rubik Maze'
                ctx2.fillText(random, 230, 240, 220)
                let attachment
                if (Discord.version.includes('13')) attachment = new Discord.MessageAttachment(canvas2.toBuffer('image/png'), this.member.username + '-joinCaptcha.png')
                if (Discord.version.includes('14')) attachment = new Discord.AttachmentBuilder(canvas2.toBuffer('image/png'), { name: this.member.username + '-joinCaptcha.png'})
                this.member.send({ files: [attachment] }).then(async m => {
                    const channel = this.client.channels.cache.get(m.channelId)
                    setTimeout(() => {
                        const version = Discord.version
                        const filter = m => m.author.id === this.member.id
                        if (version.includes('14')) {
                            m.channel.awaitMessages({ filter, max: 1, time: 10_000 }).then(async collected => {
                                const check = collected.at(0).content === random
                                if (check === false) {
                                    channel.send({ content: this.error1 })
                                    channel.awaitMessages({ filter, max: 1, time: 10_000 }).then(async collected1 => {
                                        const check2 = collected1.at(0).content === random
                                        if (check2 === false) {
                                            return channel.send({ content: this.error2 });
                                        } else if (check2 === true) {
                                            channel.send({ content: this.success})
                                            if (this.role) this.member2.roles.add(this.role)
                                            canvas1()
                                        }
                                    })
                                } else if (check === true) {
                                    m.channel.send({ content: this.success})
                                    if (this.role) this.member2.roles.add(this.role)
                                    canvas1()
                                }
                            })
                        } else if (version.includes('13')) {
                            channel.awaitMessages({ filter, max: 1, time: 30000 }).then(collected => {
                                const check = collected.at(0).content === random
                                if (check === false) {
                                    channel.send({ content: this.error1 })
                                    channel.awaitMessages({ filter: filter, max: 1, time: 30_000 }).then(async collected1 => {
                                        const check2 = collected1.at(0).content === random
                                        if (check2 === false) {
                                            return m.channel.send({ content: this.error2 });
                                        } else if (check2 === true) {
                                            channel.send({ content: this.success})
                                            if (this.role) this.member2.roles.add(this.role)
                                            canvas1()
                                        }
                                    })
                                } else if (check === true) {
                                    channel.send({ content: this.success })
                                    if (this.role) this.member2.roles.add(this.role)
                                    canvas1()
                                }
                            })
                        }
                    }, 300)
                })
        } else {
        canvas1()
        }
}
}