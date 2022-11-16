// establishing connection to database (replace with your own)

const { response } = require('express');
var mysql = require('mysql')

//----------------------- USE YOUR OWN CONNECTION HERE -----------------------
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'ict2103',
// });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Juleus',
    password: 'somepassword',
    database: 'projectdb',
});

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Asdfgh568!',
//     database: 'ICT2103_Project',
// });


// Bus services with details
const getBusServices = (res) => {
    var data = []
    const query = 'SELECT * FROM Bus_Services;'
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        data = JSON.parse(JSON.stringify(rows));
        res.send(data)
    })
}

// Bus services number only
const getBusServicesNo = (res) => {
    var rawData = []
    var data = []
    const query = 'SELECT ServiceNo FROM Bus_Services;'
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        // console.log(rawData)
        for(let row of rawData){
            data.push(row.ServiceNo); 
        }
        res.send(data)
    })
}

// Bus stop name in one direction
const getBusStopNameInOneDirection = (busService, res) => {
    var rawData = []
    var data = []
    const query = `SELECT Description 
                   FROM Bus_Stop 
                   WHERE BusStopCode IN 
                   (SELECT DestinationCode 
                    FROM Bus_Direction 
                    WHERE serviceNo = '${busService}');`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        // console.log(rawData)
        for(let row of rawData){
            data.push(row.Description); 
        }
        res.send(data)
    })
}

const getBusStopsOfServiceNo = (busService, res) => {
    var rawData = []
    var data = []
    const query = ` SELECT *
                    FROM bus_route BR JOIN bus_stop BS
                    ON BR.BusStopCode = BS.BusStopCode
                    WHERE BR.ServiceNo = '${busService}'
                    ORDER BY BR.ServiceNo, BR.Direction, BR.StopSequence; `
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        res.send(rawData)
    })                
}

const getRoutesOfBusStopCode = (busStopCode, res) => {
    var rawData = []
    var data = []
    const query = ` SELECT *
                    FROM bus_route
                    WHERE BusStopCode = '${busStopCode}'; `
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        //console.log(rawData)
        for(let row of rawData){
            data.push(row.MRTStation); 
        }
        res.send(data)
    })
}

//Get MRT Station from ServiceNo chosen
const getMRTStationNameFromServiceNo = (busService, res) => {
    var rawData = []
    var data = []
    const query = `SELECT DISTINCT mrt.MRTStation
        FROM MRT_Station mrt
        LEFT JOIN bus_route br ON mrt.busStopCode = br.busStopCode
        WHERE ServiceNo = '${busService}'; `
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
    
        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        res.send(rawData)
    })  
}

//Get Taxi Stand from ServiceNo chosen
const getTaxiStandFromServiceNo = (busService, res) => {
    var rawData = []
    var data = []
    const query = `SELECT Name FROM Taxi_Stand taxi
        WHERE taxi.StnCode IN (
        SELECT DISTINCT mrt.StnCode
        FROM MRT_Station mrt
        LEFT JOIN bus_route br ON mrt.busStopCode = br.busStopCode
        WHERE ServiceNo = '${busService}');`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
    
        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        res.send(rawData)
    })  
}

// topics are ServiceNo (FK - cannot update), Operator, Category
const updateBusService = (topicValue, selectedServiceNo, updateValue, res) => {
    var rawData = []
    var data = []
    const query = ` UPDATE bus_services 
                    SET ${topicValue} = '${updateValue}' 
                    WHERE ServiceNo = '${selectedServiceNo}'; `
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        // rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        // res.send(rawData)
        res.send("Updated Bus Service " + selectedServiceNo + " to " + topicValue)
    })
}

const deleteBusRouteAndUpdateSequences = (routes, busStopCode, res) => {
    var rawData = []
    var data = []
    var query = ""

    query += ` DELETE FROM bus_route
               WHERE BusStopCode = '${busStopCode}'; `

    for (let i = 0; i < routes.length; i++) {
        query += ` UPDATE bus_route 
                   SET StopSequence = StopSequence - 1 
                   WHERE ServiceNo = '${routes[i].ServiceNo}' 
                   AND Direction = '${routes[i].Direction}'
                   AND StopSequence > ${routes[i].StopSequence}; `
    }
    
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        // rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        // res.send(rawData)
        res.send("Deleted bus route for all affected bus services and updated stop sequences")
    })
}

//Get all MRT stations in DB
const getMRTStationName = (res) => {
    var rawData = []
    var data = []
    const query = 'SELECT MRTStation FROM mrt_station;'
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
    
        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        res.send(rawData)
    })  
}

//Get all MRT stations in DB
const getMRTLines = (res) => {
    var rawData = []
    var data = []
    const query = 'SELECT DISTINCT MRTLine FROM mrt_station;'
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
    
        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        res.send(rawData)
    })  
}

//Get all MRT stations in DB
const getMRTStnCodes = (res) => {
    var rawData = []
    var data = []
    const query = 'SELECT StnCode FROM mrt_station;'
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
    
        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        res.send(rawData)
    })  
}

// Get all MRT Stations from MRT line in DB
const getMRTStationsFromLine = (mrtLine, res) => {
    var rawData = []
    var data = []
    const query = ` SELECT MRTStation 
                    FROM mrt_station
                    WHERE MRTLine = '${mrtLine}'; `
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
    
        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        res.send(rawData)
    })  
}

//Get MRT Station from ServiceNo chosen
const getLocationFromMRTStation = (station, res) => {
    var rawData = []
    var data = []
    const query = ` SELECT Latitude, Longitude 
                    FROM mrt_station 
                    WHERE MRTStation='${station}'; `
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
    
        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        res.send(rawData)
    })  
}

module.exports = {connection, getBusServices, getBusServicesNo, getBusStopNameInOneDirection, 
    getBusStopsOfServiceNo, updateBusService, deleteBusRouteAndUpdateSequences, getRoutesOfBusStopCode,
    getMRTStationName,getMRTStationNameFromServiceNo, getMRTLines, getMRTStnCodes, getMRTStationsFromLine, 
    getLocationFromMRTStation, getTaxiStandFromServiceNo}
