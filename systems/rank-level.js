const Canvas = require('canvas')
const Discord = require("discord.js");
const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"]

module.exports = class levelRank {
    constructor(options = {}) {
		if (!String(options.exp)) throw new Error('Option EXP is required!')
		if (!String(options.maxexp)) throw new Error('Option MAXEXP is required!')
		if (!String(options.level)) throw new Error('Option LEVEL is required')
		if (!options.message) options.message = {}
		if (!options.message.msg) throw new Error('NO_MESSAGE')
		if (typeof options.message.msg !== 'object') throw new Error('INVALID_MESSAGE')

		this.message = {}
		this.message.mention = options.message.mention
		this.message.tts = options.message.tts
		this.message.msg = options.message.msg
		this.embed = {}
		this.embed.title = options.embed?.title
		this.embed.color = options.embed?.color
		this.embed.description = options.embed?.description
		this.embed.timestamp = options.embed?.timestamp
		this.embed.footer = {}
		this.embed.footer.text = options.embed?.footer?.text
		this.embed.footer.iconURL = options.embed?.footer?.iconURL
		this.photo = options.image ?? 'image'
		this.exp = options.exp
		this.rank = options.rank
		this.maxexp = options.maxexp
		this.level = options.level
		this.text = options.text
        this.member = options.member ?? options.message.msg.member.user
		this.avatarborder = options.avatarborder
		this.avatarbackground = options.avatarbackground
		this.bar = options.bar
		this.barbackground = options.barbackground
		this.border = options.border
		this.image = options.background
		this.blur = options.blur
    }
    
    async send() {
        function abbreviateNumber(number) {
            const tier = Math.log10(number) / 3 | 0;
        
            if (tier == 0) return number;
        
            const suffix = SI_SYMBOL[tier];
            const scale = Math.pow(10, tier * 3);
            const scaled = number / scale;
        
            return scaled.toFixed(1) + suffix;
        }
	const av1 = this.member.displayAvatarURL()
	let avatar = av1.replace('.webp', '.png')
	const name = this.member.username
	const exp = Math.max(0, this.exp)
	const maxexp = Math.max(this.exp, Math.max(0, this.maxexp))
	const level = this.level
	const rank = this.rank
	const text = this.text ?? '#34eb89'
	const avatarborder = this.avatarborder ?? '#FF1493'
    const avatarbackground = this.avatarbackground ?? '#FF1493'
	const bar = this.bar ?? '#FFFFFF'
	const blur = this.blur ?? '1'
	const barbackground = this.barbackground ?? '#5f5f6f'
	const background = this.image ?? '#2f2f3c'
	const border = this.border ?? '#1f1f2f'
		avatar = await Canvas.loadImage(avatar)

	const canvas = Canvas.createCanvas(934, 282)
	const ctx = canvas.getContext('2d')

	if (this.image) {
		if (this.image.includes('https://i.imgur.com/')) {
			const bc = await Canvas.loadImage(background)
			ctx.drawImage(bc, 0, 0, canvas.width, canvas.height)
		} else {
			ctx.fillStyle = background
			ctx.fillRect(22, 22, canvas.width-44, canvas.height-44)	
		}
	} else {
    ctx.fillStyle = background
	ctx.fillRect(22, 22, canvas.width-44, canvas.height-44)
	}

	ctx.lineWidth = 45
	ctx.strokeStyle = border
	ctx.strokeRect(0, 0, canvas.width, canvas.height)

	ctx.textAlign = 'left'

	ctx.font = '600 30px Arial'
	ctx.fillStyle = text

	ctx.fillText(name.substr(0, 36), 270, 175, 380)

	ctx.textAlign = 'right'

	ctx.font = '600 30px Arial'
	ctx.fillText(`${abbreviateNumber(exp)}/${abbreviateNumber(maxexp)}`, 865, 175, 200)

	ctx.font = '500 33px Arial'
	if (rank) ctx.fillText(`  #${rank}    LEVEL ${level}`, 880, 70, 550)
	else ctx.fillText(`LEVEL ${level}`, 880, 70, 550)

	ctx.save()

	ctx.beginPath()

	ctx.arc(140, 141, 100, 0, 2 * Math.PI, true)

	ctx.closePath()

	ctx.clip()

	ctx.lineWidth = 10
	ctx.strokeStyle = avatarborder
	ctx.fillStyle = avatarbackground

	ctx.fillRect(40, 41, 200, 200)
	ctx.drawImage(avatar, 40, 41, 200, 200)
	ctx.stroke()

	ctx.restore()

	ctx.beginPath()
	ctx.moveTo(270, 195)
	ctx.arcTo(250, 195, 250, 215, 20)
	ctx.arcTo(250, 235, 270, 235, 20)
	ctx.lineTo(860, 235)
	ctx.arcTo(880, 235, 880, 215, 20)
	ctx.arcTo(880, 195, 860, 195, 20)

	ctx.closePath()

	ctx.fillStyle = barbackground

	ctx.fill()

	const size = ((exp / maxexp) || 0) * 590

	ctx.beginPath()
	ctx.shadowBlur = blur
	ctx.shadowColor = bar
	ctx.moveTo(270, 195)
	ctx.arcTo(250, 195, 250, 215, 20)
	ctx.arcTo(250, 235, 270, 235, 20)
	ctx.lineTo(270 + size, 235)
	ctx.arcTo(20 + 270 + size, 235, 20 + 270 + size, 215, 20)
	ctx.arcTo(20 + 270 + size, 195, 270 + size, 195, 20)

	ctx.closePath()

	ctx.fillStyle = bar

	ctx.fill()

	ctx.restore()
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
	let attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), this.member.username + '-levelRank.png')
	if (this.photo == 'thumbnail') embed.setThumbnail(`attachment://${this.member.username}-levelRank.png`)
	if (this.photo == 'image') embed.setImage(`attachment://${this.member.username}-levelRank.png`)
	if (this.embed.title) this.message.msg.channel.send({ embeds: [embed], files: [attachment], tts: this.message.tts })
	else this.message.msg.channel.send({ files: [attachment], tts: this.message.tts })
}

async reply() {
	function abbreviateNumber(number) {
		const tier = Math.log10(number) / 3 | 0;
	
		if (tier == 0) return number;
	
		const suffix = SI_SYMBOL[tier];
		const scale = Math.pow(10, tier * 3);
		const scaled = number / scale;
	
		return scaled.toFixed(1) + suffix;
	}
const av1 = this.member.displayAvatarURL()
let avatar = av1.replace('.webp', '.png')
const name = this.member.username
const exp = Math.max(0, this.exp)
const maxexp = Math.max(this.exp, Math.max(0, this.maxexp))
const level = this.level
const rank = this.rank
const text = this.text ?? '#34eb89'
const avatarborder = this.avatarborder ?? '#FF1493'
const avatarbackground = this.avatarbackground ?? '#FF1493'
const bar = this.bar ?? '#FFFFFF'
const blur = this.blur ?? '1'
const barbackground = this.barbackground ?? '#5f5f6f'
const background = this.image ?? '#2f2f3c'
const border = this.border ?? '#1f1f2f'
	avatar = await Canvas.loadImage(avatar)

const canvas = Canvas.createCanvas(934, 282)
const ctx = canvas.getContext('2d')

if (this.image) {
	if (this.image.includes('https://i.imgur.com/')) {
		const bc = await Canvas.loadImage(background)
		ctx.drawImage(bc, 0, 0, canvas.width, canvas.height)
	} else {
		ctx.fillStyle = background
		ctx.fillRect(22, 22, canvas.width-44, canvas.height-44)	
	}
} else {
ctx.fillStyle = background
ctx.fillRect(22, 22, canvas.width-44, canvas.height-44)
}

ctx.lineWidth = 45
ctx.strokeStyle = border
ctx.strokeRect(0, 0, canvas.width, canvas.height)

ctx.textAlign = 'left'

ctx.font = '600 30px Arial'
ctx.fillStyle = text

ctx.fillText(name.substr(0, 36), 270, 175, 380)

ctx.textAlign = 'right'

ctx.font = '600 30px Arial'
ctx.fillText(`${abbreviateNumber(exp)}/${abbreviateNumber(maxexp)}`, 865, 175, 200)

ctx.font = '500 33px Arial'
if (rank) ctx.fillText(`  #${rank}    LEVEL ${level}`, 880, 70, 550)
else ctx.fillText(`LEVEL ${level}`, 880, 70, 550)

ctx.save()

ctx.beginPath()

ctx.arc(140, 141, 100, 0, 2 * Math.PI, true)

ctx.closePath()

ctx.clip()

ctx.lineWidth = 10
ctx.strokeStyle = avatarborder
ctx.fillStyle = avatarbackground

ctx.fillRect(40, 41, 200, 200)
ctx.drawImage(avatar, 40, 41, 200, 200)
ctx.stroke()

ctx.restore()

ctx.beginPath()
ctx.moveTo(270, 195)
ctx.arcTo(250, 195, 250, 215, 20)
ctx.arcTo(250, 235, 270, 235, 20)
ctx.lineTo(860, 235)
ctx.arcTo(880, 235, 880, 215, 20)
ctx.arcTo(880, 195, 860, 195, 20)

ctx.closePath()

ctx.fillStyle = barbackground

ctx.fill()

const size = ((exp / maxexp) || 0) * 590

ctx.beginPath()
ctx.shadowBlur = blur
ctx.shadowColor = bar
ctx.moveTo(270, 195)
ctx.arcTo(250, 195, 250, 215, 20)
ctx.arcTo(250, 235, 270, 235, 20)
ctx.lineTo(270 + size, 235)
ctx.arcTo(20 + 270 + size, 235, 20 + 270 + size, 215, 20)
ctx.arcTo(20 + 270 + size, 195, 270 + size, 195, 20)

ctx.closePath()

ctx.fillStyle = bar

ctx.fill()

ctx.restore()
const embed = new Discord.MessageEmbed()
if (this.embed.title) embed.setTitle(this.embed.title)
if (this.embed.color) embed.setColor(this.embed.color)
if (this.embed.description) embed.setDescription(this.embed.description)
if (this.embed.timestamp == 'true') embed.setTimestamp()
if (this.embed.footer.text) {
	embed.setFooter({
		text: this.embed.footer.text,
		iconURL: this.embed.footer.iconURL ?? null
	})
}
let attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), this.member.username + '-levelRank.png')
if (this.photo == 'thumbnail') embed.setThumbnail(`attachment://${this.member.username}-levelRank.png`)
if (this.photo == 'image') embed.setImage(`attachment://${this.member.username}-levelRank.png`)
if (this.embed.title) this.message.msg.reply({ embeds: [embed], files: [attachment], allowedMentions: { repliedUser: this.message.mention }, tts: this.message.tts })
else this.message.msg.reply({ files: [attachment], allowedMentions: { repliedUser: this.message.mention }, tts: this.message.tts })
}
}