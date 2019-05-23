const path = require("path");
const User = require("../models/User");
const Orders= require("../models/Orders");
const flash = require("connect-flash"); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer= require('nodemailer');
const Note=require("../models/Note");
const News=require("../models/News");
const emailjs=require("emailjs-com");
const bcrypt=require("bcrypt");
const saltRounds = 10;


module.exports=function(app){
    app.post("/signup", function(req,res){
        //console.log(req.body);
        //let newUser=new User(req.body);
        //res.send(newUser);
        //send to db
        bcrypt.hash(req.body.password,saltRounds, function(err,hash){
            User.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                aptNum:req.body.aptNum,
                username:req.body.username,
                password:hash
                })
            .then(function(dbUser){
                console.log("connected");
                console.log(dbUser);
                //send back username and aptNum
                // let url="/tenants/"+req.body.username;
                // res.json(url);
                let creds={
                    username:dbUser.username,
                    aptNum:dbUser.aptNum
                };
                res.json(creds);
            })
            .catch(function(err){
                console.log(err.message);
                res.json("error");
            });
        })
    });

    //login route
    // passport.use('local', new LocalStrategy({
    //     usernameField: "username",
    //     passwordField: "password",
    //     // passReqToCallback: true
    // },
    //     function(username, password, done) {
    //         User.findOne({ username: username }, function(err, user) {
    //             if (err) { return done(err); }
    //             if (!user) {
    //             return done(null, false, { message: 'Incorrect username.' });
    //             }
    //             if (!user.password!=password) {
    //             return done(null, false, { message: 'Incorrect password.' });
    //             }
    //             console.log("found");
    //             //res.json(user);
    //             return done(null, user);
                
                
    //         });
    //     }
    // ));
    app.post('/login', function(req,res){
        User.findOne({username:req.body.username})
            .then(function(dbUser){
                if(dbUser){
                    console.log(req.body);
                    bcrypt.compare(req.body.password, dbUser.password, function (err, result){
                        if(result==true){
                            let creds={
                                username:dbUser.username,
                                aptNum: dbUser.aptNum
                            };
                            res.send(creds);
                        }
                        else{
                            res.send("error");
                        }
                    });
                }
                else{
                    res.send("username doesn't exist");
                }
                
            });
    });

    // app.post('/login',passport.authenticate('local', {successRedirect:"../public/tenants.html", failureRedirect:"../public/index.html",failureFlash:true})
    // );

    //add new order route
    app.post("/api/newOrder/:username", function(req,res){
        console.log(req.body);
            
        // Orders.create(req.body)
        //     .then(function(dbOrder){
        //         console.log(dbOrder);
        //         return User.findOneAndUpdate({username:req.params.username},{$push:{orders:dbOrder._id}},{new:true});
        //     })
        //     .then(function(dbUser){
        //         res.json(dbUser);
        //     })
        //     .catch(function(err){
        //         console.log(err.message);
        //     });
     });

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
    
    //route to set order status to complete
    app.post("/api/orderComplete", function(req,res){
        console.log(req.body.orderId);
        let date= Date.now().toString();
        Orders.findOneAndUpdate({_id:req.body.orderId},{dateCompleted:date})
            .then(function(dbOrder){
                res.json(dbOrder);
            })
            .catch(function(err){
                res.json(err);
            });

    });    

    ////route to post new note
    app.post("/api/newNote", function(req,res){
        Note.create(req.body)
            .then(function(dbNote){
                console.log(dbNote);
                return Orders.findOneAndUpdate({_id:req.body.identifier},{$push:{techNotes:dbNote._id}},{new:true});
            })
            .then(function(dbOrder){
                res.json(dbOrder);
            })
            .catch(function(err){
                res.json(err)
            });
    })

    //route for new News note
    app.post("/api/newNews", function(req,res){
        console.log(req.body);
        News.create(req.body)
            .then(function(dbNews){
                console.log(dbNews);
                if (req.body.aptNum=="All"){
                    console.log("all hit");
                    return User.update({},{$push:{news:dbNews._id}}, {multi:true})
                }
                else{
                    console.log("single unit hit");
                    return User.findOneAndUpdate({aptNum:dbNews._id},{$push:{news:req.body.news}},{new:true});
                }
            })
            .then(function(dbUser){
                res.json(dbUser);
            })
            .catch(function(err){
                res.json(err)
            })
    })

    //route for getting news
    app.get("/api/news/:user", function(req,res){
        console.log(req.body);
        User.findOne({username:req.params.user})
            .populate("news")
            .then(function(dbUser){
                res.json(dbUser)
            })
            .catch(function(err){
                res.json(err)
            })
    })
};
