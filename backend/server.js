const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');  // To resolve paths correctly
const app = express();

// Your Google Places API key (if needed)
const API_KEY = 'AIzaSyBkSXZtK4679owZDztfSaddXcJoz3mBlDw';  // Replace with your actual API key

// CORS setup to allow requests from localhost
app.use(cors({
  origin: 'http://localhost:5500'  // Allow requests from your frontend development server
}));

// Content Security Policy (CSP) setup
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " + 
    "script-src 'self' 'unsafe-inline' https://apis.google.com https://maps.googleapis.com; " + 
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "frame-src 'self' https://storage.googleapis.com; " +
    "script-src-elem https://maps.googleapis.com;");  // Allow scripts from Google Maps API
  next();
});

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));  // Correct the path to frontend

// Serve index.html when visiting the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));  // Correct path to index.html
});

// Endpoint to fetch store phone number (optional if you want to include store details)
app.get('/getPhoneNumber', async (req, res) => {
  const placeId = req.query.placeId;
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
      params: {
        place_id: placeId,
        fields: 'formatted_phone_number',
        key: API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching phone number:', error);
    res.status(500).json({ error: 'Failed to fetch phone number' });
  }
});

// Start the backend server
app.listen(3000, () => {
  console.log('Backend server is running on http://localhost:3000');
});
