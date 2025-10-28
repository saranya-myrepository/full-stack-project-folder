const mysql = require('mysql');

// MySQL Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your MySQL username
    password: "1234", // Replace with your MySQL password
    database: "stitch_fetch", // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process if connection fails
    } else {
        console.log('Connected to the MySQL database.');
    }
});

module.exports = db;
