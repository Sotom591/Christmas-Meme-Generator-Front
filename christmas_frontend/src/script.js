//fetching and DOM content manipulation
document.addEventListener('DOMContentLoaded', function() {
  console.log('loaded')
  fetchMemes()
})

function fetchMemes() {
  fetch('http://localhost:3000/memes')
  .then(res => res.json())
  .then(data =>
      data.forEach(meme => {
        let memeInstance = new Meme(meme.id, meme.name, meme.input1, meme.input2, meme.mp3, meme.image)
        memeInstance.renderMeme()
      })
  )}

//
//   data.forEach(meme => renderMeme(meme))
// )}
//
// function
