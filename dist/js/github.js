document.addEventListener('DOMContentLoaded', () => {
  const username = 'PriyanshuKSharma';
  
  // Fetch Profile Data
  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('github-avatar').src = data.avatar_url;
      document.getElementById('github-name').textContent = data.name || data.login;
      document.getElementById('github-followers').textContent = `${data.followers} followers`;
      document.getElementById('github-following').textContent = `${data.following} following`;
      document.getElementById('github-repos').textContent = `${data.public_repos} repositories`;
    })
    .catch(error => {
      console.error('Error fetching GitHub profile:', error);
      document.getElementById('github-name').textContent = 'Error loading profile';
    });

  // Fetch Contribution Calendar (using a proxy or library is usually required for the graph)
  // For simplicity and reliability without external heavy libraries, we can use a simple image representation 
  // or a text-based summary. However, users often want the green squares.
  // We will use the popular 'ghchart' image proxy for a quick and beautiful visual.
  
  const graphContainer = document.getElementById('github-graph-container');
  if (graphContainer) {
    graphContainer.innerHTML = `
      <img 
        src="https://ghchart.rshah.org/00fff2/${username}" 
        alt="GitHub Contribution Graph" 
        style="width: 100%; height: auto; border-radius: 8px; filter: drop-shadow(0 0 10px rgba(0, 255, 242, 0.2)); margin-bottom: 2rem;"
      />
    `;
  }
});
