const { response } = require('express');

var MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/db"

const connection = new MongoClient(URL)

// // Connect to the db
// MongoClient.connect(URL, function (err, db) {
   
//      if(err) throw err;

//      //Write database Insert/Update/Query code here..
//      console.log("Successfully connected to MongoDB")
                
// });

// Get All Bus Services
const getBusServices = (res) => {
    MongoClient.connect(URL, function (err, db) {
        if (err) throw err

        var dbo = db.db("ICT2103")
        var query = { ServiceNo: { $exists: true } }
        dbo.collection("ICT2103Collection").find(query).toArray(function(err, result) {
            if (err) throw err

            res.send(result)
        })
    })  
}

// Get Bus Stops of Bus Service
const getBusStopsOfServiceNo = (busService, res) => {
    MongoClient.connect(URL, function (err, db) {
        if (err) throw err

        var data = []

        var dbo = db.db("ICT2103")
        var query = { $or: [ { ServiceNo: busService, Direction: 1 }, { ServiceNo: busService, Direction: 2 } ] }
        dbo.collection("ICT2103Collection").find(query).toArray(function(err, result) {
            if (err) throw err

            // console.log(typeof(result[0].Route[5]))

            for (let i = 0; i < 2; i++){
                for (let j = 0; j < Object.keys(result[i]).length; j++) {
                    data.push(result[i].Route[j])
                    // console.log(result[i].Route[j])
                }
            }
            // console.log(data)

            res.send(data)
        })
    })  
}

module.exports = { connection, getBusServices, getBusStopsOfServiceNo }