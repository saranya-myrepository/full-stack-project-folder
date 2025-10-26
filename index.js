// Importing required modules
const express = require('express');
const db = require('./database'); // Import the database configuration

// Create an instance of Express
const app = express();
const port = 3000; // Define the port for the server

// Middleware to handle JSON requests
app.use(express.json());

// Endpoint to test database connection and query execution
app.get('/test-db', (req, res) => {
  // Query the database to check if it's working
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err.stack);
      return res.status(500).send('Database query failed');
    }
    console.log('The solution is: ', results[0].solution);
    res.send(`The solution is: ${results[0].solution}`);
  });
});

// Basic route to check server is running
app.get('/', (req, res) => {
  res.send('Hello, welcome to the Node.js server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
