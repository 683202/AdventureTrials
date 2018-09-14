
var express = require("express");
var route = require("./routes/route");
var app = express();
var engines = require('consolidate');
var bodyParser = require("body-parser");
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set("views", "./views");
// app.set("view engine", "pug");
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/", route);
app.listen(1234);
console.log("server started.");