//fetching and DOM content manipulation
document.addEventListener('DOMContentLoaded', function() {
  fetchMemes()

  let header = document.querySelector("h1")
  header.addEventListener("click", function(){
    rerenderMemes()})

  getForm().addEventListener("submit", function(e){
    e.preventDefault()
    makeAMeme(e)


  })
})

function getForm(){
  return document.querySelector(".add-meme-form")
}

function renderMeme(meme){
 let name = document.createElement('div')
 name.id = "meme-name"
 name.innerText = meme.name

 let image = document.createElement('img')
 image.id = 'meme-image'
 image.className = 'image'
 image.src = meme.image.url

 let input1 = document.createElement('h2')
 input1.id = 'top-center'
 input1.className = 'top-center'
 input1.innerText = meme.input1

 let input2 = document.createElement('h2')
 input2.id = 'bottom-center'
 input2.className = 'bottom-center'
 input2.innerText = meme.input2

 let memeDiv = document.querySelector('#meme-container')
 memeDiv.className = "ui cards"

 let imageDiv = document.createElement('div')
 imageDiv.id = "image-container"
 imageDiv.className = "image"
 // imageDiv.style.backgroundImage = `url(${meme.image.url})`

 let cardDiv = document.createElement('div')
 cardDiv.id = `card-container-${meme.id}`
 cardDiv.className = "card"
 cardDiv.addEventListener('click', function(e)
  {showOneMeme(e, meme)})

 cardDiv.appendChild(imageDiv)
 cardDiv.appendChild(name)


 imageDiv.appendChild(image)
 imageDiv.appendChild(input1)
 imageDiv.appendChild(input2)
 memeDiv.appendChild(cardDiv)
}


function fetchMemes() {
  // debugger
  fetch('http://localhost:3000/memes')
  .then(res => res.json())
  .then(data =>
      data.forEach(meme => {
        // let memeInstance = new Meme(meme.id, meme.name, meme.input1, meme.input2, meme.mp3, meme.image)
      renderMeme(meme)
      })
  )}

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

function makeAMeme(e){

  let songChoice = document.querySelector("#songs").value
  let imgChoice = document.querySelector("#imgs").value
  let nameInput = document.querySelector("#name").value
  let topInput = document.querySelector("#top-text").value
  let bottomInput = document.querySelector("#bottom-text").value

  postMemeFetch(songChoice, imgChoice, nameInput, topInput, bottomInput)
}


function deleteMeme(e){

    let id = e.currentTarget.id.split('-')[1]
    fetch(`http://localhost:3000/memes/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(() => {
      document.querySelector(`#card-container-${id}`).remove()
      rerenderMemes()
    })
}

function showOneMeme(e, meme){
  //on click of card, only shows that card

  let cardDiv = document.querySelector(`card-container-${meme.id}`)
  if (e.target.className != "like-btn" && e.target.className != "delete-btn"){


  let id = e.currentTarget.id.split('-')[2]
  let container = document.querySelector(`#meme-container`)
  let memeForm = document.querySelector(`.add-meme-form`)


  let cardContainer = document.querySelector(`#card-container-${id}`)
  container.innerHTML = ''
  memeForm.innerHTML = ''
  memeForm.style.visibility = "hidden"
  container.appendChild(cardContainer)


  let deleteBtn = document.createElement('button')
  deleteBtn.id = `delete-${id}`
  deleteBtn.innerText = 'H8 It'
  deleteBtn.addEventListener("click", deleteMeme)
  deleteBtn.className = "delete-btn"
  cardContainer.appendChild(deleteBtn)

  let likeBtn = document.createElement('button')
  likeBtn.id = `like-${id}`
  likeBtn.innerText = `Luv It: ${meme.likes}`
  likeBtn.addEventListener("click", function() {
    addLikes(meme)
  })
  likeBtn.className = "like-btn"
  likeBtn.dataset.likes = meme.likes
  cardContainer.appendChild(likeBtn)



  let songController = document.querySelector("#song-div")
    songController.innerHTML = song(meme)
}
}

function addLikes(meme) {
  // debugger
  let id = meme.id
  let newLikes = ++meme.likes

  let likesData = {
    likes: newLikes
    }
  fetch(`http://localhost:3000/memes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
      // Accept: "application/json"
    },
    body: JSON.stringify(likesData)
    })
    .then(res => res.json())
    .then(resData => {
      let likeBtn = document.getElementById(`like-${id}`)
      likeBtn.innerText = `Luv It: ${resData.likes}`
  })
}

function song(meme){
  return   `<audio controls autoplay style="visibility: hidden">
    <source src="${meme.mp3.audio}" type="audio/mpeg">
  </audio>`
}

function rerenderMemes(){

  let container = document.querySelector(`#meme-container`)
  container.innerHTML = ''

  fetchMemes()

  let formDiv = document.querySelector(`.add-meme-form`)

  formDiv.innerHTML = formHTML()
  formDiv.style.visibility = "visible"

  let songController = document.querySelector("#song-div")
  songController.innerHTML = ''

}


function formHTML(){
  return `<form class="add-meme-form" style="">
  <div class="form-title">Make a Meme! </div>
  <br>
  <div class="MakeMeme">


    <form>
      Choose which song you prefer:
      <select id="songs">
        <option value="1">It's Christmas, Christmas Time</option>
        <option value="2">Feliz Navidad</option>
        <option value="3">I'm Giving You My Cold For Christmas</option>
      </select>
    </form>
      <br><br>
    <form>
        Choose which image you prefer:
      <select id="imgs">
        <option value="1">Creepy Guy</option>
        <option value="2">Grumpy Cat</option>
        <option value="3">Forever Alone</option>
        <option value="4">Smiley Grinch</option>
        <option value="5">Ugly Sweater John</option>
      </select>
    </form>
<br>
      <input type="text" id="name" value="" placeholder="Enter a name for your meme" class="input-text">
      <br><br>
      <input type="text" id="top-text" value="" placeholder="Enter text for the top of your meme" class="input-text">
      <br><br>
      <input type="text" id="bottom-text" value="" placeholder="Enter text for the bottom of your meme" class="input-text">
      <br><br>
      <button type="submit" name="submit" value="Make New Meme" class="submit">Make New Meme</button>
  </div>

  </form>`
}
