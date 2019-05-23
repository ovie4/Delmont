const mongoose = require("mongoose");

const Schema=mongoose.Schema;

let NoteSchema=new Schema({
    
    note:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

let Note=mongoose.model("Note", NoteSchema);

module.exports=Note;