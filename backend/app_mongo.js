//Importing express module
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
 
const app = express();
const PORT = 3000;

let { connection, getBusServices, getBusStopsOfServiceNo } = require("./database_mongo");

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
