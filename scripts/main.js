// Code to be passed to function which is executed once DOM content has been loaded
var callback = function(){
  function playSound(){
    if (event.type === "click"){
      // Select specific audio element
      var audio = document.querySelector(`audio[id="${this.getAttribute('data-key')}"]`);
      // reset audio playback position to start - allows audio to reset each time key is pressed
      audio.currentTime = 0;
      //Add class to drum-pad element
      this.classList.add("pressed");
      // Change bg-color of .drum-pad to random color
      this.style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
      // Change bg-color of body to random color
      document.querySelector("body").style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
      audio.play();
    }
    // convert keyCode from keypress event to letter
    var letter = String.fromCharCode(event.keyCode);
    // Select specific audio element
    var audio = document.querySelector(`audio[id="${letter}"]`);
    // Select specific drum-pad div
    var pad = document.querySelector(`.drum-pad[data-key="${letter}"]`);
    //Stop function if no corresponding audio element selected
    if (!audio) return;
    // reset audio playback position to start - allows audio to reset each time key is pressed
    audio.currentTime = 0;
    //Add class to drum-pad element
    pad.classList.add("pressed");
    // Change bg-color of .drum-pad to random color
    pad.style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    // Change bg-color of body to random color
    document.querySelector("body").style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    //play audio
    audio.play();
  }

  //Store all drum-pad elements on page
  var pads = document.querySelectorAll(".drum-pad");

  // Add event listener to each drum-pad
  pads.forEach(function(pad){
    pad.addEventListener("transitionend", function(event){
      // Remove class when transition complete
      this.classList.remove("pressed");
      this.style.backgroundColor = "white";
      // Set bg-color of body
      document.querySelector("body").style.backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    });

    pad.addEventListener("click", playSound);
  });

  //Listen for keypress on document and play sound
  document.addEventListener("keydown", playSound);
}

// Generate random number between 0 and 255
function randomNum() {
  return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
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
