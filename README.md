# 🔧 Installation

```sh-session
npm install discord-systems
```

# 💡 Versions

- [1.0.0](https://www.npmjs.com/package/discord-systems/v/1.0.0), Discord.js: 13.0.1-14.2.0 and Canvas: ^2.9.3

- [1.0.1](https://www.npmjs.com/package/discord-systems/v/1.0.1), Discord.js: 13.0.1-14.2.0 and Canvas: ^2.9.3 `[Fixes]`

- [1.0.2](https://github.com/Gotowka/discord-systems/releases/tag/1.0.2), Discord.js: 13.0.1-14.2.0 and Canvas: ^2.9.3 `[Update]`

- [1.0.3](https://github.com/Gotowka/discord-systems/releases/tag/1.0.3), Discord.js: 13.0.1-14.2.0 and Canvas: ^2.9.3 `[Fixes]`

- [1.0.4](https://github.com/Gotowka/discord-systems/releases/tag/1.0.4), Discord.js: 13.0.1-14.2.0 and Canvas: ^2.9.3 `[Update]`

- [1.0.5](https://github.com/Gotowka/discord-systems/releases/tag/1.0.5), Discord.js: 13.0.1-14.2.0 and Canvas: ^2.9.3 `[Beta]`

**📁 Required packages**

- [Discord.js](https://www.npmjs.com/package/discord.js) npm install discord.js

- [Canvas](https://www.npmjs.com/package/canvas) npm install canvas

# 🧷 Links

- [Discord Support](https://discord.gg/ae8hgMDxDc)
- [Github](https://github.com/Gotowka/discord-systems)

# ❓ Example Usage

```js
client.on('messageCreate', async (message) => {
    const { levelRank, Tvpis, Triggered, Suggest } = require('discord-systems')

    if (message.content == 'triggered') {
        new Triggered({
            message: {
                msg: message, // MESSAGE/INTERACTION OBJECT,
                //tts: '', // BOOLEAN
                //mention: '', // BOOLEAN, Only for .reply()
            },
            member: message.author,
        })<send/reply>)
    }

    if (message.content == 'tvpis') {
        new Tvpis({
            message: {
                msg: message, // MESSAGE/INTERACTION OBJECT,
                //tts: '', // BOOLEAN
                //mention: '', // BOOLEAN, Only for .reply()
            },
            text: '', // STRING
            style: '' // NUMBER <1/2>
        }).<send/reply>()
    }

    if (message.content == 'level') {
        new levelRank({
            message: {
                msg: message, // MESSAGE/INTERACTION OBJECT,
                //tts: '', // BOOLEAN
                //mention: '', // BOOLEAN, Only for .reply()
            },
		    //background: '', // https://i.imgur.com/IMGCODE
            //member: message.user, // USER OBJECT
            exp: '', // NUMBER
            maxexp: '', // NUMBER
            level: '', // NUMBER
            rank: '', // NUMBER
            //text: '', // HEX
            //avatarborder: '', // HEX
            //avatarbackground: '', // HEX
            //bar: '', // HEX
            //barbackground: '', // HEX
            //border: '', // HEX
	    }).<send/reply>()
    }
    
    if (message.channel.id == '') {
    new Suggest({
      suggest: message.content, // STRING
      guild: message.guild, // GUILD OBJECT
      member: message.member, // MEMBER OBJECT
      message: message, // MESSAGE/INTERACTION OBJECT
      client: client // CLIENT OBJECT
    }).start()
    }
})

client.on('guildMemberAdd', async (member) => {
    const { joinCard } = require('discord-systems')
    const channel = member.guild.channels.cache.get('CHANNEL-ID')
    new joinCard({
        channel: channel, // CHANNEl OBJECT
        member: member, // MEMBER OBJECT
        middle: ``, // STRING
        name: ``, // STRING
        bottom: ``, // STRING
        // captcha: true, // BOOLEAN
        // role: '' // ROLE ID, ONLY FOR CAPTCHA = TRUE
        // client: client, // CLIENT OBJECT, REQUIRED FOR CAPTCHA
        // language: '', <pl/eng>, FOR CAPTCHA
        // text: '', // HEX
        // avatarborder: '', // HEX
        // avatarbg: '', // HEX
        // background: '' // https://i.imgur.com/IMGCODE
    }).send()
})

client.on('guildMemberRemove', async (member) => {
    const { leaveCard } = require('discord-systems')
    const channel = member.guild.channels.cache.get('CHANNEL-ID')
    new leaveCard({
        channel: channel, // CHANNEl OBJECT
        member: member.user, // USER OBJECT
        middle: ``, // STRING
        name: ``, // STRING
        bottom: ``, // STRING
        // text: '', // HEX
        // avatarborder: '', // HEX
        // avatarbg: '', // HEX
        // background: '' // https://i.imgur.com/IMGCODE
    }).send()
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.customId == 'dcsys-yes') {
    const { SuggestsYes } = require('discord-systems')
    new SuggestsYes({
      member: interaction.member, // MEMBER OBJECT
      channel: interaction.channel.id, // CHANEL ID
      guild: interaction.guild, // GUILD OBJECT
      message: interaction.message.id, // MESSAGE ID
    }).start()
  } else if (interaction.customId == 'dcsys-no') {
    const { SuggestsNo } = require('discord-systems')
    new SuggestsNo({
      member: interaction.member, // MEMBER OBJECT
      channel: interaction.channel.id, // CHANEL ID
      guild: interaction.guild, // GUILD OBJECT
      message: interaction.message.id, // MESSAGE ID
    }).start()
  }
})
```
