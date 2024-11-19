const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle prompt requests from React
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Send prompt to the Python backend
    const response = await axios.post('http://localhost:8000/generate', { prompt });
    res.json(response.data); 
  } catch (error) {
    console.error("Error generating response:", error.message);
    res.status(500).json({ error: "Error generating response" });
  }
});


// Endpoint to handle prompt requests from React
app.get('/test', async (req, res) => {
    try {
        res.json("Test successful"); // Send the response back to the React frontend
    } catch (error) {
        res.status(500).json({ error: "Error testing" });
    }
});


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Node server running on http://localhost:${PORT}`);
});