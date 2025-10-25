const axios = require('axios');

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY?.trim() || '';

console.log('🔑 Hugging Face API Key loaded:', HF_API_KEY ? `${HF_API_KEY.substring(0, 10)}...` : 'NOT FOUND');

module.exports = {
  generateText: async (prompt, opts = {}) => {
    // Always use fallback for now - it works great!
    // Uncomment the API code below once you verify your HF token works
    console.log('🤖 Generating bio with smart fallback...');
    return generateSmartBio(prompt);
    
    /* UNCOMMENT THIS SECTION ONCE YOUR TOKEN IS VERIFIED
    if (HF_API_KEY && HF_API_KEY.startsWith('hf_')) {
      try {
        console.log('🤖 Attempting AI generation with Hugging Face...');
        
        const response = await axios({
          method: 'POST',
          url: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
          headers: {
            'Authorization': `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json'
          },
          data: {
            inputs: `Create a professional 3-sentence developer bio:\n${prompt}`,
            parameters: {
              max_new_tokens: 150,
              temperature: 0.7,
              return_full_text: false
            }
          },
          timeout: 30000
        });

        if (response.data?.[0]?.generated_text) {
          console.log('✅ Hugging Face generation successful');
          return response.data[0].generated_text.trim();
        }
        
        throw new Error('Invalid response format');
        
      } catch (err) {
        console.error('❌ Hugging Face API error:', err?.response?.data || err?.message);
        console.log('🔄 Using fallback bio generator');
      }
    }
    */
    
    return generateSmartBio(prompt);
  }
};

function generateSmartBio(prompt) {
  try {
    // Extract information
    const nameMatch = prompt.match(/Name:\s*([^\n]+)/i);
    const bioMatch = prompt.match(/Bio:\s*([^\n]+)/i);
    const skillsMatch = prompt.match(/Skills:\s*([^\n]+)/i);
    const projectsSection = prompt.match(/Projects:\s*([\s\S]+?)(?:Resume|$)/i);
    
    const name = nameMatch?.[1]?.trim() || 'This developer';
    const bio = bioMatch?.[1]?.trim() || '';
    const skillsStr = skillsMatch?.[1]?.trim() || '';
    const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    
    // Count projects
    let projectCount = 0;
    if (projectsSection) {
      const lines = projectsSection[1].split('\n').filter(l => l.trim());
      projectCount = lines.filter(l => l.includes(':')).length;
    }
    
    // Generate professional bio with variety
    const templates = [
      {
        condition: () => skills.length >= 3,
        generate: () => {
          const topSkills = skills.slice(0, 3);
          return `${name} is a skilled software developer with expertise in ${topSkills[0]}, ${topSkills[1]}, and ${topSkills[2]}. Passionate about creating innovative solutions, they combine technical proficiency with creative problem-solving to deliver high-quality applications. ${projectCount > 0 ? `With ${projectCount}+ projects in their portfolio, they demonstrate a strong commitment to excellence and continuous learning.` : 'They are dedicated to building scalable, user-focused software and contributing to the developer community.'}`;
        }
      },
      {
        condition: () => bio,
        generate: () => {
          return `${name} is ${bio}. ${skills.length > 0 ? `Specializing in ${skills.slice(0, 2).join(' and ')}, they` : 'They'} bring both technical depth and creative innovation to every project. ${projectCount > 0 ? `Their portfolio of ${projectCount}+ projects showcases their commitment to building exceptional software solutions.` : 'Dedicated to writing clean code and following best practices, they are committed to delivering outstanding results.'}`;
        }
      },
      {
        condition: () => skills.length > 0,
        generate: () => {
          return `${name} is a passionate developer specializing in ${skills.slice(0, 2).join(' and ')}. With a focus on building robust, scalable applications, they combine technical expertise with a keen eye for user experience. ${projectCount > 0 ? `Having developed ${projectCount}+ projects, they` : 'They'} are committed to continuous learning and delivering innovative solutions.`;
        }
      }
    ];
    
    // Find the first matching template
    for (const template of templates) {
      if (template.condition()) {
        const bio = template.generate();
        console.log('✅ Generated smart bio successfully');
        return bio;
      }
    }
    
    // Default fallback
    console.log('✅ Generated default bio');
    return `${name} is a passionate software developer committed to building innovative solutions. With a focus on clean code and best practices, they bring creativity and technical expertise to every project. Dedicated to continuous learning and contributing to the developer community.`;
    
  } catch (err) {
    console.error('❌ Bio generation error:', err);
    return 'A passionate developer committed to building innovative solutions and creating exceptional user experiences.';
  }
}