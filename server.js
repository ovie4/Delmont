var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const path=require("path");


var PORT=process.env.PORT || 1865;

var db = require("./models");


var app = express();

app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));


//set up mongoose
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);





require("./controller/apiRoutes")(app);
require("./controller/htmlRoutes")(app);


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });