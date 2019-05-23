const mongoose = require("mongoose");

const Schema=mongoose.Schema;

let NewsSchema=new Schema({
    
    news:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

let News=mongoose.model("News", NewsSchema);

module.exports=News;