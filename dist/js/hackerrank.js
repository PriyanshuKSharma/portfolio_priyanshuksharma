document.addEventListener('DOMContentLoaded', () => {
  // Simple HackerRank Badges List
  const badges = [
    { name: 'Python', stars: 2 },
    { name: 'SQL', stars: 1 },
    { name: 'Problem Solving', stars: 2 }
  ];

  const badgesContainer = document.getElementById('hr-badges-list');

  if (badgesContainer) {
    badgesContainer.innerHTML = '';

    badges.forEach((badge, index) => {
      const item = document.createElement('div');
      item.className = 'hr-list-item';
      item.style.animationDelay = `${index * 0.1}s`;
      
      let stars = '';
      for(let i=0; i<badge.stars; i++) {
        stars += '⭐';
      }

      item.innerHTML = `
        <span class="hr-name">${badge.name}</span>
        <span class="hr-stars">${stars}</span>
      `;
      
      badgesContainer.appendChild(item);
    });
  }
});
