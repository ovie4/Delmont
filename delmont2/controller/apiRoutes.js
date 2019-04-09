let path = require("path");
let User = require("../models/User");
let Orders= require("../models/Orders");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

module.exports=function(app){
    app.post("/signup", function(req,res){
        //console.log(req.body);
        //let newUser=new User(req.body);
        //res.send(newUser);
        //send to db
        User.create(req.body)
            .then(function(dbUser){
                console.log("connected");
                console.log(dbUser);
                //res.sendFile that user's new tenants page
                let url="../public/tenants.html"+req.body.username;
                res.sendFile(path.join(__dirname, url));
            })
            .catch(function(err){
                console.log(err.message);
            });
    });

    //login route
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.password!=password) {
                return done(null, false, { message: 'Incorrect password.' });
                }
                // return done(null, user);
                console.log("found");
                res.json(user);
            });
        }
    ));
    app.post('/login', 
            passport.authenticate('local', { successRedirect: '/success',
                                            failureRedirect: '/loginError',
                                            failureFlash: true }),
            function(req,res){
                res.send("it worked");
            }
);

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
        app.get("/api/orders/:username", function(req,res){
            User.findOne({username:req.params.username})
                .populate("orders")
                .then(function(dbUser){
                    res.json(dbUser);
                })
                .catch(function(err){
                    console.log(err.message);
                });
        });

    //orders for particular apt route
        app.get("/api/orders/apt/:num", function(req,res){
            console.log("find by apt num", req.params.num);
            Orders.find({aptNum:req.params.num})
                .then(function(dbOrders){
                    res.json(dbOrders)
                })
                .catch(function(err){
                    console.log(err.message)
                });
        });

    //all orders route for admin
        app.get("/api/allOrders", function(req,res){
            Orders.find()
                .then(function(dbOrders){
                    res.json(dbOrders)
                })
                .catch(function(err){
                    console.log(err)
                });
        });
};
