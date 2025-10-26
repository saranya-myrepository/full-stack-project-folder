const express = require('express');
const path = require('path');
const db = require('./database'); // Import the database connection

const app = express();
const port = 3000;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route for user signup
app.post('/api/signup', (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL query to insert data into the database
    const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
    db.query(query, [fullname, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Registration failed' });
        } else {
            res.status(201).json({ message: 'Thanks for registering!', userId: result.insertId });
        }
    });
});

// API route to fetch all users
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ message: 'Database query failed' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Catch-all route for undefined API endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
