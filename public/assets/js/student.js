/*
var selectedValue;
var tutorModal = $('#TBD');
var tutorModalBody = $('#TBD');

$(document).ready(function() {
  
  $('#TBD').on("change", handleTutorFormSubmit);
 
  $('#TBD').on("change", handleSubjectFormSubmit);


    function handleTutorFormSubmit(event) {
    event.preventDefault();
  
    var selectBox = document.getElementById("#TBD");
    selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (!selectedValue) {
      return;
    } else {
      parseTutorData(allTutors);

    }
  
  };

  //use userId to collect relevant information for tutor and render in modal
  //then run function to match userId to subject table and display subjects in modal

  function parseTutorData (data) {
      console.log(selectedValue);
      for (var i = 0; i < allTutors.length; i++) {
        if (selectedValue == parseInt(allTutors[i].id)) {
          $('title').html(allTutors[i].firstName);
          $('body').html("#TBD " + allTutors[i].about + "</p>");
          $('photo').html("#TBD" + allTutors[i].id + ".jpg'>");
          $('footer').html("#TBD" + allTutors[i].id + "?_method=PUT' method='POST'><input type = 'hidden' name = 'available' value = '0'><button type='submit' class='btn btn-info btn-primary CRUDSubmit'>Book A Session With " + allTutors[i].firstName+"</button></form>")
          
          matchTutorSubjects(allTutors[i].SubjectId);

          showModal();
         }    
      }
  }

  //match userId to subject table

  function matchTutorSubjects (data) {
    
    for (var j = 0; j < allSubjects.length; j++) {
      
      if (data == allSubjects[j].id) {
        // console.log(allSubjects[j].subjectName)
        $('#TBD').html("Subject " + allSubjects[j].subjectName + "</h4>");
      }
    }
  }

  //display modal with specific tutor information
  function showModal(){
    tutorModal.modal('show');    
  }



// Subject Button

var selectedValue2;
var userIdSubjTutor = [];
var tutorRow = "";

//reset state

  function resetTutorsBySubject(){
    selectedValue2 = 0;
    userIdSubjTutor = [];
    tutorRow = "";
  }

//take in subjectID from dropdown menu
  function handleSubjectFormSubmit(event) {
      event.preventDefault();
      // console.log(allSubjects);
      var selectBox2 = document.getElementById("#TBD");
      selectedValue2 = selectBox2.options[selectBox2.selectedIndex].value;

      if (!selectedValue2) {
        return;
      }
      
      parseTutorBySubject(allTutors)
      resetTutorsBySubject();

  }

//parse object of allTutors to find out where userID has relevant subjectID
//run function to create row of tutors with relevant subjectID
  function parseTutorBySubject (data) {
    console.log(selectedValue2);
      for (var i = 0; i < allTutors.length; i++) {
        // console.log(parseInt(allTutors[i].SubjectId))
        if (parseInt(selectedValue2) === parseInt(allTutors[i].SubjectId)) {
          userIdSubjTutor.push(allTutors[i]);
         }    
      }
    createTutorRow(userIdSubjTutor);
  }

//function to create row of tutors with relevant subjectID
  function createTutorRow(data) {
      for (var i = 0; i < data.length; i++) {
        tutorRow += "#TBD " + data[i].firstName+"#TBD"
      }
      
      showTutorRow(tutorRow); 

    }

// display the row of relevant tutors by subject
  function showTutorRow(data) {
     $('#TBD').html(data);
  }



}); 

*/
