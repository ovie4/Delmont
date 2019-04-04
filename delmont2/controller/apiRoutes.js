let path = require("path");
let User = require("../models/User");

module.exports=function(app){
    app.post("/signup", function(req,res){
        console.log(req.body);
        //let test=new User(req.body);
        res.send(req.body);

    });
};
