// Code to be passed to function which is executed once DOM content has been loaded
var callback = function(){

  let audio;
  let body = document.querySelector("body");
  //Store all drum-pad elements on page
  let pads = document.querySelectorAll(".drum-pad");

  //Listen for keypress on document and play sound
  document.addEventListener("keydown", playSound);

  // Add event listeners to each drum-pad
  pads.forEach(function (pad) {
    pad.addEventListener("transitionend", function (event) {
      // Remove class when transition complete
      this.classList.remove("pressed");
      this.style.backgroundColor = "white";
      // Set bg-color of body
      body.style.backgroundColor = rgbGenerator();
    });
    pad.addEventListener("click", playSound);
  });

  function playSound(){
    if (event.type === "click"){
      // Select specific audio element
      audio = document.querySelector(`audio[id="${this.getAttribute('data-key')}"]`);
      //Add class to drum-pad element
      this.classList.add("pressed");
      // Change bg-color of .drum-pad to random color
      this.style.backgroundColor = rgbGenerator();
      //Handle what happens when key is press
    } else {
      // convert keyCode from keypress event to letter
      var letter = String.fromCharCode(event.keyCode);
      // Select specific audio element
      audio = document.querySelector(`audio[id="${letter}"]`);
      // Select corresponding drum-pad div
      var pad = document.querySelector(`.drum-pad[data-key="${letter}"]`);
      //Stop function if no corresponding audio element selected
      if (!audio) return;
      //Add class to drum-pad element
      pad.classList.add("pressed");
      // Change bg-color of .drum-pad to random color
      pad.style.backgroundColor = rgbGenerator();
    }
    // reset audio playback position to start - allows audio to reset each time key is pressed/pad is clicked
    audio.currentTime = 0;
    // Change bg-color of body to random color
    body.style.backgroundColor = rgbGenerator();
    //play audio
    audio.play();
  }
}

// Generate random number between 0 and 255
function randomNum() {
  return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
}
// Generates rgb string
function rgbGenerator(){
  return `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
}

// Code executed only when page has been loaded
function ready(callback) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}
ready(callback);