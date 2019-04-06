let path = require("path");
let User = require("../models/User");
let Orders= require("../models/Orders");

module.exports=function(app){
    app.post("/signup", function(req,res){
        //console.log(req.body);
        //let newUser=new User(req.body);
        //res.send(newUser);
        //send to db
        User.create(req.body)
            .then(function(dbUser){
                console.log("connected");
                res.json(dbUser);
            })
            .catch(function(err){
                console.log(err.message);
            });
    });

    //login route

    //add new order route
    app.post("/api/newOrder/:username", function(req,res){
        console.log(req.body);

        Orders.create(req.body)
            .then(function(dbOrder){
                console.log(dbOrder);
                return User.findOneAndUpdate({username:req.params.username},{$push:{orders:dbOrder._id}},{new:true});
            })
            .then(function(dbUser){
                res.json(dbUser);
            })
            .catch(function(err){
                console.log(err.message);
            });
    })

    //orders for particular username route

    //orders for particular apt route

    //all orders route for admin
};
