//fetching and DOM content manipulation
document.addEventListener('DOMContentLoaded', function() {
  console.log('loaded')
  fetchMemes()

  getForm().addEventListener("submit", function(e){
    e.preventDefault()
    makeAMeme(e)
  })
})

function getSongDropDown(){
  return document.querySelector("#songDrop")
}

function getImgDropDown(){
  return document.querySelector("#imgDrop")
}

function fetchMemes() {
  fetch('http://localhost:3000/memes')
  .then(res => res.json())
  .then(data =>
      data.forEach(meme => {
        let memeInstance = new Meme(meme.id, meme.name, meme.input1, meme.input2, meme.mp3, meme.image)
        memeInstance.renderMeme()
      })
  )}
function getForm(){
  return document.querySelector(".add-meme-form")
}

function editMeme(e){
      console.log(e.currentTarget.id)
}

function deleteMeme(e){
    console.log(e.currentTarget.id)
}

//
// function prefered(){
// songChoice = document.forms[0].songs.value;
// console.log(songChoice)
//
// imgChoice = document.forms[1].imgs.value;
//     console.log(imgChoice)
//
// }

function makeAMeme(e){

  let songChoice = document.querySelector("#songs").value
  let imgChoice = document.querySelector("#imgs").value
  let nameInput = document.querySelector("#name").value
  let topInput = document.querySelector("#top-text").value
  let bottomInput = document.querySelector("#bottom-text").value


  postMemeFetch(songChoice, imgChoice, nameInput, topInput, bottomInput)
}


function postMemeFetch(songChoice, imgChoice, nameInput, topInput, bottomInput){

  // console.log(songChoice, imgChoice, nameInput, topInput, bottomInput)
  data = {
    name: nameInput,
    input1: topInput,
    input2: bottomInput,
    image: {url: imgChoice},
    mp3: {audio: songChoice}
  }

  fetch('http://localhost:3000/memes', {
    method: "POST",
    headers: {
            "Content-Type": "application/json",
            Accept: "application/json"

  },
    body: JSON.stringify(data)
})
  .then(res => res.json())
  .then(postData => console.log(postData))
}
