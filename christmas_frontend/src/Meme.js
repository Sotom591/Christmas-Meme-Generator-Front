//meme js class info
class Meme {
  constructor(id, name, input1, input2, mp3, image) {
    this.id = id,
    this.name = name,
    this.input1 = input1,
    this.input2 = input2,
    this.mp3 = mp3,
    this.image = image

    Meme.all.push(this)
  }

Meme.all = []

renderMeme() {
  let name = document.querySelector('#meme-name')
  name.innerText = this.name

  let image = document.querySelector('#meme-image')
  image.src = this.image.url

  let input1 = document.querySelector('#top-center')
  input1.innerText = this.input1

  let input2 = document.querySelector('#bottom-center')
  input2.innerText = this.input2


  }

}

let newMeme = new Meme(1, "newmeme", "cool meme", "happy meme", {}, {url: 'www.cool.com'})
console.log(newMeme)
renderMeme()
