const mongoose = require("mongoose");

const Schema=mongoose.Schema;

let NoteSchema=new Schema({
    type:{
        type: String
    },
    aptNum:{
        type: String
    },
    body:{
        type:String,
        required:true
    }
});

let Note=mongoose.model("Note", NoteSchema);

module.exports=Note;