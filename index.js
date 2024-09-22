const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// API endpoint to handle date requests
app.get('/api/:date?', (req, res) => {
    const dateParam = req.params.date;
    let date;

    if (!dateParam) {
        // If no date is provided, return current date
        date = new Date();
    } else if (!isNaN(dateParam)) {
        // If it's a number, treat it as a Unix timestamp
        date = new Date(parseInt(dateParam));
    } else {
        // Otherwise, try to parse the date string
        date = new Date(dateParam);
    }

    // Check if the date is valid
    if (date.toString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }

    // Return the JSON response with unix and utc keys
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});