# 🔧 Installation

```sh-session
npm install discord-systems
```

# 💡 Versions

- [1.0.0](https://www.npmjs.com/package/discord-systems/v/1.0.0), Discord.js: 13.0.1-14.2.0 and Canvas: ^2.9.3

- [1.0.1](https://www.npmjs.com/package/discord-systems/v/1.0.1), Discord.js: 13.0.1-14.2.0 and Canvas: ^2.9.3 `[Fixed]`

**📁 Required packages**

- [Discord.js](https://www.npmjs.com/package/discord.js) npm install discord.js

- [Canvas](https://www.npmjs.com/package/canvas) npm install canvas

# 🧷 Links

- [Discord Support](https://discord.gg/ae8hgMDxDc)
- [Github](https://github.com/Gotowka/discord-systems)

# ❓ Example Usage

```js
client.on('messageCreate', async (message) => {
    const { levelRank, Tvpis, Triggered } = require('discord-systems')

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
		    //background: '', // https://i.imgur.com/IMGURL 
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
})

client.on('guildMemberAdd', async (member) => {
    const { joinCard } = require('discord-systems')
    const channel = member.guild.channels.cache.get('CHANNEL-ID')
    new joinCard({
        channel: channel, // CHANNEl OBJECT
        member: member.user, // USER OBJECT
        middle: ``, // STRING
        name: ``, // STRING
        bottom: ``, // STRING
        // captcha: true, // BOOLEAN
        // client: client, // CLIENT OBJECT, REQUIRED FOR CAPTCHA
        // language: '', <pl/eng>, FOR CAPTCHA
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
    }).send()
})
```
