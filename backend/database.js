// establishing connection to database (replace with your own)

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Juleus',
    password: 'somepassword',
    database: 'projectdb',
});

module.exports = connection;