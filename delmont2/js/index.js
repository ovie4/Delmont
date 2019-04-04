$(document).ready(function(){
    //show sign in form on clicking current tenant button
    $("#currTenantButton").on("click", function(e){
        console.log(e);
        e.preventDefault();
        //change class to visible
        $("#signInForm").removeClass("invisible").addClass("visible");
        
    });
    //on clicking sign up link,hide sign in form show sign up form
    $("#signUpLink").on("click", function(e){
        e.preventDefault();
        console.log(e);
        $("#signInForm").removeClass("visible").addClass("invisible");
        $("#signUpForm").removeClass("invisible").addClass("visible");
    });

    //on clicking login link,hide sign up form show sign in form
    $("#loginLink").on("click", function(e){
        e.preventDefault();
        console.log(e);
        $("#signUpForm").removeClass("visible").addClass("invisible");
        $("#signInForm").removeClass("invisible").addClass("visible");
    });
    
    //on clicking log in, package info and make POST request to '/login'
    $("#loginButton").on("click", function(e){
        e.preventDefault();
        let creds={
            username:$("#inputUsername").val().trim(),
            pword:$("#inputPassword").val()
        };
        
        console.log(creds);
        $.post("/login", creds)
            .done(function(data){
                //console.log(data);
                alert ("Logged In");
                //send to tenants page
                //$.get("/tenants");
            });
    });

    //on clicking sign up, package info and send POST to /signup
    $("#signupButton").on("click", function(e){
        e.preventDefault();
        let info={
            firstName:$("#inputfName").val().trim(),
            lastName:$("#inputlName").val().trim(),
            aptNum:$("#inputAptNum").val(),
            username:$("#signupUsername").val().trim(),
            pword:$("#signupPassword").val()
        };
        
        console.log(info);
        $.post("/signup", info)
            .done(function(data){
                //console.log(data);
                //log in and send to tenants page
            });
    });









});