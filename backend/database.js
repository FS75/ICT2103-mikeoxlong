// establishing connection to database (replace with your own)

const { response } = require('express');
var mysql = require('mysql')

//----------------------- USE YOUR OWN CONNECTION HERE -----------------------
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'Juleus',
//     password: 'somepassword',
//     database: 'projectdb',
// });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Asdfgh568!',
    database: 'ICT2103_Project',
});


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
    const query = `SELECT Description FROM Bus_Stop WHERE BusStopCode IN (SELECT DestinationCode FROM Bus_Direction WHERE serviceNo = '${busService}');`
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

module.exports = {connection, getBusServices, getBusServicesNo, getBusStopNameInOneDirection, getBusStopsOfServiceNo};