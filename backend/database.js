// establishing connection to database (replace with your own)

const { response } = require('express');
var mysql = require('mysql')

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'Juleus',
//     password: 'somepassword',
//     database: 'projectdb',
// });

// kc
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Asdfgh568!',
    database: 'ICT2103_Project',
});


const getBusServices = (res) => {
    var data = []
    const query = 'SELECT * FROM Bus_Services;'
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        data = JSON.parse(JSON.stringify(rows));
        res.send(data)
    })
}

const getBusServicesNo = (res) => {
    var rawData = []
    var data = []
    const query = 'SELECT ServiceNo FROM Bus_Services;'
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
        // rows.forEach(row => {
        //     data.push(Object.value(row))
        // });
        rawData = JSON.parse(JSON.stringify(Object.values(rows)));
        // console.log(rawData)
        for(let row of rawData){
            data.push(row.ServiceNo); 
        }
        res.send(data)
    })
}

module.exports = {connection, getBusServices, getBusServicesNo};