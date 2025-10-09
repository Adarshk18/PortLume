const axios = require('axios');

module.exports = {
  fetchTopRepos: async (username, accessToken = null) => {
    try {
      if (!username) return [];
      const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
      const headers = accessToken ? { Authorization: `token ${accessToken}` } : {};
      const resp = await axios.get(url, { headers });
      // return top repos by stargazers_count
      const repos = resp.data
        .map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count
        }))
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        .slice(0, 10); // limit to top 10
      return repos;
    } catch (err) {
      console.error('githubService.fetchTopRepos', err.message);
      return [];
    }
  }
};
