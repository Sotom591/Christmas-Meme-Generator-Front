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

function renderMeme(meme){
 let name = document.createElement('div')
 name.id = "meme-name"
 name.innerText = meme.name

 let image = document.createElement('img')
 image.id = 'meme-image'
 image.className = 'meme-img'
 image.src = meme.image.url

 let input1 = document.createElement('h2')
 input1.id = 'top-center'
 input1.innerText = meme.input1

 let input2 = document.createElement('h2')
 input2.id = 'bottom-center'
 input2.innerText = meme.input2

 let editBtn = document.createElement('button')
 editBtn.id = `edit-${meme.id}`
 editBtn.innerText = 'Edit Meme'
 editBtn.addEventListener("click", editMeme)


 let deleteBtn = document.createElement('button')
 deleteBtn.id = `delete-${meme.id}`
 deleteBtn.innerText = 'Delete Meme'
 deleteBtn.addEventListener("click", deleteMeme)


 let memeDiv = document.querySelector('#meme-container')

 let imageDiv = document.createElement('div')
 imageDiv.id = "image-container"
 // imageDiv.style.backgroundImage = `url(${meme.image.url})`

 let cardDiv = document.createElement('div')
 cardDiv.id = `card-container-${meme.id}`
 cardDiv.className = "card"

 cardDiv.appendChild(imageDiv)
 cardDiv.appendChild(name)
 cardDiv.appendChild(editBtn)
 cardDiv.appendChild(deleteBtn)

 imageDiv.appendChild(image)
 imageDiv.appendChild(input1)
 imageDiv.appendChild(input2)
 memeDiv.appendChild(cardDiv)
}



function fetchMemes() {
  fetch('http://localhost:3000/memes')
  .then(res => res.json())
  .then(data =>
      data.forEach(meme => {
        // let memeInstance = new Meme(meme.id, meme.name, meme.input1, meme.input2, meme.mp3, meme.image)
      renderMeme(meme)
      })
  )}

function getForm(){
  return document.querySelector(".add-meme-form")
}

function editMeme(e){
      console.log(e.currentTarget.id)
}

function deleteMeme(e){
    let id = e.currentTarget.id.split('-')[1]
    fetch(`http://localhost:3000/memes/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(() => {
      document.querySelector(`#card-container-${id}`).remove()
    })
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

  let data = {
    name: nameInput,
    input1: topInput,
    input2: bottomInput,
    image_id: imgChoice,
    mp3_id: songChoice
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
  .then(postData => {
    renderMeme(postData)
  })
}
