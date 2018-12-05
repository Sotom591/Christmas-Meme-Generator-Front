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

 let memeDiv = document.querySelector('#meme-container')

 let imageDiv = document.createElement('div')
 imageDiv.id = "image-container"
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
      rerenderMemes()
    })
}

function showOneMeme(e, meme){
  //on click of card, only shows that card

  let id = e.currentTarget.id.split('-')[2]
  let container = document.querySelector(`#meme-container`)
  let memeForm = document.querySelector(`.add-meme-form`)
  let cardContainer = document.querySelector(`#card-container-${id}`)
  container.innerHTML = ''
  memeForm.innerHTML = ''
  container.appendChild(cardContainer)


  let deleteBtn = document.createElement('button')
  deleteBtn.id = `delete-${id}`
  deleteBtn.innerText = 'Delete Meme'
  deleteBtn.addEventListener("click", deleteMeme)
  cardContainer.appendChild(deleteBtn)


  let songController = document.querySelector("#song-div")
    songController.innerHTML = song()



}

function song(){
  return   `<audio controls autoplay>
    <source src="https://ia601502.us.archive.org/1/items/Im_Giving_You_My_Cold_For_Christmas-19520/Lee_Rosevere_-_01_-_Im_Giving_You_My_Cold_For_Christmas.mp3" type="audio/mpeg">
  </audio>`
}

function rerenderMemes(){

  let container = document.querySelector(`#meme-container`)
  container.innerHTML = ''

  fetchMemes()

  let formDiv = document.querySelector(`.add-meme-form`)

  formDiv.innerHTML = formHTML()
  let songController = document.querySelector("#song-div")
  songController.innerHTML = ''

}

function formHTML(){
  return `<form class="add-meme-form" style="">
  <h3>Make a meme!</h3>
  <div class="MakeMeme">


    <form>
      Choose which song you prefer:
<select id="songs">
  <option value="1">Baby It's Cold Outside</option>
  <option value="2">White Christmas</option>
  <option value="3">Santa Claus is Coming to Town</option>
</select>
  </form>

  <form>
    Choose which image you prefer:
<select id="imgs">
<option value="1">Creepy Guy</option>
<option value="2">Screaming Kevin</option>
<option value="3">Excited Elf</option>
</select>
</form>

      <input type="text" id="name" value="" placeholder="Enter a meme's name..." class="input-text">
      <br>
      <input type="text" id="top-text" value="" placeholder="Enter text to show at the top of your meme" class="input-text">
      <br>
      <input type="text" id="bottom-text" value="" placeholder="Enter text to show at the bottom of your meme." class="input-text">
      <br>
      <button type="submit" name="submit" value="Make New Meme" class="submit">Make New Meme</button>
  </div>

  </form>`
}
