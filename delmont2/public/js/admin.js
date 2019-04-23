$(document).ready(function(){
    //call to db to get all orders
    $.get("/api/allOrders")
        .done(function(data){
            console.log(data);
            //loop through array of order objects. pull out date created,category,problem desc, apt num,status
            for (let i = data.length-1; i >= 0; i--) {
                let dateCreated=data[i].dateCreated;
                let category=data[i].category;
                let problem=data[i].problemDesc;
                let aptNum=data[i].aptNum;
                if(data[i].dateCompleted){
                    let orderStatus= data[i].dateCompleted;
                    $("#allOrdersTable").append("<tr><td>"+dateCreated+"</td><td>"+category+"</td><td>"+problem+"</td><td>"+aptNum+"</td><td>"+orderStatus+"</td><td><button id='completeButton' data-id="+data[i]._id+" type='button' class='btn btn-success disabled'>Complete</button></td></tr>");
                } 
                else{
                    let orderStatus= "pending";
                    $("#allOrdersTable").append("<tr><td>"+dateCreated+"</td><td>"+category+"</td><td>"+problem+"</td><td>"+aptNum+"</td><td>"+orderStatus+"</td><td><button id='completeButton' data-id="+data[i]._id+" type='button' class='btn btn-danger'>Incomplete</button></td></tr>");
                }
                    
            }
            //on clicking complete button, set date completed in db
            $("#completeButton").on("click", function(e){
            e.preventDefault();
            let orderId = $(this).attr("data-id");
            console.log(orderId);
            let order={
                orderId: orderId,
            };
            $.post("/api/orderComplete", order)
                .done(function(data){
                    console.log("done");
                    window.location.reload();
                });
            });
        });
    
    //modal controls
    $("#modalSubmitButton").on("click", function(e){
        let aptNum=$("#inputAptNum").val();
        let note=$("#inputNote").val().trim();
        console.log(aptNum, note);
        //send new note to note db, populate correct user(s)
    })
        
});