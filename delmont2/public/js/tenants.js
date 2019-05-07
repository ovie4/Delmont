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
                  $("#openOrdersTable").append("<tbody><tr><td>"+dateCreated+"</td><td>"+problemDesc+"</td><td>"+orderStatus+"</td></tr></tbody>")
              } 
              else{
                  let orderStatus= "pending";
                  $("#openOrdersTable").append("<tbody><tr><td>"+dateCreated+"</td><td>"+problemDesc+"</td><td>"+orderStatus+"</td></tr></tbody>")
              }
              
            }
        });

    //new order button pulls up form
    $("#newOrderButton").on("click", function(e){
        e.preventDefault();
        $("#newOrderForm").toggleClass("d-none");
    });
    //new order submit POST request
    $("#newOrderForm").on("submit", function(e){
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
        console.log("done with first ajax request");
        //email to requisite vendor and me
        //var formData = new FormData(this);
        // newOrder['service_id']= 'gmail';
        // newOrder['template_id']= 'template_LDociwy8';
        // newOrder['user_id']= 'user_qIx7weqzlsQ5IPD09yF9D';
        console.log(newOrder);
        // console.log("pre-sending");
        //let template_id= 'template_LDociwy8';
        //emailjs.send(service_id,template_id,newOrder);
        // let data = newOrder;
        // data['template_params']={
        //     'username':'data.aptNum'
        // }
        // $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        //     type: 'POST',
        //     data: JSON.stringify(data),
        //     contentType: 'application/json' // auto-detection
        // }).done(function() {
        //     console.log(neworder);
        //     alert('Your mail is sent!');
        // }).fail(function(error) {
        //     console.log("err");
        //     alert('Oops... ' + JSON.stringify(error));
        // });
        
    });





})