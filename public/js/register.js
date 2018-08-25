$(document).ready(function() {
    console.log("Register app loaded");
    
    $("#submit_btn").on("click", function(event){

        event.preventDefault();

        //Grab data from sign in form
        var userData = {
            name: $("#first_name").val().trim() + (" ") + $("#last_name").val().trim(),
            email: $("#email").val().trim(),
            password: $("#password").val().trim(),
            
        };

        $.post("/register", userData, function(res){
             //Grab the response from the server if it successfull creates new database then redirect user
            if (res) {
                window.location = (res);
            }
        });

    });
});