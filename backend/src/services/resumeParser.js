const pdf = require('pdf-parse'); // lightweight parser; you must `npm i pdf-parse` if used
// NOTE: pdf-parse is optional. For this repo we will fallback to text-extraction from buffer.

module.exports = {
  parseBuffer: async (buffer, remoteUrl = '') => {
    try {
      // try pdf parsing
      const data = await pdf(buffer);
      const text = (data && data.text) ? data.text : '';
      // Basic heuristic for headline & summary
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const headline = lines[0] || '';
      const summary = lines.slice(0, 8).join(' ').slice(0, 2000);
      return { text, headline, summary };
    } catch (err) {
      // fallback: convert buffer to string
      try {
        const text = buffer.toString('utf8').slice(0, 5000);
        return { text, headline: text.split('\n')[0] || '', summary: text.slice(0, 2000) };
      } catch (e) {
        return { text: '', headline: '', summary: '' };
      }
    }
  }
};
