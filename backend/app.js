//Importing express module
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
 
const app = express();
const PORT = 3000;
let { connection, getBusServices, getBusServicesNo } = require("./database");

app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     var busServices = []
//     let query = 'SELECT * FROM Bus_Services;'
//     connection.query(query, (err, rows, fields) => {
//         if (err) throw err

//         busServices = JSON.parse(JSON.stringify(rows));
//         res.send(busServices)
//     })
// })

app.get('/api/bus-services', (req, res) => {
    getBusServices(res)
})

app.get('/api/bus-services-no', (req, res) => {
    getBusServicesNo(res)
})


// this is to send data to frontend
// app.get('/', (req, res) => {
//     res.json({ message: "hello"});
    
// });

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