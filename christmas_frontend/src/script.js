//fetching and DOM content manipulation
document.addEventListener('DOMContentLoaded', function() {
  console.log('loaded')
  fetchMemes()
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


function preferedSong(){
prefer = document.forms[0].songs.value;
    alert("You prefer the song " + prefer);
}

function preferedImg(){
  prefer = document.forms[1].imgs.value;
      alert("You prefer the image " + prefer);
}

function makeAMemeInputs(){

}


// function postMemeFetch(){
//
//   // data = {
//   //
//   // }
//   fetch('http://localhost:3000/memes', {
//     method: "POST",
//     headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//
//   },
//     body: JSON.stringify(data)
// })
//   .then(res => res.json()))
//   .then(postData => console.log(postData))
// }
