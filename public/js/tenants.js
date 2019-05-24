$(document).ready(function(){
    //create Open Order table
    
    let username=sessionStorage.getItem("username");
    console.log(username);
    
    if(username!=null||username!=undefined){
        let url = "/api/orders/"+username;
        $.get(url)
            .done(function(data){
                $("#username").html(data.firstName);
                // sessionStorage.setItem("username",data.username);
                // sessionStorage.setItem("aptNum", data.aptNum);
                let orders = data.orders;
                for (let i = orders.length-1; i>=0; i--) {
                let dateCreatedArr=orders[i].dateCreated.split("T");
                let dateCreated=dateCreatedArr[0];
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

            //get news
            let newsUrl="/api/news/"+username
            $.get(newsUrl)
                .done(function(data){
                    let newsArr=data.news;
                    if(newsArr.length>=4){
                        for (let i = 5; i >=0; i--) {
                                let dateArr=newsArr[i].date.split("T");
                                let date=dateArr[0];
                                let news=newsArr[i].news;
                                $("#newsTable").append("<tbody><tr><td>"+date+"</td><td>"+news+"</td></tr></tbody>");
                        }
                    }
                    else{
                        for (let i = newsArr.length-1; i >=0; i--) {
                            let dateArr=newsArr[i].date.split("T");
                            let date=dateArr[0];
                            let news=newsArr[i].news;
                            $("#newsTable").append("<tbody><tr><td>"+date+"</td><td>"+news+"</td></tr></tbody>");
                        }
                    }
                }) 

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
            var data = {
                service_id: 'gomene_gmail',
                template_id: 'template_LDociwy8',
                user_id: 'user_qIx7weqzlsQ5IPD09yF9D',
                template_params: {
                    'aptNum': newOrder.aptNum,
                    'category': newOrder.category,
                    'message': newOrder.problemDesc
                }
            };
            
            $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).done(function() {
                alert('Your mail is sent!');
            }).fail(function(error) {
                alert('Oops... ' + JSON.stringify(error));
            });
            
            
        });

        $("#signOutLink").on("click", function(e){
            e.preventDefault();
            sessionStorage.clear();
            window.location.href="../index";
        });

    }
    else{
        alert("Please Login")
        window.location.href="../index";
    }





})