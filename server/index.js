require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL_VERSION = process.env.GEMINI_MODEL_VERSION;

if (!GEMINI_API_KEY || !GEMINI_MODEL_VERSION) {
  console.error('Missing GEMINI_API_KEY or GEMINI_MODEL_VERSION in environment variables');
  process.exit(1);
}

// Summary Endpoint
app.post('/generate-summary', async (req, res) => {
  try {
    const { content } = req.body;

    const payload = {
      contents: [
        {
          parts: [{ text: content }]
        }
      ]
    };

    const { data } = await axios.post(
      `${GEMINI_MODEL_VERSION}?key=${GEMINI_API_KEY}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary found';
    res.json({ summary: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// Quiz Endpoint
app.post('/generate-quiz', async (req, res) => {
  try {
    const { prompt } = req.body;

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    const { data } = await axios.post(
      `${GEMINI_MODEL_VERSION}?key=${GEMINI_API_KEY}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No quiz generated';

    try {
      const json = JSON.parse(text);
      if (json.questions) {
        return res.json({ quiz: json });
      }
    } catch (e) {
      // Attempt to extract the JSON from malformed response
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        const cleaned = text.substring(start, end + 1);
        try {
          const json = JSON.parse(cleaned);
          if (json.questions) {
            return res.json({ quiz: json });
          }
        } catch {}
      }
    }

    res.status(400).json({ error: 'Invalid quiz format' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
