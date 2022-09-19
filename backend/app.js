//Importing express module
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
 
const app = express();
const PORT = 3000;
let { connection, getBusServices, getBusServicesNo, getBusStopNameInOneDirection, getBusStopsOfServiceNo } = require("./database");

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
    getBusStopsOfServiceNo(busService, res)
})

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
    }
);