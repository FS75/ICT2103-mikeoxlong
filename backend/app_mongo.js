//Importing express module
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
 
const app = express();
const PORT = 3000;

let { connection, getBusServices, getBusStopsOfServiceNo, updateBusOperator, createBusService, createBusStop, 
    createMRTStation, createTaxiStand, checkBusServiceNo, checkStnCode, checkTaxiStandCode, checkBusStopCode } = require("./database_mongo");

app.use(cors());
app.use(bodyParser.json());

/* Start listening to port to connect to DB */
app.listen(PORT, (error) =>{
    // listening to port just fine
    if(!error) {
        console.log("Server is Successfully Running, App is listening on port " + PORT)

        connection.connect((err) => {
            if (err) throw err;
            console.log("MongoDB Connected!!!");
        });
    } // cant listen to port for some reason
    else
        console.log("Error occurred, server can't start", error);

})

/* ---------- CREATE END POINTS ----------*/ 
/*
    CREATE: One bus service
*/
// app.post('/api/bus-service', (req, res) => {
//     const { busService, operator, category } = req.query
//     createBusService(busService, operator, category, res)
// })

app.get('/api/bus-services', (req, res) => {
    getBusServices(res)
})

/*  
    GET: All bus stops of a bus service
    Params: Bus Service No.
    Eg: [api/bus-stops?busService=10]
*/
app.get('/api/bus-stops', (req, res) => {
    const { busService } = req.query
    getBusStopsOfServiceNo(busService, res)
})

app.put('/api/change-operator', (req, res) => {
    const { busService, operator } = req.query
    updateBusOperator(busService, operator, res)
})

/* ---------- CREATE END POINTS ----------*/ 
/*
    CREATE: One bus service
*/
app.post('/api/bus-service', (req, res) => {
    const { busService, operator, category } = req.query
    createBusService(busService, operator, category, res)
})

/*
    CREATE: One bus stop
*/
app.post('/api/bus-stop', (req, res) => {
    const { busStopCode, roadName, description, latitude, longitude } = req.query
    createBusStop(busStopCode, roadName, description, latitude, longitude, res)
})

/*
    CREATE: One MRT station
*/
app.post('/api/mrt-station', (req, res) => {
    const { stnCode, mrtStation, mrtLine, latitude, longitude } = req.query
    createMRTStation(stnCode, mrtStation, mrtLine, latitude, longitude, res)
})

/*  
    CREATE: One Taxi Stand
*/
app.post('/api/taxi-stand', (req, res) => {
    const { taxiCode, description, latitude, longitude, bfa, taxiOwnership, taxiType } = req.query
    createTaxiStand(taxiCode, description, latitude, longitude, bfa, taxiOwnership, taxiType, res)
})

/*  
    GET: Check if Bus Service No. exists in DB
    Params: Bus Service No.
    Eg: [api/check-bus-service?busService=10]
*/
app.get('/api/check-bus-service', (req, res) => {
    const { busService } = req.query
    checkBusServiceNo(busService, res)
})

/*  
    GET: Check if Bus Stop Code exists in DB
    Params: Bus Stop Code
    Eg: [api/check-bus-stop-code?busStopCode=640901]
*/
app.get('/api/check-bus-stop-code', (req, res) => {
    const { busStopCode } = req.query
    checkBusStopCode(busStopCode, res)
})

/*  
    GET: Check if MRT Stn Code exists in DB
    Params: MRT Station Code
    Eg: [api/check-station-code?stnCode=EW10]
*/
app.get('/api/check-station-code', (req, res) => {
    const { stnCode } = req.query
    checkStnCode(stnCode, res)
})

/*  
    GET: Check if Taxi Stand Code exists in DB
    Params: Taxi Stand Code
    Eg: [api/check-taxi-stand?taxiStandCode=A01]
*/
app.get('/api/check-taxi-stand', (req, res) => {
    const { taxiStandCode } = req.query
    checkTaxiStandCode(taxiStandCode, res)
})