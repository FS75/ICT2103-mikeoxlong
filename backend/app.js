//Importing express module
const express = require('express');
 
const app = express();
const PORT = 3000;
 
app.get('/', (req, res) => res.send("Hello"));

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, "
            + "and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);

const setupDB = () => {

    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'dbuser',
        password: 's3kreee7',
        database: 'my_db'
    })

    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
    })

    connection.end()
}


