let path = require("path");


module.exports = function(app){
    app.get("/tenants", function(req,res){
        res.sendFile(path.join(__dirname, "../public/tenants.html"));
    });
    //get order page
    app.get("/orders", function(req,res){
        res.sendFile(path.join(__dirname, "../public/orders.html"));
    });

    //get admin page
    app.get("/admin", function(req,res){
        res.sendFile(__dirname, "../public/admin.html");
    });
    //back to home page
    app.get("*", function(req,res){
        res.sendFile(path.join(__dirname,"../public/index.html"));
    });
};