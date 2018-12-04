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

function editMeme(e){
      console.log(e.currentTarget.id)
}

function deleteMeme(e){
    console.log(e.currentTarget.id)
}

function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
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
