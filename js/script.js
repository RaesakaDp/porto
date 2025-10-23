const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropdownMenu = document.querySelector('.dropdown_menu');

// buka/tutup menu
toggleBtn.onclick = function () {
  dropdownMenu.classList.toggle('open');
  const isOpen = dropdownMenu.classList.contains('open');
  toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
};

// tutup otomatis saat klik link
document.querySelectorAll('.dropdown_menu a').forEach(link => {
  link.addEventListener('click', () => {
    dropdownMenu.classList.remove('open');
    toggleBtnIcon.className = 'fa-solid fa-bars';
  });
});

// ====== DARK MODE TOGGLE ======
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Ganti ikon & simpan preferensi
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Cek preferensi sebelumnya
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// ====== SCROLL REVEAL ANIMATION ======
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  for (const el of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  }
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// ====== TYPING TEXT ANIMATION ======
const typing = document.querySelector('.typing');
const roles = ['Web Developer', 'Swim Coach', 'Creative Designer'];
let idx = 0;
let charIdx = 0;
let deleting = false;

function typeEffect() {
  const current = roles[idx];
  typing.textContent = current.slice(0, charIdx);

  if (!deleting && charIdx < current.length) {
    charIdx++;
  } else if (deleting && charIdx > 0) {
    charIdx--;
  } else if (!deleting && charIdx === current.length) {
    deleting = true;
    setTimeout(typeEffect, 1000);
    return;
  } else {
    deleting = false;
    idx = (idx + 1) % roles.length;
  }

  const speed = deleting ? 60 : 120;
  setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

