$(document).ready(function(){
    //create Open Order table

    //new order button pulls up form
    $("#newOrderButton").on("click", function(e){
        e.preventDefault();
        $("#newOrderForm").removeClass("invisible").addClass("visible");
    });
    //new order submit POST request
    $("#newOrderSubmit").on("click", function(e){
        e.preventDefault();
        //console.log(e);
        let newOrder={
            aptNum: $("#inputAptNum").val(),
            category: $("input[name='categoryRadios']:checked").val(),
            problemDesc: $("#inputProblem").val().trim()
        };
        console.log(newOrder);

        $.post("/api/newOrder", newOrder)
            .done(function(data){
                console.log(data);
                alert("New order Submitted!");
            });
        
    });





})