$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var nameInput = $("#tbd").val().trim();
  var usernameInput = $("#tbd").val().trim();
  var passwordInput = $("#tbd").val().trim();
  var phoneInput = $("#tbd").val().trim();
  var subjectsInput = $("#tbd").val().trim();
  var bioInput = $("#tbd").val().trim();
  var ratingsInput = $("#tbd").val().trim();
  var availabilityInput = $("#tbd").val().trim();
  
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#tbd", handleUserFormSubmit);
  

  // A function to handle what happens when the form is submitted to create a new tutor
  function handleUserFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput || usernameInput || passwordInput || phoneInput || subjectsInput || bioInput 
    || ratingsInput || availabilityInput) {
      return;
    }
    // Calling the insertUser function and passing in the value of the name input
    insertUser({
      name: nameInput,
      username: usernameInput,
      password: passwordInput,
      phone: phoneInput,
      Subjects: subjectsInput,
      bio: bioInput,
      ratings: ratingsInput,
      availability: availabilityInput

    });
  }

  // A function for creating an tutor.
  function insertUser(userData) {
    $.post("/api/tutors", userData)
      
  }

  // Function for retrieving tutors and getting them ready to be rendered to the page
  function getTutors() {
    $.get("/api/tutors", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createTutorRow(data[i]));
      }
      renderTutorList(rowsToAdd);
      nameInput.val("");
    });
  }

  

  

  
});
