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
                    $("#allOrdersTable").append("<tbody><tr><td>"+dateCreated+"</td><td>"+aptNum+"</td><td>"+category+"</td><td>"+problem+"</td><td><button id='completeButton' data-id="+data[i]._id+" type='button' class='btn btn-success disabled'>"+orderStatus+"</button></td></tr></tbody>");
                } 
                else{
                    let orderStatus= "pending";
                    $("#allOrdersTable").append("<tbody><tr><td>"+dateCreated+"</td><td>"+aptNum+"</td><td>"+category+"</td><td>"+problem+"</td><td><button id='completeButton' data-id="+data[i]._id+" type='button' class='btn btn-danger'>No</button></td><td><button class='btn' role='button' id='orderNoteButton'  data-id="+data[i]._id+">&#10004;</button></td></tr></tbody>");
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
    
    //news modal controls
    $("#modalSubmitButton").on("click", function(e){
        let newsNote={
            aptNum:$("#inputAptNum").val(),
            news:$("#inputNote").val().trim()
        }
        console.log(newsNote);
        //send new note to news db, populate correct user(s)
        $.post("/api/newNews", newsNote)
            .done(function(data){
                console.log(data)
            });
    });

    //on submitting new note modal


    // on clicking check mark
    $(".table").on("click","#orderNoteButton", function(e){
        $(".orderId").attr("id",$(this).attr("data-id"));
        $('#orderNoteModal').modal();
    //     let note = $("input[name='"+identifier+"']").val();
    //     console.log(note);
    //     let newNote= {
    //         identifier:identifier,
    //         note:note
    //     };
    //     //drop note in db
    //     $.post("/api/newNote", newNote)
    //         .done(function(data){
    //             console.log(data);
    //         });

            
    });

    //on clicking order note modal submit button
    $("#orderModalSubmit").on("click", function(e){
        let newNote={
            identifier: $(".orderId").attr("id"),
            note: $("#inputorderNote").val().trim()
        };
        console.log(newNote);
        $.post("/api/newNote", newNote)
            .done(function(data){
                console.log(data);
            });
    })
        
});