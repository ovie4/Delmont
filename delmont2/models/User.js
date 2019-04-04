var mongoose = require("mongoose");

var Schema=mongoose.Schema;

let UserSchema= new Schema({
    firstName:{
        type: String,
        trim: true,
        required: "Tenant first name required"
    },
    lastName:{
        type: String,
        trim: true,
        required: "Tenant surname required"
    },
    username: {
        type: String,
        unique:true,
        trim: true,
        required: "Username is Required"
    },
    password:{
        type: String,
        required: "Password is required"

    },
    aptNum:{
        type: Number,
        required:true,
        trim:true
    },
    orders:[
        {
        type:Schema.Types.ObjectId,
        ref: "Orders"
        }
    ]
});

let User = mongoose.model("User", UserSchema);

module.exports=User;