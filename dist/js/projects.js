// Project Terminal Navigation
function initProjectTerminal() {
  const prevBtn = document.getElementById('prev-project');
  const nextBtn = document.getElementById('next-project');
  const pagination = document.getElementById('project-pagination');
  const terminalTitle = document.getElementById('project-terminal-title');
  const projects = document.querySelectorAll('.project-content');
  
  if (!projects.length) return;
  
  let currentIndex = 0;
  
  function updateProject(index) {
    // Hide all projects
    projects.forEach(project => {
      project.classList.remove('active');
      project.style.display = 'none';
    });
    
    // Show current project
    const currentProject = projects[index];
    currentProject.classList.add('active');
    currentProject.style.display = 'block';
    
    // Update title
    const title = currentProject.getAttribute('data-title');
    terminalTitle.textContent = `~/projects/${title}`;
    
    // Update pagination
    pagination.textContent = `${index + 1} / ${projects.length}`;
    
    // Update buttons state
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === projects.length - 1;
    
    // Typing effect for commands
    const commands = currentProject.querySelectorAll('.command-text');
    commands.forEach(cmd => {
      const text = cmd.textContent;
      cmd.textContent = '';
      let i = 0;
      const type = () => {
        if (i < text.length) {
          cmd.textContent += text.charAt(i);
          i++;
          setTimeout(type, 50); // Typing speed
        }
      };
      type();
    });
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateProject(currentIndex);
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < projects.length - 1) {
      currentIndex++;
      updateProject(currentIndex);
    }
  });
  
  // Initialize
  updateProject(0);
}

// Add to initialization
document.addEventListener('DOMContentLoaded', function() {
  initProjectTerminal();
});
