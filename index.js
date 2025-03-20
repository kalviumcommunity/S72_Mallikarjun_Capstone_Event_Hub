const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'index.html')));

// GET endpoint for welcome message
app.get('/api/welcome', (req, res) => {
    res.json({ message: 'Welcome to the Event Hub API!' });
});

// GET endpoint for server status
app.get('/api/status', (req, res) => {
    res.json({ status: 'Server is running smoothly!' });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
