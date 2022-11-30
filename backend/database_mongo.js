const { response } = require('express');

var MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/"
const connection = new MongoClient(URL)

// // Connect to the db
// MongoClient.connect(URL, function (err, db) {

//      if(err) throw err;

//      //Write database Insert/Update/Query code here..
//      console.log("Successfully connected to MongoDB")

// });

// Get All Bus Services
const getBusServices = (res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")

    bus_directory.distinct('ServiceNo',function (err, result) {
        if (err) throw err
        res.send(result)
    })
}

// Get All Bus Services No.
const getBusServicesNo = (res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    const match = { ServiceNo:{$exists:true} }
    const project = { _id: 0, ServiceNo: 1}
    bus_directory.find(match,project).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                ServiceNo: result[i].ServiceNo,
            })
        }
        res.send(data)
    })
}

// Get All Bus Stop names in one direction
const getBusStopNameInOneDirection = (busService, res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    const pipeline = [
        {
            '$match': {
                'ServiceNo': busService
            }
        },{
            '$lookup': {
                'from': 'locations',
                'localField': 'DestinationCode',
                'foreignField': 'BusStopCode',
                'as': 'Destination'
            }
        }, {
            '$unwind': {
                'path': '$Destination'
            }
        }, {
            '$project': {
                _id: 0,
                'Destination.Description': 1
            }
        }
    ]
    bus_directory.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                Description: result[i].Destination.Description,
            })
        }
        res.send(data)
    })
}
// Get Bus Stops of Bus Service
const getBusStopsOfServiceNo = (busService, res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
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
        },{
            '$match': {
                'BusStopDesc.MRTStation': {$exists:false}
            }
        }, {
            '$project': {
                _id: 0,
                ServiceNo: 1,
                Direction: 1,
                "Route.BusStopCode": 1,
                "Route.StopSequence": 1,
                "Route.Distance": 1,
                "Route.SAT_FirstBus": 1,
                "Route.SAT_LastBus": 1,
                "Route.SUN_FirstBus": 1,
                "Route.SUN_LastBus": 1,
                "Route.WD_LastBus": 1,
                "Route.WD_FirstBus": 1,
                "BusStopDesc.RoadName": 1,
                "BusStopDesc.Description": 1,
                "BusStopDesc.Latitude": 1,
                "BusStopDesc.Longitude": 1,
            }
        }
    ]
    // console.log(bus_directory.aggregate(pipeline))
    // var query = { $or: [ { ServiceNo: busService, Direction: 1 }, { ServiceNo: busService, Direction: 2 } ] }
    bus_directory.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []

        for (let i = 0; i < result.length; i++) {
            data.push({
                ServiceNo: result[i].ServiceNo,
                Direction: result[i].Direction,
                Distance: parseFloat(result[i].Route.Distance),
                BusStopCode: result[i].Route.BusStopCode,
                StopSequence: result[i].Route.StopSequence,
                RoadName: result[i].BusStopDesc.RoadName,
                Description: result[i].BusStopDesc.Description,
                SATFirstBus: parseInt(result[i].Route.SAT_FirstBus),
                SATLastBus: parseInt(result[i].Route.SAT_LastBus),
                SUNFirstBus: parseInt(result[i].Route.SUN_FirstBus),
                SUNLastBus: parseInt(result[i].Route.SUN_LastBus),
                WDFirstBus: parseInt(result[i].Route.WD_FirstBus),
                WDLastBus: parseInt(result[i].Route.WD_LastBus),
                Latitude: result[i].BusStopDesc.Latitude,
                Longitude: result[i].BusStopDesc.Longitude,
            })
        }
        res.send(data)
    })
}

//Get All Taxi Stands
const getTaxiStands = (res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
        
    var query = { TaxiCode: { $exists: true } }
    locations.find(query).toArray(function (err, result) {
        if (err) throw err
        res.send(result)
    })
}

// Get Location of Taxi Stand with inputted Name
const getTaxiStandLocationFromName = (name, res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    const match = { Name: name }
    const project = { _id: 0, Latitude: 1, Longitude: 1}
    locations.find(match,project).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                Latitude: parseFloat(result[i].Latitude),
                Longitude: parseFloat(result[i].Longitude),
            })
        }
        res.send(data)
    })
}

// Get BFA of Taxi Stand with inputted Name 
//        **Only problem with output**
const getTaxiStandBFAFromName = (name, res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    const match = { Name: name }
    const project = { _id: 0, Bfa: 1}
    locations.find(match,project).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                Bfa: {type:'Buffer',data:[parseInt(result[i].Bfa)]}
            })
        }
        res.send(data)
    })
}

// Get all MRT Station Codes
const getMRTStnCodes = (res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    const pipeline = [
        {
            '$match': {
                $and: [
                    {StnCode:{$exists:true}},
                    {TaxiCode:{$exists:false}}
                ]
            }
        },{
            '$project': {
                _id: 0,
                StnCode: 1,
            }
        }
    ]
    locations.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                StnCode: result[i].StnCode,
            })
        }
        res.send(data)
    })
}

// Get all MRT Stations
const getMRTStationName = (res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    const pipeline = [
        {
            '$match': {
                $and: [
                    {StnCode:{$exists:true}},
                    {MRTStation:{$exists:true}}
                ]
            }
        }, {
            '$project': {
                _id: 0,
                StnCode: 1,
                MRTStation: 1,
            }
        }
    ]
    locations.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                StnCode: result[i].StnCode,
                MRTStation: result[i].MRTStation,
            })
        }
        res.send(data)
    })  
}

// Get all MRT Lines
const getMRTLines = (res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    const pipeline = [
        {
            '$group': {
                _id: null,
                MRTLine: {$addToSet: '$MRTLine'}
            }
        },{
            '$unwind':{
                'path': '$MRTLine'
            }
        },{
            '$project':{
                _id: 0,
                MRTLine: 1
            }
        }
    ]
    locations.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err
        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                MRTLine: result[i].MRTLine,
            })
        }
        res.send(data)
    })
}

// Get all MRT Stations from MRT Line
const getMRTStationsFromLine = (mrtLine, res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    const match = { MRTLine: mrtLine }
    const project = { _id: 0, StnCode: 1, MRTStation: 1}
    locations.find(match,project).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                StnCode: result[i].StnCode,
                MRTStation: result[i].MRTStation,
            })
        }
        res.send(data)
    })  
}
//Get MRT Station Name from Bus Service No.
const getMRTStationNameFromServiceNo = (busService, res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    const pipeline = [
        {
            '$match': {
                'ServiceNo': '172'
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
                'as': 'result'
            }
        }, {
            '$unwind': {
                'path': '$result'
            }
        }, {
            '$match': {
                'result.MRTStation': {
                    '$exists': true
                }
            }
        }, {
            '$group': {
                '_id': null, 
                'MrtStation': {
                    '$addToSet': '$result.MRTStation'
                }
            }
        }, {
            '$unwind': {
                'path': '$MrtStation'
            }
        }, {
            '$project': {
                '_id': 0, 
                'MrtStation': 1
            }
        }
    ]
    bus_directory.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                MRTStation: result[i].MRTStation,
            })
        }
        res.send(data)
    })  
}

// Get Location from MRT Station
const getLocationFromMRTStation = (station, res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    const match = { MRTStation: station }
    const project = { _id: 0, Latitude: 1, Longitude: 1}
    locations.find(match,project).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                Latitude: result[i].Latitude,
                Longitude: result[i].Longitude,
            })
        }
        res.send(data)
    })
}
// Get Taxi Stand Location from Bus Service No.
const getTaxiStandLocationFromServiceNo = (busService, res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
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
                'as': 'MRTWithBus'
            }
        }, {
            '$unwind': {
                'path': '$MRTWithBus'
            }
        }, {
            '$match': {
                'MRTWithBus.StnCode': {'$exists': true}, 
                'Direction': 1
            }
        }, {
            '$lookup': {
                'from': 'locations', 
                'localField': 'MRTWithBus.StnCode', 
                'foreignField': 'StnCode', 
                'as': 'TaxiNearBus'
            }
        }, {
            '$unwind': {
                'path': '$TaxiNearBus'
            }
        }, {
            '$match': {
                'TaxiNearBus.TaxiCode': {'$exists': true}
            }
        }, {
            '$project': {
                '_id': 0, 
                'TaxiNearBus.Latitude': 1, 
                'TaxiNearBus.Longitude': 1
            }
        }
    ]
    bus_directory.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                Latitude: parseFloat(result[i].TaxiNearBus.Latitude),
                Longitude: parseFloat(result[i].TaxiNearBus.Longitude),
            })
        }
        res.send(data)
    })  
}

// Get Taxi Stand Location from MRT Station
const getTaxiStandLocationFromMRTStation = (station, res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    const pipeline = [
        {
            '$match': {
                'MRTStation': station
            }
        }, {
            '$lookup': {
                'from': 'locations', 
                'localField': 'StnCode', 
                'foreignField': 'StnCode', 
                'as': 'TaxiLocation'
            }
        }, {
            '$unwind': {
                'path': '$TaxiLocation'
            }
        }, {
            '$match': {
                'TaxiLocation.TaxiCode': {
                    '$exists': true
                }
            }
        }, {
            '$project': {
                '_id': 0, 
                'TaxiLocation.Latitude': 1, 
                'TaxiLocation.Longitude': 1
            }
        }
    ]
    locations.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err
        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                latitude: parseFloat(result[i].TaxiLocation.Latitude),
                longitude: parseFloat(result[i].TaxiLocation.Longitude),
            })
        }
        res.send(data)
    })  
}

// Get all Bus Routes from Bus Stop Code
const getRoutesOfBusStopCode = (busStopCode, res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    const pipeline = [
        {
            '$match': {
                'Route.BusStopCode': busStopCode
            }
        }, {
            '$unwind': {
                'path': '$Route'
            }
        }, {
            '$project': {
                _id: 0,
                ServiceNo: 1,
                Direction: 1,
                "Route.BusStopCode": 1,
                "Route.StopSequence": 1,
                "Route.Distance": 1,
                "Route.SAT_FirstBus": 1,
                "Route.SAT_LastBus": 1,
                "Route.SUN_FirstBus": 1,
                "Route.SUN_LastBus": 1,
                "Route.WD_LastBus": 1,
                "Route.WD_FirstBus": 1,
            }
        }
    ]
    bus_directory.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                ServiceNo: result[i].ServiceNo,
                Direction: result[i].Direction,
                Distance: parseFloat(result[i].Route.Distance),
                BusStopCode: result[i].Route.BusStopCode,
                StopSequence: result[i].Route.StopSequence,
                SATFirstBus: parseInt(result[i].Route.SAT_FirstBus),
                SATLastBus: parseInt(result[i].Route.SAT_LastBus),
                SUNFirstBus: parseInt(result[i].Route.SUN_FirstBus),
                SUNLastBus: parseInt(result[i].Route.SUN_LastBus),
                WDFirstBus: parseInt(result[i].Route.WD_FirstBus),
                WDLastBus: parseInt(result[i].Route.WD_LastBus),
            })
        }
        res.send(data)
    })
}

// Get All Bus Interchange details
const getBusInterchange = (res) => {
    const dbo = connection.db("ICT2103")
    let businterchange_services = dbo.collection("businterchange_services")
    businterchange_services.find().toArray(function (err, result) {
        if (err) throw err
        res.send(result)
    })
}
// Get All Bus Services ran by Bus Interchange
const getServicesFromBusInterchange = (busstopcode, res) => {
    const dbo = connection.db("ICT2103")
    let businterchange_busservices = dbo.collection("businterchange_busservices")

    businterchange_busservices.distinct('Buses.ServiceNo',{BusStopCode: busstopcode}).then((ans) => {
        var data = []
        for (let i = 0; i < ans.length; i++) {
            data.push({
                ServiceNo: ans[i]
            })
        }
        res.send(data);
    }).catch((err) => {
        console.log(err.Message);
    })
}

// Get Bus Service with most stops in 1 direction
const getServiceWithMostStops = (res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    const pipeline = [
        {
            '$unwind': {
                'path': '$Route'
            }
        }, {
            '$sort': {
                'id': 1, 
                'Route.StopSequence': -1
            }
        }, {
            '$group': {
                '_id': '$id', 
                'maxval': {
                    '$first': '$$ROOT'
                }
            }
        }, {
            '$replaceWith': {
                'max': '$maxval'
            }
        }, {
            '$sort': {
                'id': 1, 
                'max.Route.StopSequence': -1
            }
        }, {
            '$limit': 1
        }, {
            '$project': {
                _id: 0, 
                'max.ServiceNo': 1, 
                'max.Route.StopSequence': 1, 
                'max.Route.Distance': 1
            }
        }
    ]
    bus_directory.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                serviceno: result[i].max.ServiceNo,
                stopsequence: result[i].max.Route.StopSequence,
                distance: result[i].max.Route.Distance,
            })
        }
        res.send(data)
    })  
}

// Get Bus Service with highest distance in 1 direction
const getServiceWithHighestDistance = (res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    const pipeline = [
        {
            '$unwind': {
                'path': '$Route'
            }
        }, {
            '$sort': {
                'id': 1, 
                'Route.Distance': -1
            }
        }, {
            '$group': {
                '_id': '$id', 
                'maxval': {
                    '$first': '$$ROOT'
                }
            }
        }, {
            '$replaceWith': {
                'max': '$maxval'
            }
        }, {
            '$sort': {
                'id': 1, 
                'max.Route.Distance': -1
            }
        }, {
            '$limit': 1
        }, {
            '$project': {
                _id: 0, 
                'max.ServiceNo': 1, 
                'max.Route.StopSequence': 1, 
                'max.Route.Distance': 1
            }
        }
    ]
    bus_directory.aggregate(pipeline).toArray(function (err, result) {
        if (err) throw err

        var data = []
        for (let i = 0; i < result.length; i++) {
            data.push({
                serviceno: result[i].max.ServiceNo,
                stopsequence: result[i].max.Route.StopSequence,
                distance: result[i].max.Route.Distance,
            })
        }
        res.send(data)
    })  
}

// Update Bus Service Details
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

// Update Taxi BFA
const updateTaxiBFA = (code, bfa, res) => {
    const dbo = connection.db("ICT2103")
    let locations = dbo.collection("locations")
    // console.log(locations)
    const projection = { "TaxiCode": code }
    let newBfa = ""
    if (bfa === "TRUE") {
        newBfa = "1"
    } else {
        newBfa = "0"
    }
    const newValue = { $set: { "Bfa": newBfa } }
    console.log(projection, newValue)
    locations.updateOne(projection, newValue)
    res.send("OK")
}


// Create bus service
const createBusService = (busService, operator, category, res) => {
    dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")
    // create a document to insert
    const doc = {
        ServiceNo: busService.trim(),
        Operator: operator,
        Category: category
    }

    bus_directory.insertOne(doc)

    res.send(`Successfully created Bus Service with service number ${busService}, operator ${operator}, category ${category}`)
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
    if (bfa == "TRUE")
        bfa2 = "1"
    else
        bfa2 = "0"
    // create a document to insert
    const doc = {
        TaxiCode: taxiCode,
        Latitude: latitude,
        Bfa: bfa2,
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
                $and: [
                    { 'ServiceNo': busService },
                    { 'Direction': 1 }
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

// Delete Taxi Stand
const deleteTaxiStand = (code, res) => {
    const dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("locations")

    var query = { TaxiCode: code }
    bus_directory.deleteOne(query)
        res.send(`Successfully deleted Taxi Stand ${code} `)
}

// Delete Mrt Station
const deleteMRTStation = (name, res) => {
    const dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("locations")

    var query = { MRTStation: name }
    bus_directory.deleteOne(query)
        res.send(`Successfully deleted MRT Station ${name}`)
}

// Delete Bus Route while also Updating Sequences for all affected Bus Routes
const deleteBusRouteAndUpdateSequences = (routes, busStopCode, res) => {
    const dbo = connection.db("ICT2103")
    let bus_directory = dbo.collection("bus_directory")

    var query = { "Route.BusStopCode": busStopCode }
    bus_directory.deleteOne(query)
    for (let i = 0; i < routes.length; i++) {
        var filter = {
            ServiceNo: routes[i].ServiceNo, Direction: routes[i].Direction,
            "Route.StopSequence": { $gt: routes[i].StopSequence }
        }
        var newValues = { $inc: { "Route.$.StopSequence": -1 } }
        bus_directory.updateMany(filter, newValues)
    }
        res.send(`Deleted bus route for all affected bus services and updated all stop sequences`)
}

module.exports = {
    connection, getBusServices, getBusServicesNo, getBusStopNameInOneDirection, getBusStopsOfServiceNo, getTaxiStands, 
    getTaxiStandLocationFromName, getTaxiStandBFAFromName, getMRTStnCodes, getMRTStationName, getMRTLines, getMRTStationsFromLine, 
    getMRTStationNameFromServiceNo, getLocationFromMRTStation, getTaxiStandLocationFromServiceNo, getTaxiStandLocationFromMRTStation, 
    getRoutesOfBusStopCode, getBusInterchange, getServicesFromBusInterchange, getServiceWithMostStops, getServiceWithHighestDistance, 
    updateBusService, updateTaxiBFA, createBusService, createBusStop, createMRTStation, createTaxiStand, checkBusServiceNo, 
    checkStnCode, checkTaxiStandCode, checkBusStopCode, deleteTaxiStand, deleteMRTStation, deleteBusRouteAndUpdateSequences
}
