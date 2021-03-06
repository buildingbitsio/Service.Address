var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var ADDRESSES_COLLECTION = "Addresses";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(process.env.MONGO_URI, function(err, database){
    if(err){
        console.log(err);
        process.exit(1);
    }
    db = database.db("properties");
    console.log("Database connection ready");

    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    })
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.get("/address", function(req, res){
    const collection = db.collection(ADDRESSES_COLLECTION);

    collection.find({}).toArray(function(err, docs) {
        if(err){
            handleError(res, err.message, "Failed to get addresses.");
        } else {
            console.log("Found the following records");
            console.log(docs)
            res.status(201).json(docs);
        } 
    })
});

app.post("/address", function(req, res){
    var newAddress = req.body;

    const collection = db.collection(ADDRESSES_COLLECTION);

    console.log("Start body...")
    console.log(req.body)
    console.log("End body")
    if(!(req.body.postcode || req.body.address1)){
        handleError(res, "Invalid user input", "Must provide a address1 and postcode")
    }
    collection.insertOne(newAddress, function(err, doc){
        if(err){
            handleError(res, err.message, "Failed to create new address.");
        } else {
            res.status(201).json(doc.ops[0]);
        }

    })
});

app.get("/address/:id", function(req, res){
});

app.put("/address/:id", function(req, res){
});