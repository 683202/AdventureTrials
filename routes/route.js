var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
var DbModule = require("../public/javascripts/DbModule");

router.get("/", function(req, res) {
    // res.render("myPug", {message:"Gabbar is back!"});
    res.render("homeBackground.html");
});

router.get("/home", function(req, res) {
    // res.render("myPug", {message:"Gabbar is back!"});
    res.render("homeBackground.html");
});
router.get("/packages", function(req, res){
    res.render("packages.html");
});

router.get("/chadar", function(req, res){
    DbModule.getTrekDetails(req, res);
    // res.render("chadar.html");
});

router.post("/admin", function(req, res){
    console.log("routing to dbmodule.js");
    console.log(req.body.username);
    DbModule.getAllBookings(req, res);
});

router.get("/login", function(req, res){
    res.render("login.html");
});

router.get("/online_booking", function(req, res){
    res.render("online_booking.html");
});

router.get("/register_details", function(req, res){
    DbModule.registerDetails(req, res);
});

router.get("/media", function(req, res){
    
});

router.get("/contact_us", function(req, res){

});

router.get("/login", function(req, res){
    
});
router.get("/admin", function(req, res){
    
});
module.exports = router;