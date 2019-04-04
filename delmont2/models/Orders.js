var mongoose = require("mongoose");

var Schema=mongoose.Schema;

let OrdersSchema= new Schema({
    orderNum:{
        type: Number,
        unique:true,
        required:true
    },
    aptNum:{
        type: Number,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type: String,
        required:true
    },
    dateCreated:{
        type: Date,
        default:Date.now
    },
    completed:{
        type: String
    },

    notes:{
        type: String
    }
});

let Orders=mongoose.model("Orders", OrdersSchema);

module.exports=Orders;