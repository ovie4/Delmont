$(document).ready(function(){
    //show sign in form on clicking current tenant button
    $("#currTenantButton").on("click", function(e){
        e.preventDefault();
        //change class to visible
        $("#signInForm").removeClass("invisible").addClass("visible");
        
    });
    //on clicking sign up link,hide sign in form show sign up form
    $("#signUpLink").on("click", function(e){
        e.preventDefault();
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
            password:$("#inputPassword").val()
        };
        $.post("/login", creds)
            .done(function(data){
                console.log(data);
                if(data==="error"){
                    alert("Incorrect username/password");
                }
                else{
                    sessionStorage.setItem("username",data.username);
                    sessionStorage.setItem("aptNum",data.aptNum);
                    window.location.href="/tenants";
                    
                }
                
            });
    });

    //on clicking sign up, package info and send POST to /signup
    $("#signupButton").on("click", function(e){
        e.preventDefault();
        let pass1= $("#signupPassword").val();
        let pass2= $("#signupPassword2").val();
        if(pass1===pass2){
        let info={
            firstName:$("#inputfName").val().trim(),
            lastName:$("#inputlName").val().trim(),
            aptNum:$("#inputAptNum").val(),
            username:$("#signupUsername").val().trim().toLowerCase(),
            password:$("#signupPassword").val()
        };
        
        console.log(info);
        $.post("/signup", info)
            .done(function(data){
                console.log(data);
                if(data==="error"){
                    alert("Error creating new account. PLease contact site admin");
                }
                else{
                    sessionStorage.setItem("username",data.username);
                    sessionStorage.setItem("aptNum",data.aptNum);
                    //send to tenants page
                    window.location.href="/tenants";
                }
            });
        }
        else{
            alert("Please make sure passwords match");
        }
    });









});