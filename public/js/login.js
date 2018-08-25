$(document).ready(function() {
    console.log("LogIn app loaded");
    
    $("#log_in_btn").on("click", function(event){

        event.preventDefault();

        //Grab data from sign in form
        var userData = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim(),
        };

        $.post("/login", {
            email: userData.email,
            password: userData.password
        },(res)=>{
            // after successfully logged in the clien side will be forced to redirect to the main page
            window.location = (res);
        });

    });
});