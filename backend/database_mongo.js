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

        // console.log(bus_directory.aggregate(pipeline))
        
        // var query = { $or: [ { ServiceNo: busService, Direction: 1 }, { ServiceNo: busService, Direction: 2 } ] }
        bus_directory.aggregate(pipeline).toArray(function(err, result) {
            if (err) throw err

            var data = []

            for (let i = 0; i < result.length; i++) {
                data.push({
                    ServiceNo: result[i].ServiceNo,
                    Direction: result[i].Direction,
                    BusStopCode: result[i].Route.BusStopCode,
                    StopSequence: result[i].Route.StopSequence,
                    RoadName: result[i].BusStopDesc.RoadName,
                    Description: result[i].BusStopDesc.Description,
                })
            }
            res.send(data)
        })
    })
}

const updateBusService = (topicValue, selectedServiceNo, updateValue, res) => {
    const dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    const filter = { "ServiceNo": selectedServiceNo }
    let newValue = {}
    if (topicValue == "Operator") {
        newValue = { $set: { "Operator": updateValue } }
    } else {
        newValue = { $set: { "Category": updateValue } }
    }
    bus_directory.updateMany(filter, newValue)
    res.send("OK")

}

// Create bus service
const createBusService = (busService, operator, category, res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")

    // create a document to insert
    const doc = {
        ServiceNo: busService,
        Operator: operator,
        Category: category
    }

    bus_directory.insertOne(doc)

    res.send(`Successfully created Bus Service with service number ${busService}, 
        operator ${operator}, category ${category}`)
}

// Create bus stop
const createBusStop = (busStopCode, roadName, description, latitude, longitude, res) => {
    dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")

    // create a document to insert
    const doc = {
        BusStopCode: busStopCode,
        RoadName: roadName,
        Description: description,
        Latitude: latitude,
        Longitude: longitude
    }

    locations.insertOne(doc)

    res.send(`Successfully created Bus Stop with bus stop code ${busStopCode}, road name ${roadName}, 
        description ${description}, latitude ${latitude}, longitude ${longitude}`)
}

// Create MRT Station
const createMRTStation = (stnCode, mrtStation, mrtLine, latitude, longitude, res) => {
    dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")

    // create a document to insert
    const doc = {
        StnCode: stnCode,
        MRTStation: mrtStation,
        MRTLine: mrtLine,
        Latitude: latitude,
        Longitude: longitude
    }

    locations.insertOne(doc)

    res.send(`Successfully created MRT Station with station code ${stnCode}, mrt station ${mrtStation}, 
            mrt line ${mrtLine}, latitude ${latitude}, longitude ${longitude}`)
}

// Create Taxi Stand
const createTaxiStand = (taxiCode, description, latitude, longitude, bfa, taxiOwnership, taxiType, res) => {
    dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")

    // create a document to insert
    const doc = {
        TaxiCode: taxiCode,
        Latitude: latitude,
        Bfa: bfa,
        Ownership: taxiOwnership,
        Type: taxiType,
        Name: description
    }

    locations.insertOne(doc)

    res.send(`Successfully created Taxi Stand with taxi stand code ${taxiCode}, latitude ${latitude}, 
    longitude ${longitude}, bfa ${bfa}, taxi ownership ${taxiOwnership}, taxi type ${taxiType}, description ${description}`)
}

// Check if Bus Service No. exists in DB
const checkBusServiceNo = (busService, res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    pipeline = [
        {
            '$match': {
                $and:[
                    {'ServiceNo': busService},
                    {'Direction': 1}
                ]
            }
        }, {
            '$project': {
                'ServiceNo': 1,
                '_id': 0
            }
        }
    ]
    bus_directory.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err
        data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                ServiceNo: result[i].ServiceNo,
            })
        }
        res.send(data)
    })
}

// Check if MRT Station Code exists in DB
const checkStnCode = (stnCode, res) => {
    dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    pipeline = [
        {
            '$match': {
                'StnCode': stnCode
            }
        }, {
            '$project': {
                'StnCode': 1,
                '_id': 0
            }
        }
    ]
    locations.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err
        data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                StnCode: result[i].StnCode,
            })
        }
        res.send(data)
    })
}

// Check if Taxi Stand Code exists in DB
const checkTaxiStandCode = (taxiStandCode, res) => {
    dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    pipeline = [
        {
            '$match': {
                'TaxiCode': taxiStandCode
            }
        }, {
            '$project': {
                'TaxiCode': 1,
                '_id': 0
            }
        }
    ]
    locations.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err
        data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                TaxiCode: result[i].TaxiCode,
            })
        }
        res.send(data)
    })
}

// Check if Bus Stop Code exists in DB
const checkBusStopCode = (busStopCode, res) => {
    dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    pipeline = [
        {
            '$match': {
                'BusStopCode': busStopCode
            }
        }, {
            '$project': {
                'BusStopCode': 1,
                '_id': 0
            }
        }
    ]
    locations.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err
        data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                BusStopCode: result[i].BusStopCode,
            })
        }
        res.send(data)
    })           
}

module.exports = { connection, getBusServices, getBusStopsOfServiceNo, updateBusService, createBusService, createBusStop, 
    createMRTStation, createTaxiStand, checkBusServiceNo, checkStnCode, checkTaxiStandCode, checkBusStopCode }
