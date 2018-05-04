'use strict'
//const express = require('express')
//const morgan = require('morgan')

//const app = express();

//app.use(morgan('dev'));

/*app.get('/hello/:name', (req, res) =>{
  res.status(200).json({'hello':req.params.name});
})

app.listen(60701, ()=> console.log('Ready.'));*/

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
 
var cloud = true;
 
var mongodbHost = '127.0.0.1';
var mongodbPort = '27017';
 
var authenticate ='';
//cloud
if (cloud) {
 mongodbHost = 'ds014578.mlab.com';
 mongodbPort = '14578';
 authenticate = 'bbuser:Qwerty123@'
}
 
var mongodbDatabase = 'properties';
 
// connect string for mongodb server running locally, connecting to a database called test
var url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;
 
 
// find and CRUD: http://mongodb.github.io/node-mongodb-native/2.0/tutorials/crud_operations/
// aggregation: http://mongodb.github.io/node-mongodb-native/2.0/tutorials/aggregation/
 
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db("properties");

  const collection = db.collection('Addresses');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
  });



  client.close();
});
