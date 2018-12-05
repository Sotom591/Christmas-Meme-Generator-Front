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




// function songDropDown() {
//     document.getElementById("songDrop").classList.toggle("show");
// }
//
// function imgDropDown() {
//     document.getElementById("imgDrop").classList.toggle("show");
// }
//
// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(e) {
//   e.preventDefault()
//   if (!e.target.matches('.dropbtn')) {
//
//     let dropdowns = document.getElementsByClassName("dropdown-content");
//     let i;
//     for (i = 0; i < dropdowns.length; i++) {
//       let openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }



// function makeAMeme(){
//   let songOne = getSongDropDown().querySelector("#mp3-1")
//   songOne.addEventListener("click", function(e){
//     let songOneId = e.currentTarget.id.split("-")[1]
//   })
//
//   let songTwo = getSongDropDown().querySelector("#mp3-2")
//   songTwo.addEventListener("click", function(e){
//       let songTwoId = e.currentTarget.id.split("-")[1]
//     })
//
//   let songThree = getSongDropDown().querySelector("#mp3-3")
//   songThree.addEventListener("click", function(e){
//         let songThreeId = e.currentTarget.id.split("-")[1]
//       })
//
//
//     let imgOne = getImgDropDown().querySelector("#img-1")
//     imgOne.addEventListener("click", function(e){
//         let imgOneId = e.currentTarget.id.split("-")[1]
//     })
//
//     let imgTwo = getImgDropDown().querySelector("#img-2")
//     imgTwo.addEventListener("click", function(e){
//         let imgTwoId = e.currentTarget.id.split("-")[1]
//       })
//
//     let imgThree = getImgDropDown().querySelector("#img-3")
//     imgThree.addEventListener("click", function(e){
//         let imgThreeId = e.currentTarget.id.split("-")[1]
//         })
// }



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
