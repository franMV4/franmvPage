const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__link');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const skillSection = document.getElementById('habilidades');
const skillBars = document.querySelectorAll('.skill__bar span');
const tiltCards = document.querySelectorAll('.project-card, .tech-card');

// Scroll suave y highlighting de sección
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (entry.isIntersecting) {
        link?.classList.add('active');
        entry.target.classList.add('visible');
      } else {
        link?.classList.remove('active');
      }
    });
  },
  { threshold: 0.25 }
);

sections.forEach((section) => observer.observe(section));

// Animación de barras de habilidades
if (skillSection) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        skillBars.forEach((bar) => {
          const progress = bar.dataset.progress ?? 0;
          bar.style.width = `${progress}%`;
        });
        skillObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );
  skillObserver.observe(skillSection);
}

// Efecto tilt interactivo en tarjetas
const tiltStrength = 7;
tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * tiltStrength;
    const rotateY = (x - 0.5) * tiltStrength;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

// Menú móvil
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  })
);

// Gradiente interactivo con el cursor
window.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  root.style.setProperty('--cursor-x', `${x}%`);
  root.style.setProperty('--cursor-y', `${y}%`);
});

// Tema claro/oscuro
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  root.classList.toggle('dark', storedTheme === 'dark');
  updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  const theme = root.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  updateThemeIcon();
});

function updateThemeIcon() {
  const icon = themeToggle.querySelector('.theme-toggle__icon');
  icon.textContent = root.classList.contains('dark') ? '☀️' : '🌙';
}

// Formulario simulado
const form = document.querySelector('.contact__form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = '¡Mensaje enviado! Te contactaré pronto.';
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
});
