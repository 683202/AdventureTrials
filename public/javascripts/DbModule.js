var mongoose = require("mongoose");
var fs = require("fs");
mongoose.connect("mongodb://localhost/AdventureTrialsDb");

var bookingSchema = mongoose.Schema({
    name:String,
    email:String,
    date:Date,
    Seats:Number,
    package:String,
    username:String,
    password:String

});

var trekDetailsSchema = mongoose.Schema({
    location:String,
    altitude:String,
    trek_duration:String,
    best_season:String,
    difficulty_level:String,
    Seats_available:Number,
    description:String
});


var bookingDetails = mongoose.model("bookingdetailscollection", bookingSchema);
var trekDetails = mongoose.model("trekDetailsSchemacollection", trekDetailsSchema);

exports.registerDetails = function(req, res) {

    console.log(req.query.personName);
    console.log(req.query.email);
    console.log(req.query.date);
    console.log(req.query.seats);
    console.log(req.query.package);
    var booking = new bookingDetails({
        name : req.query.personName,
        email : req.query.email,
        date : req.query.date,
        seats: req.query.seats,
        package : req.query.package
    });

    booking.save(function(err, booking) {
        if(err) {
            console.log("Error creating booking document.");
            res.render("failure.html");
        }
        else {
            console.log("Booking Saved.");
            res.render("success.html");
        }
    });
}

exports.getTrekDetails = function (req, res) {
    // get the trek details from the database and render it on browser.
    trekDetails.find({location:"Zangskar River, Ladakh"}, function(err, doc) {
        if(err) {
            throw err;
        } else {
            console.log(doc);
            res.render("chadar.html");
//             var stringifiedDoc = JSON.stringify(doc);
//             var parsed = JSON.parse(stringifiedDoc);
// // Get the amount of objects inside 'watson_tone' so we can loop through each one.
//             var count = Object.keys(parsed).length;
//             console.log("count value: "+count);
// // Make some strings to include in our output.
//             var tableHeader = "<table><tr><th>score</th><th>tone_id</th></tr>";
//             var tableContent = "";

// // Loop through the JSON and output each row in to a string.
//             for(i = 0; i < count; i++) {
//                 tableContent = tableContent + "<tr><td>" + parsed[i].name + "</td><td>" + parsed[i].email + "</tr>";
//             }
//             console.log("tableContent: "+tableContent);
//             var tableFooter = "</table>";
//             res.setHeader('Content-Type', 'text/html');
//             res.send(tableHeader+tableContent+tableFooter);
        }
    });
}

exports.getAllBookings = function (req, res) {
    bookingDetails.find({username:req.body.username, password:req.body.password}, function(err, doc) {
        if(err || doc.length === 0) {
            console.log("Admin cannot be verified..");
            res.render("invalidAdmin.html");
            return;
        } else {
            bookingDetails.find(function(err, doc){
                if(err) {
                    console.log(err);
                    throw(err);
                } else {
                    console.log(doc);
        
                    var dbDoc = JSON.stringify(doc);
                    var parsedDoc = JSON.parse(dbDoc);
                    var head = '';
                    fs.readFile("views/htmlHeader.html", "utf-8", function(err, data) {
                        if(err) {console.log("content of error");throw(err);
                        }
                        else {
                            head = data;
                            // console.log("content of head..########");
                            // console.log(head);
                            // console.log("!!!!!!!!!!!!!!!!!!!!");
                            var content = '';
                            for(i = 0; i < parsedDoc.length; i++) {
                                console.log(parsedDoc[i].username);
                                if(parsedDoc[i].name === '') {
                                    continue;
                                }
                                content+= "<div>";
                                content += "<p>Name : " + parsedDoc[i].name + "<br>Email : "+parsedDoc[i].email+"<br>Date : "+parsedDoc[i].date+"<br>Package : "+parsedDoc[i].package+"</p>";
                                content+= "</div><hr>";
                            }
                            res.setHeader("Content-Type", "text/html");
                            res.send("<html>"+head+content+" </div></body></html>");
                        }
                    });
                }
            });
        }
            
    });
}