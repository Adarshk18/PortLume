const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = {
  generateText: async (prompt, opts = {}) => {
    try {
      // using responses API style (SDK versions vary) but safe fallback to text completion
      const response = await client.responses.create({
        model: 'gpt-4o-mini',
        input: prompt,
        max_output_tokens: opts.max_tokens || 200
      });
      // Common SDK shapes: response.output_text or response.output
      if (response.output_text) return response.output_text;
      if (Array.isArray(response.output) && response.output.length > 0) {
        // find first text content
        const parts = response.output
          .map(o => (o?.content || []).map(c => c.text || '').join(''))
          .join('');
        if (parts) return parts;
      }
      // fallback
      return JSON.stringify(response).slice(0, 1000);
    } catch (err) {
      console.error('aiService error', err?.message || err);
      throw err;
    }
  }
};
