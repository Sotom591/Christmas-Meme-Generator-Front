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

  renderMeme() {
   let name = document.createElement('div')
   name.id = "meme-name"
   name.innerText = this.name

   let image = document.createElement('img')
   image.id = 'meme-image'
   image.src = this.image.url

   let input1 = document.createElement('h2')
   input1.id = 'top-center'
   input1.innerText = this.input1

   let input2 = document.createElement('h2')
   input2.id = 'bottom-center'
   input2.innerText = this.input2

   let imageDiv = document.querySelector('#image-container')
   let memeDiv = document.querySelector('#meme-container')

   memeDiv.appendChild(name)
   imageDiv.appendChild(image)
   imageDiv.appendChild(input1)
   imageDiv.appendChild(input2)
  }
}
//
Meme.all = []
// let newMeme = new Meme(1, "newmeme", "cool meme", "happy meme", {}, {url: 'www.cool.com'})
// console.log(newMeme)
// renderMeme()
