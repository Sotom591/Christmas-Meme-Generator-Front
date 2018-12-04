//image js class
class Image {
  constructor(id, name, movie, url, memes) {
    this.id = id,
    this.name = name,
    this.movie = movie,
    this.url = url,
    this.memes = []

  memes.forEach(meme => {
    this.memes.push(new Meme(meme.name, meme.input1, meme.input2))
  })

  Image.all.push(this)
}

Image.all = []
