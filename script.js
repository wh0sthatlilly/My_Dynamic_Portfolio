document.addEventListener('DOMContentLoaded', () => {
  // ===== THEME TOGGLE =====
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
    });
  }

  // ===== LOAD AND DISPLAY PORTFOLIO PROJECTS FROM JSON =====
  fetch('portfolio_items.json')
    .then(response => response.json())
    .then(projects => {
      const projectsContainer = document.getElementById('projects-container');
      if (projectsContainer) {
        projects.forEach(project => {
          const projectCard = document.createElement('div');
          projectCard.classList.add('project-card');
          projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
          `;
          projectsContainer.appendChild(projectCard);
        });
      }
    
    });

  // ===== SKILL BUTTON DESCRIPTION =====
  const skillButtons = document.querySelectorAll('.skill-btn');
  const skillDescription = document.getElementById('skill-description');

  if (skillButtons.length && skillDescription) {
    skillButtons.forEach(button => {
      button.addEventListener('click', () => {
        const desc = button.getAttribute('data-desc');
        skillDescription.textContent = desc;

        // Toggle active class
        skillButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  // ===== SMOOTH SCROLL FOR NAVIGATION =====
  const navLinks = document.querySelectorAll('nav ul li a');

  if (navLinks.length) {
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ===== SCROLL TO TOP BUTTON =====
  const scrollBtn = document.getElementById('scrollToTopBtn');

  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== SECTION FADE-IN ANIMATION =====
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-section');
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    section.classList.add('hidden-section');
    observer.observe(section);
  });
});