var mongoose = require("mongoose");

var Schema=mongoose.Schema;

let OrdersSchema= new Schema({
    
    aptNum:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required:true
    },
    dateCreated:{
        type: Date,
        default:Date.now
    },
    dateCompleted:{
        type: Date,
    },
    problemDesc:{
        type:String
    },
    techNotes:[
        {
        type:Schema.Types.ObjectId,
        ref: "Notes"
        }
    ]
});

let Orders=mongoose.model("Orders", OrdersSchema);

module.exports=Orders;