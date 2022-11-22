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

        dbo = db.db("ICT2103")
        let bus_directory = dbo.collection("bus_directory")

        var query = { ServiceNo: { $exists: true }, Direction: 1 }
        bus_directory.find(query).toArray(function(err, result) {
            if (err) throw err

            res.send(result)
        })
    })
}

// Get Bus Stops of Bus Service
const getBusStopsOfServiceNo = (busService, res) => {
    MongoClient.connect(URL, function (err, db) {
        if (err) throw err
        
        const pipeline = [
            {
                '$match': {
                    'ServiceNo': busService
                }
            }, {
                '$unwind': {
                    'path': '$Route'
                }
            }, {
                '$lookup': {
                    'from': 'locations', 
                    'localField': 'Route.BusStopCode', 
                    'foreignField': 'BusStopCode', 
                    'as': 'BusStopDesc'
                }
            }, {
                '$unwind': {
                    'path': '$BusStopDesc'
                }
            }, {
                '$project': {
                    '_id': 0, 
                    'ServiceNo': 1, 
                    'Direction': 1, 
                    'Route.BusStopCode': 1, 
                    'Route.StopSequence': 1, 
                    'BusStopDesc.RoadName': 1, 
                    'BusStopDesc.Description': 1
                }
            }
        ]

        dbo = db.db("ICT2103")
        let bus_directory = dbo.collection("bus_directory")

        console.log(bus_directory.aggregate(pipeline))
        

        var data = []
        // var query = { $or: [ { ServiceNo: busService, Direction: 1 }, { ServiceNo: busService, Direction: 2 } ] }
        // bus_directory.aggregate(pipeline).toArray(function(err, result) {
        //     if (err) throw err

        //     var data = []

        //     for (let i = 0; i < result.length; i++) {
        //         data.push({
        //             ServiceNo: result[i].ServiceNo,
        //             Direction: result[i].Direction,
        //             BusStopCode: result[i].Route.BusStopCode,
        //             StopSequence: result[i].Route.StopSequence,
        //             RoadName: result[i].BusStopDesc.RoadName,
        //             Description: result[i].BusStopDesc.Description,
        //         })
        //     }
            
        //     // console.log(typeof(busService))
        //     // const set = new Set(data)
        //     // console.log(set)
        //     // const newArray = new Array(set)
        //     // console.log(data)
        //     res.send(result)
        // })
    })
}

module.exports = { connection, getBusServices, getBusStopsOfServiceNo }