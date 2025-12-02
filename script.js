const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__link');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

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

// Menú móvil
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  })
);

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
