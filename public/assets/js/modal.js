/* ------ Sign-Up Modals ------ */

var stuSignUp = document.getElementById("stu-signupModal");
var tutSignUp = document.getElementById("tut-signupModal");

var logIn = document.getElementById("loginModal");

// Get the button that opens the modal
var stuSignBtn = document.getElementById("stu-signupBtn");
var tutSignBtn = document.getElementById("tut-signupBtn");

var logBtn = document.getElementById("loginBtn");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];

// When the user clicks on the button, open the modal
stuSignBtn.onclick = function() {
  stuSignUp.style.display = "block";
};
tutSignBtn.onclick = function() {
  tutSignUp.style.display = "block";
};

logBtn.onclick = function() {
  logIn.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  logIn.style.display = "none";
};

span2.onclick = function() {
  stuSignUp.style.display = "none";
};

span3.onclick = function() {
  tutSignUp.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === signUp) {
    signUp.style.display = "none";
  } else if (event.target === logIn) {
    logIn.style.display = "none";
  }
};

/* ------ Messaging Modals ------ */

var message = document.getElementById("messageModal");
// Get the button that opens the modal
var messageBtn = document.getElementById("messageBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
messageBtn.onclick = function() {
  message.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  message.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === signUp) {
    message.style.display = "none";
  }
};
