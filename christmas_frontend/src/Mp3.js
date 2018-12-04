//mp3 js class
class Mp3 {
  constructor(id, title, artist, audio, memes) {
    this.id = id,
    this.title = title,
    this.artist = artist,
    this.audio = audio,
    this.memes = []

    memes.forEach(meme => {
      this.memes.push(new Meme(meme.name, meme.input1, meme.input2))
    })

    Mp3.all.push(this)
}

Mp3.all = []
