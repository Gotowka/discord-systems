const Discord = require('discord.js')
const fs = require('fs')
const file = require('../data/suggests.json')

module.exports = class SuggestsNo {
    constructor(options = {}) {
		if (!options) throw new Error('INVALID OPTIONS')
        this.interaction = options.interaction
        this.lang = options.language
    }

    async start() {
        const int = this.interaction
        if (this.lang == 'pl') {
            this.error = '\`[❌]\` *Nie możesz oddać drugi raz głosu!*'
            this.success = '\`[✅]\` *Pomyślnie oddano głos!*'
        } else {
            this.error = '\`[❌]\` *You cannot vote for the second time!*'
            this.success = '\`[✅]\` *Successfully gived a vote!*'
        }
        if (file[int.message.id].members.includes(int.member.id) == true) return int.reply({ content: this.error, ephemeral: true });
        int.reply({ content: this.success, ephemeral: true })
        file[int.message.id].members.push(int.member.id)
        file[int.message.id].no = parseInt(file[int.message.id].no) + 1
        this.yes = file[int.message.id].yes
        this.no = file[int.message.id].no
        fs.writeFileSync('./node_modules/discord-systems/data/suggests.json', JSON.stringify(file))
        const msg = int.guild.channels.cache.get(int.channel.id).messages.cache.get(int.message.id)
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
        await msg.edit({ components: [buttons] })
    }
}