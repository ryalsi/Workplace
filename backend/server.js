// server.js

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// POST endpoint for fetching reward message
app.post('/get-reward', async (req, res) => {
    const prompt = req.body.prompt || "Give a motivational message for completing all tasks.";

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 50
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ message: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        res.status(500).json({ error: 'Failed to fetch reward message' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
