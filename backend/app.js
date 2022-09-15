//Importing express module
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
 
const app = express();
const PORT = 3000;
var connection = require("./database");

app.use(cors());
app.use(bodyParser.json());

// this is to send data to frontend
// app.get('/', (req, res) => {
//     res.json({ message: "hello"});
    
// });

// receive query from frontend 
// following that, we should send query to sql
app.post('/', (req, res) => {
    var query = req.body;
    console.log(query);
});

app.listen(PORT, (error) =>{

    // listening to port just fine
    if(!error) {
        console.log("Server is Successfully Running, App is listening on port "+ PORT)

        connection.connect((err) => {
            if (err) throw err;
            console.log("DB Connected!!!");
        });
    }
    
    // cant listen to port for some reason
    else
        console.log("Error occurred, server can't start", error);
    }
);