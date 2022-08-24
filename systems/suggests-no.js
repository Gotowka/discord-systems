const Discord = require('discord.js')
const fs = require('fs')
const file = require('../data/suggests.json')

module.exports = class SuggestsYes {
    constructor(options = {}) {
		if (!options) throw new Error('INVALID OPTIONS')
        this.msg = options.message
        this.channel = options.channel
        this.guild = options.guild
        this.member = options.member
    }

    async start() {
        if (file[this.msg].members.includes(this.member) == true) return;
        file[this.msg].members.push(this.member)
        file[this.msg].no = parseInt(file[this.msg].no) + 1
        this.yes = file[this.msg].yes
        this.no = file[this.msg].no
        fs.writeFileSync('./node_modules/discord-systems/data/suggests.json', JSON.stringify(file))
        const msg = this.guild.channels.cache.get(this.channel).messages.cache.get(this.msg)
        const buttons = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
            .setCustomId('dcsys-yes')
            .setLabel(`${this.yes}`)
            .setStyle('SUCCESS')
            .setEmoji('✅'),

            new Discord.MessageButton()
            .setCustomId('dcsys-no')
            .setLabel(`${this.no}`)
            .setStyle('DANGER')
            .setEmoji('❌')
        )
        msg.edit({ components: [buttons] })
    }
}