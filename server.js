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
    db = database;
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
    /*db.collection(ADDRESSES_COLLECTION).find({}).toArray(function(err, docs){
        if(err){
            handleError(res, err.message, "Failed to get address.");
        } else {
            res.status(201).json(docs);
        } 
    })*/
    const db = client.db(dbName);
    const collection = db.collection(ADDRESSES_COLLECTION);

    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        if(err){
            handleError(res, err.message, "Failed to get addresses.");
        } else {
            console.log("Found the following records");
            console.log(docs)
            res.status(201).json(docs);
        } 
});

app.post("/address", function(req, res){
    var newAddress = req.body;
    newAddress.createBody = new Date();

    if(!(req.body.postcode || req.body.address1)){
        handleError(res, "Invalid user input", "Must provide a address1 and postcode")
    }
    db.collection(ADDRESSES_COLLECTION).insertOne(newAddres, function(err, doc){
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