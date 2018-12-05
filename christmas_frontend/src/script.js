//fetching and DOM content manipulation
document.addEventListener('DOMContentLoaded', function() {
  console.log('loaded')
  fetchMemes()
  songDropEvents()
  imgDropEvents()
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

function editMeme(e){
      console.log(e.currentTarget.id)
}

function deleteMeme(e){
    console.log(e.currentTarget.id)
}

function songDropDown() {
    document.getElementById("songDrop").classList.toggle("show");
}

function imgDropDown() {
    document.getElementById("imgDrop").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(e) {
  e.preventDefault()
  if (!e.target.matches('.dropbtn')) {

    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function songDropEvents(){
  let songOne = getSongDropDown().querySelector("#mp3-1")
  songOne.addEventListener("click", function(){
    console.log("clicked song 1")
  })

  let songTwo = getSongDropDown().querySelector("#mp3-2")
  songTwo.addEventListener("click", function(){
      console.log("clicked song 2")
    })

  let songThree = getSongDropDown().querySelector("#mp3-3")
  songThree.addEventListener("click", function(){
        console.log("clicked song 3")
      })
  }

  function imgDropEvents(){
    let imgOne = getImgDropDown().querySelector("#img-1")
    imgOne.addEventListener("click", function(){
      console.log("clicked img 1")
    })

    let imgTwo = getImgDropDown().querySelector("#img-2")
    imgTwo.addEventListener("click", function(){
        console.log("clicked img 2")
      })

    let imgThree = getImgDropDown().querySelector("#img-3")
    imgThree.addEventListener("click", function(){
          console.log("clicked img 3")
        })
    }
