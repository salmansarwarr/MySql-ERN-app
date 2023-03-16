const mysql2 = require('mysql2');

const connectDB = mysql2.createConnection({
    host: 'localhost',
    user: 'salman',
    password: process.env.DB_PASSWORD,
    database: 'goalsApp',
});

module.exports = connectDB;
