//Importing express module
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
 
const app = express();
const PORT = 3000;
let { connection, getBusServices, getBusServicesNo, getBusStopNameInOneDirection, getBusStopsOfServiceNo, 
    updateBusService, deleteBusRouteAndUpdateSequences, getRoutesOfBusStopCode, getMRTStationName, getMRTLines,
    getMRTStationNameFromServiceNo, getMRTStationsFromLine, getTaxiStandFromServiceNo } = require("./database");

app.use(cors());
app.use(bodyParser.json());

// GET: Bus Services with details
app.get('/api/bus-services', (req, res) => {
    getBusServices(res)
})

// GET: Bus Services Number only
app.get('/api/bus-services-no', (req, res) => {
    getBusServicesNo(res)
})

/*  
    GET: Direction of bus service
    Params: Bus Service Number (get from the dropdown menu)
    Eg: [api/bus-direction?busService=10]
*/
app.get('/api/bus-direction', (req, res) => {
    const { busService } = req.query
    getBusStopNameInOneDirection(busService, res)
})

/*  
    GET: ALl bus stops of a bus service
    Params: Bus Service Number (get from the dropdown menu)
    Eg: [api/bus-stops?busService=10]
*/
app.get('/api/bus-stops', (req, res) => {
    const { busService } = req.query
    console.log(busService)
    getBusStopsOfServiceNo(busService, res)
})

// GET: All MRT Station in database
app.get('/api/MRTStation', (req, res) => {
    getMRTStationName(res)
})

// GET: All MRT Lines in database
app.get('/api/MRTLines', (req, res) => {
    getMRTLines(res)
})

// GET: All MRT Stations from MRT Line picked in database
app.get('/api/MRTStation-Line', (req, res) => {
    const { mrtLine } = req.query
    getMRTStationsFromLine(mrtLine, res)
})

//GET: MRT Station from bus service picked
app.get('/api/MRTStation-ServiceNo', (req, res) => {
    const { busService } = req.query
    getMRTStationNameFromServiceNo(busService, res)
})

//GET: Taxi Stand from bus service picked
app.get('/api/TaxiStand-ServiceNo', (req, res) => {
    const { busService } = req.query
    getTaxiStandFromServiceNo(busService, res)
})

/*  
    GET: All routes of bus services from a bus stop code
    Params: Bus Service Number (get from the dropdown menu)
    Eg: [api/bus-stops?busService=10]
*/
app.get('/api/bus-routes', (req, res) => {
    const { busStopCode } = req.query
    getRoutesOfBusStopCode(busStopCode, res)
})

/* ---------- UPDATE END POINTS ----------*/ 
/* 
    UPDATE: One single bus service
    Two ways to do this:
        1. Send only the updated whole bus stop object as a json in the body of the request
        2. Send only the value we want to update as a key, value json in body
    Here, I am doing the second method
*/
app.put('/api/bus-services/', (req, res) => {
    // const { busService } = req.query
    const newData = req.body
    const topicValue = Object.values(newData)[0]
    const selectedServiceNo = Object.values(newData)[1]
    const updateValue = Object.values(newData)[2]

    updateBusService(topicValue, selectedServiceNo, updateValue, res)
})

/* ---------- DELETE END POINTS ----------*/ 
/* 
    DELETE: One single bus route
*/
app.delete('/api/bus-routes/', (req, res) => {
    const newData = req.body
    const routes = Object.values(Object.values(newData)[0])[0]
    const busStopCode = Object.values(newData)[1]
    // const direction = Object.values(newData)[2]

    deleteBusRouteAndUpdateSequences(routes, busStopCode, res)
})


/* Start listening to port to connect to DB */
app.listen(PORT, (error) =>{
    // listening to port just fine
    if(!error) {
        console.log("Server is Successfully Running, App is listening on port "+ PORT)

        connection.connect((err) => {
            if (err) throw err;
            console.log("DB Connected!!!");
        });
    } // cant listen to port for some reason
    else
        console.log("Error occurred, server can't start", error);

})