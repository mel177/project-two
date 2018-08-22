$(document).ready(function(){
    // event.preventDefault();
   var selectTutor = $("#tutors-select");
   var selectSubjects = $("#subjects-select");
   var selectedTutor = $("#tutors-select");
   var selectedSubject = $("#subjects-select");
   var selectedDate = $("#date-picker");
   var selectedTime = $("#time-select");
   var selectedHours = $("#hours-select");
   var selectedDesc = $("#description");
   var appointmentForm = $("#appointment");
   var userId = $("#userId");
   
  
   var url = window.location.search;
   
   console.log(url);
 
     $('.datepicker').pickadate({
         format: 'yyyy/mm/dd',
         selectMonths: true, 
         selectYears: 15 
 
     });
     //Begin Select Tutor
 
     $("#subjects-select").change(function() {
 
       $.get("/api/tutors", function(tutors) {
           console.log(tutors);
 
         selectTutor.find("option:not(:first)").remove();
 
         $.each(tutors, function(i, item) {
           // trigger event
           selectTutor.trigger('contentChanged');
 
           $('select').on('contentChanged', function() {
             // Update booking
             $(this).material_select();
           });
             console.log(item.subjects);
             console.log(selectSubjects.val().trim());
 
             if (item.subjects.trim() === selectSubjects.val().trim()) {
               console.log(item);
               selectTutor.append($('<option>', {
                 value: item.name,
                 text: item.name
                 }));
               selectTutor.data(item);
 
                 // trigger event
                 selectTutor.trigger('contentChanged');
 
                 $('select').on('contentChanged', function() {
                   // update event details
                   $(this).material_select();
                 });
               }
             });
         });
     });
 
     var studentID;
       $.get("/api/students", function(students) {
         $.each(students, function(i, item) {
           
             console.log(item);
             if (item.UserId === parseInt(userId.attr("value"))) {
               studentID = item.id;
 
             }
             console.log("first", studentID);
         });
       });
       
     $(appointmentForm).on("submit", function(event){
       event.preventDefault();
 
       console.log(selectedTutor.data("id"));
       console.log(selectedSubject.val(), selectedTutor.val(), selectedDate.val(), 
       selectedTime.val(), selectedHours.val(), selectedDesc.val());
 
       console.log(userId.attr("value"));
       console.log("second",studentID);
 
       var newApp = {
         subject: selectedSubject.val().trim(),
         date: selectedDate.val(),
         time: selectedTime.val().trim(),
         hours: selectedHours.val().trim(),
         description: selectedDesc.val().trim(),
         TutorId: selectedTutor.data("id"),
         StudentId: studentID
       }
 
       console.log(newApp);
           // Submit a new post 
       function submitPost(post) {
         $.post("/api/appointments", newApp, function() {
           window.location.href = "/students";
         });
       }
       submitPost();
 
 
    });
 });
   
 