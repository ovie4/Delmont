$(document).ready(function(){
    //create Open Order table
    let str=window.location.pathname;
    let username=str.split("tenants/")[1];
    
    let url = "/api/orders/"+username;
    console.log(url, username);
    $.get(url)
        .done(function(data){
            console.log(data);
            $("#username").html(data.firstName);
            sessionStorage.setItem("username",data.username);
            sessionStorage.setItem("aptNum", data.aptNum);
            let orders = data.orders;
            for (let i = orders.length-1; i>=0; i--) {
              let dateCreated=orders[i].dateCreated;
              let problemDesc=orders[i].problemDesc;
              if(orders[i].dateCompleted){
                  let orderStatus= "complete";
                  $("#openOrdersTable").append("<tr><td>"+dateCreated+"</td><td>"+problemDesc+"</td><td>"+orderStatus+"</td></tr>")
              } 
              else{
                  let orderStatus= "pending";
                  $("#openOrdersTable").append("<tr><td>"+dateCreated+"</td><td>"+problemDesc+"</td><td>"+orderStatus+"</td></tr>")
              }
              
            }
        });

    //new order button pulls up form
    $("#newOrderButton").on("click", function(e){
        e.preventDefault();
        $("#newOrderForm").toggleClass("d-none");
    });
    //new order submit POST request
    $("#newOrderSubmit").on("click", function(e){
        e.preventDefault();
        //get username and add to order object
        let user = sessionStorage.getItem("username");
        let newOrder={
            aptNum: sessionStorage.getItem("aptNum"),
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