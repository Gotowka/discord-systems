const Discord = require('discord.js')
const suggests = require('../data/suggests.json')
const fs = require('fs')

module.exports = class Suggests {
    constructor(options = {}) {
		if (!options) throw new Error('INVALID OPTIONS')
        this.member = options.member
        this.msg = options.message
        this.suggest = options.suggest
        this.client = options.client
    }

    async start() {
        const client = this.client
        await client.user.fetch()
        const embed = new Discord.MessageEmbed()
        .setTitle(client.user.username)
        .setColor(client.hexAccentColor)
        .setDescription
        (`
        
        > ${this.suggest}
        
        `)
        .setThumbnail(this.member.user.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ text: this.member.guild.name, iconURL: this.member.guild.iconURL({ dynamic: true })})
        const buttons = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
            .setCustomId('dcsys-yes')
            .setLabel('0')
            .setStyle('SUCCESS')
            .setEmoji('✅'),

            new Discord.MessageButton()
            .setCustomId('dcsys-no')
            .setLabel('0')
            .setStyle('DANGER')
            .setEmoji('❌')
        )
        this.msg.channel.send({ embeds: [embed], components: [buttons] }).then(m => {
            let msg = m
            suggests[msg.id] = {}
            suggests[msg.id].msg = msg.id
            suggests[msg.id].channel = m.channel
            suggests[msg.id].guild = m.guild.id
            suggests[msg.id].members = []
            suggests[msg.id].yes = '0'
            suggests[msg.id].no = '0'
            
            fs.writeFileSync('./node_modules/discord-systems/data/suggests.json', JSON.stringify(suggests))
        })
        await this.msg.delete()
    }
}