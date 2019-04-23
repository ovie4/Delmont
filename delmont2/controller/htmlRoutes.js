let path = require("path");


module.exports = function(app){
    app.get("/tenants/:username", function(req,res){
      // res.json(req.params.username);
       res.sendFile(path.join(__dirname, "../public/tenants.html"));
    });
    //get admin page
    app.get("/admin", function(req,res){
        console.log("getting admin page");
        res.sendFile(path.join(__dirname, "../public/admin.html"));
    });
    //back to home page
    app.get("*", function(req,res){
        res.sendFile(path.join(__dirname,"../public/index.html"));
    });
};