// ====== NAVBAR MOBILE TOGGLE ======
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropdownMenu = document.querySelector('.dropdown_menu');

// Buka/tutup menu
if (toggleBtn && dropdownMenu) {
  toggleBtn.onclick = function () {
    dropdownMenu.classList.toggle('open');
    const isOpen = dropdownMenu.classList.contains('open');
    toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  };

  // Tutup otomatis saat klik link di dropdown
  document.querySelectorAll('.dropdown_menu a').forEach(link => {
    link.addEventListener('click', () => {
      dropdownMenu.classList.remove('open');
      toggleBtnIcon.className = 'fa-solid fa-bars';
    });
  });
}

// ====== DARK MODE TOGGLE ======
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (themeToggle) {
  // Ganti ikon & simpan preferensi
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Cek preferensi sebelumnya saat load
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

// ====== SCROLL REVEAL ANIMATION ======
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// ====== TYPING TEXT ANIMATION ======
const typing = document.querySelector('.typing');
if (typing) {
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
}


// ====== ANIMATE EDUCATION CARDS ON SCROLL ======
function animateEducation() {
  const cards = document.querySelectorAll('.edu-card');
  const windowHeight = window.innerHeight;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const delay = parseInt(card.dataset.delay || 0);
    if (rect.top < windowHeight - 100) {
      setTimeout(() => card.classList.add('active'), delay);
    }
  });
}

window.addEventListener('scroll', animateEducation);
window.addEventListener('load', animateEducation);


// ====== SMOOTH SCROLLING UNTUK NAVBAR LINKS ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});


// ====== INISIALISASI HALAMAN SAAT DIMUAT ======
document.addEventListener("DOMContentLoaded", () => {
  // Scroll ke atas setiap kali halaman dimuat ulang
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ====== BACK TO TOP BUTTON SCRIPT ======
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    // Munculkan tombol jika halaman di-scroll lebih dari 300px ke bawah
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}