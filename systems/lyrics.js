const fetch = require('node-fetch')
var lyric = class {
    constructor(title, author, lyrics, thumbnail) {
        this.title = title
        this.author = author
        this.lyrics = lyrics
        this.thumbnail = thumbnail
    }
}
/**
 * 
 * @param {string} music - Song title
 * 
 */
exports.search = async function(music) {
    let lyr = 'Lyrics'
    await fetch(`https://some-random-api.ml/lyrics?title=${music}`).then(response => response.json()).then(data => {
    if (data.error) lyr = data.error;
    else lyr = new lyric(data.title, data.author, data.lyrics, data.thumbnail)
    })
    return lyr;
}
