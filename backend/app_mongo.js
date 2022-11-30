//Importing express module
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
 
const app = express();
const PORT = 3000;

let { connection, createBusService, createBusStop, createMRTStation, createTaxiStand, getBusServices, getBusServicesNo,
    getBusStopsOfServiceNo, getBusStopNameInOneDirection, getTaxiStands, getTaxiStandLocationFromName, getTaxiStandBFAFromName, 
    getMRTStnCodes, getMRTStationName, getMRTLines, getMRTStationsFromLine, getMRTStationNameFromServiceNo, getLocationFromMRTStation, 
    getTaxiStandLocationFromServiceNo, getTaxiStandLocationFromMRTStation, getRoutesOfBusStopCode, getBusInterchange, 
    getServicesFromBusInterchange, getServiceWithMostStops, getServiceWithHighestDistance, checkBusServiceNo, 
    checkStnCode, checkTaxiStandCode, checkBusStopCode, updateBusService, updateTaxiBFA, 
    deleteBusRouteAndUpdateSequences, deleteTaxiStand, deleteMRTStation } = require("./database_mongo");

app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '300kb'}));

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

/* ---------- READ END POINTS ----------*/ 

/*
    GET: All bus service details
*/
app.get('/api/bus-services', (req, res) => {
    getBusServices(res)
})

/*  
    GET: All bus service numbers 
*/
app.get('/api/bus-services-no', (req, res) => {
    getBusServicesNo(res)
})

/*  
    GET: Direction of bus service
    Params: Bus Service No.
    Eg: [api/bus-direction?busService=10]
*/
app.get('/api/bus-direction', (req, res) => {
    const { busService } = req.query
    getBusStopNameInOneDirection(busService, res)
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

/*  
    GET: All Taxi Stand Detail
*/
app.get('/api/taxi-stand', (req, res) => {
    // const { busService } = req.query
    getTaxiStands(res)
})

/*  
    GET: Taxi Stand Location from Name
    Params: Taxi Stand Name
    Eg: [api/taxi-location-from-name?name=]
*/
app.get('/api/taxi-location-from-name', (req, res) => {
    const { name } = req.query
    getTaxiStandLocationFromName(name, res)
})

/*  
    GET: Taxi Stand BFA from Name
    Params: Taxi Stand Name
    Eg: [api/taxi-bfa-from-name?name=]
*/
app.get('/api/taxi-bfa-from-name', (req, res) => {
    const { name } = req.query
    getTaxiStandBFAFromName(name, res)
})

/*  
    GET: All MRT Station Codes
*/
app.get('/api/MRTStnCodes', (req, res) => {
    getMRTStnCodes(res)
})

/*  
    GET: All MRT Station Names
*/
app.get('/api/MRTStation', (req, res) => {
    getMRTStationName(res)
})

/*  
    GET: All MRT Lines
*/
app.get('/api/MRTLines', (req, res) => {
    getMRTLines(res)
})

/*  
    GET: All MRT Stations from MRT Line inputted
    Params: MRT Line
    Eg: [api/MRTStation-Line?mrtLine=Circle%20Line]
*/
app.get('/api/MRTStation-Line', (req, res) => {
    const { mrtLine } = req.query
    getMRTStationsFromLine(mrtLine, res)
})

/*  
    GET: MRT Station Name from Bus Service No inputted
    Params: Bus Service No
    Eg: [api/MRTStation-ServiceNo?serviceNo=10]
*/
app.get('/api/MRTStation-ServiceNo', (req, res) => {
    const { busService } = req.query
    getMRTStationNameFromServiceNo(busService, res)
})

/*  
    GET: Location from MRT Station inputted
    Params: MRT Station
    Eg: [api/Location-MRTStation?station=Tampines]
*/
app.get('/api/Location-MRTStation', (req, res) => {
    const { station } = req.query
    getLocationFromMRTStation(station, res)
})

/*  
    GET: Taxi Stand from Bus Service inputted
    Params: Bus Service No.
    Eg: [api/Location-MRTStation?busService=10]
*/
app.get('/api/TaxiStand-ServiceNo', (req, res) => {
    const { busService } = req.query
    getTaxiStandLocationFromServiceNo(busService, res)
})

/*  
    GET: Taxi Stand Location from MRT Station inputted
    Params: MRT Station
    Eg: [api/TaxiStand-MRTStation?station=Tampines]
*/
app.get('/api/TaxiStand-MRTStation', (req, res) => {
    const { station } = req.query
    getTaxiStandLocationFromMRTStation(station, res)
})

/*  
    GET: All routes of bus services from a bus stop code
    Params: Bus Service No.
    Eg: [api/bus-stops?busService=10]
*/
app.get('/api/bus-routes', (req, res) => {
    const { busStopCode } = req.query
    getRoutesOfBusStopCode(busStopCode, res)
})

/*  
    GET: All Bus Interchange Details
*/
app.get('/api/bus-interchange', (req, res) => {
    getBusInterchange(res)
})

/*  
    GET: All Bus Service from Bus Interchange inputted
    Params: Bus Interchange
    Eg: [api/bus-interchange-services?interchange=Sengkang Int]
*/
app.get('/api/bus-interchange-services', (req, res) => {
    const { interchange } = req.query
    getServicesFromBusInterchange(interchange, res)
})

/*  
    GET: Bus Service with most no. of bus stops in 1 direction
*/
app.get('/api/bus-service-most-stops', (req, res) => {
    getServiceWithMostStops(res)
})

/*  
    GET: Bus Service with highest distance in 1 direction
*/
app.get('/api/bus-service-highest-distance', (req, res) => {
    getServiceWithHighestDistance(res)
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

/* ---------- UPDATE END POINTS ----------*/ 
/*  
    PUT: Update operator/category
    Body: JSON of topic, service number, operator/category
    Eg: [api/bus-services]
*/
app.put('/api/bus-services/', (req, res) => {
    // const { busService } = req.query
    const newData = req.body
    const topicValue = Object.values(newData)[0]
    const selectedServiceNo = Object.values(newData)[1]
    const updateValue = Object.values(newData)[2]

    updateBusService(topicValue, selectedServiceNo, updateValue, res)
})

app.put('/api/taxi-stand-bfa/', (req, res) => {
    const { code, bfa } = req.query
    updateTaxiBFA(code, bfa, res)
})


/* ---------- DELETE END POINTS ----------*/ 
/* 
    DELETE: One single bus route
*/
app.delete('/api/bus-routes/', (req, res) => {
    // const newData = req.body
    // var routes = []
    // routes = Object.values(Object.values(newData)[0])[0]
    // const busStopCode = Object.values(newData)[1]

    res.send("This feature only works in our SQL version")

    // deleteBusRouteAndUpdateSequences(routes, busStopCode, res)
})
/* 
    DELETE: One taxi stand
*/
app.delete('/api/taxi-stand/', (req, res) => {
    const newData = req.body
    const code = Object.values(newData)[0]

    deleteTaxiStand(code, res)
})
/* 
    DELETE: One mrt station
*/
app.delete('/api/mrt-station/', (req, res) => {
    const newData = req.body
    const name = Object.values(newData)[0]

    deleteMRTStation(name, res)
})