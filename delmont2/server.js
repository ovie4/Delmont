var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var PORT=1865;

var db = require("./models");


var app = express();

app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//set up mongoose
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/delmont', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);


//POST for new users on signup


require("./controller/apiRoutes")(app);
require("./controller/htmlRoutes")(app);

//UPDATE user info

//DELETE User

//POST for new order, populate User db, find last order num, increment and save

//GET for order info by order num

//GET for order info by apt num

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });