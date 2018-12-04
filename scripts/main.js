// Code to be passed to function which is executed once DOM content has been loaded
var callback = function(){
  // Select all child elements in #display div
  var keys = document.querySelectorAll("#display > div");

  // Add event listener to each item in #display div
  keys.forEach(function (key) {
    key.addEventListener("click", function () {
      console.log("hello");
    });
  });
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
