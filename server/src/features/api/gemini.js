const axios = require('axios');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL_VERSION = process.env.GEMINI_MODEL_VERSION;

async function generateSummary(content) {
  const payload = {
    contents: [{ parts: [{ text: content }] }],
  };
  try {
    const { data } = await axios.post(
      `${GEMINI_MODEL_VERSION}?key=${GEMINI_API_KEY}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary found';
  } catch (error) {
    console.error('Error in generateSummary:', error.response?.data || error.message);
    return 'No summary found';
  }
}

async function generateQuiz(prompt) {
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const { data } = await axios.post(
      `${GEMINI_MODEL_VERSION}?key=${GEMINI_API_KEY}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No quiz generated';
    console.log('Raw Gemini response text:', text);
    try {
      const json = JSON.parse(text);
      return json.questions ? json : null;
    } catch {
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        try {
          const cleaned = text.substring(start, end + 1);
          const json = JSON.parse(cleaned);
          return json.questions ? json : null;
        } catch {}
      }
    }
  } catch (error) {
    console.error('Error in generateQuiz:', error.response?.data || error.message);
  }
  return null;
}

module.exports = {
  generateSummary,
  generateQuiz,
};
