$(document).ready(function(){
    //create Open Order table
    let username=window.location.pathname;
    let url = "/api/orders"+username;
    console.log(url, username);
    // $.get(url)
    //     .done(function(data){
    //         console.log(data);
    //     });

    //new order button pulls up form
    $("#newOrderButton").on("click", function(e){
        e.preventDefault();
        $("#newOrderForm").removeClass("invisible").addClass("visible");
    });
    //new order submit POST request
    $("#newOrderSubmit").on("click", function(e){
        e.preventDefault();
        //get username and add to order object
        let user = $("#inputUsername").val().trim()
        let newOrder={
            aptNum: $("#inputAptNum").val(),
            category: $("input[name='categoryRadios']:checked").val(),
            problemDesc: $("#inputProblem").val().trim()
        };
        console.log(newOrder);
        let url = "/api/newOrder/"+user;
        console.log(url);

        $.post(url, newOrder)
            .done(function(data){
                console.log(data);
                alert("New order Submitted!");
            });
        
    });





})