require('dotenv').config({path: "../.env"});
const express = require('express');
const cors = require('cors');
const { generateSummary, generateQuiz } = require('./src/features/api/gemini');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-summary', async (req, res) => {
  try {
    const { content } = req.body;
    const summary = await generateSummary(content);
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

app.post('/generate-quiz', async (req, res) => {
  try {
    const { prompt } = req.body;
    const quiz = await generateQuiz(prompt);

    if (quiz) {
      res.json({ quiz });
    } else {
      res.status(400).json({ error: 'Invalid quiz format' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
