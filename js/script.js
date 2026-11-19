/* =================================================
   1. NAVBAR MOBILE TOGGLE
================================================= */
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropdownMenu = document.querySelector('.dropdown_menu');

if (toggleBtn && dropdownMenu) {
  toggleBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('open');
    const isOpen = dropdownMenu.classList.contains('open');
    if (toggleBtnIcon) {
      toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
  });

  document.querySelectorAll('.dropdown_menu a').forEach(link => {
    link.addEventListener('click', () => {
      dropdownMenu.classList.remove('open');
      if (toggleBtnIcon) {
        toggleBtnIcon.className = 'fa-solid fa-bars';
      }
    });
  });
}

/* =================================================
   2. DARK MODE TOGGLE + LOCAL STORAGE
================================================= */
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (themeToggle) {
  // Cek preferensi tema saat halaman pertama kali dibuka
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* =================================================
   3. TYPING TEXT ANIMATION (HERO)
================================================= */
const typing = document.querySelector('.typing');
if (typing) {
  const roles = ['Web Developer', 'Frontend Enthusiast', 'UI/UX Designer'];
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
      setTimeout(typeEffect, 1400);
      return;
    } else {
      deleting = false;
      idx = (idx + 1) % roles.length;
    }

    const speed = deleting ? 55 : 105;
    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

/* =================================================
   4. SMOOTH SCROLLING & SCROLL TO TOP ON RELOAD
================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  handleScrollEffects(); // Jalankan pengecekan posisi saat load
});

/* =================================================
   5. UNIFIED SCROLL HANDLER (PROGRESS BAR, REVEAL,
      EDUCATION, ACTIVE NAV, & BACK TO TOP)
================================================= */
// Buat Scroll Progress Bar di bagian paling atas layar
const progressBar = document.createElement('div');
Object.assign(progressBar.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  height: '3px',
  width: '0%',
  background: 'var(--accent-color)',
  zIndex: '200',
  transition: 'width 0.1s ease-out'
});
document.body.appendChild(progressBar);

const reveals = document.querySelectorAll('.reveal');
const eduCards = document.querySelectorAll('.edu-card');
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.getElementById('backToTopBtn');

function handleScrollEffects() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;

  // A. Update Scroll Progress Bar
  const docHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${scrollPercent}%`;

  // B. Reveal Sections
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < windowHeight - 100) {
      el.classList.add('active');
    }
  });

  // C. Animate Education Cards dengan Stagger Delay
  eduCards.forEach(card => {
    if (card.getBoundingClientRect().top < windowHeight - 100 && !card.classList.contains('active')) {
      const delay = parseInt(card.dataset.delay || 0, 10);
      setTimeout(() => card.classList.add('active'), delay);
    }
  });

  // D. Active Navbar Link Indicator
  let currentSection = '';
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 135) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinksList.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === `#${currentSection}`);
  });

  // E. Back To Top Button Visibility
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('show', scrollTop > 300);
  }
}

window.addEventListener('scroll', handleScrollEffects);

/* =================================================
   6. INTERACTIVE 3D TILT (#tilt-card) & CARD SPOTLIGHT
================================================= */
const tiltCard = document.getElementById('tilt-card');
if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    tiltCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 173, 181, 0.16), var(--card-bg) 70%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--card-bg)';
  });
});

/* =================================================
   7. MODAL CASE STUDY PROYEK
================================================= */
const projectData = {
  swimedu: {
    title: 'SwimEduWeb',
    img: 'img/project1.png',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    problem: 'Banyak pemula maupun siswa kesulitan memahami tahapan gerakan dasar renang (seperti gaya bebas dan gaya dada) hanya dari penjelasan teks statis di buku.',
    solution: 'Membangun platform edukasi renang berbasis web yang menyajikan panduan visual langkah demi langkah, materi terstruktur, dan antarmuka responsif sehingga mudah diakses siswa maupun pelatih di pinggir kolam.',
    demo: 'https://raesakadp.github.io/SwimEduWeb/index.html',
    code: 'https://github.com/RaesakaDp/SwimEduWeb'
  },
  pos: {
    title: '"Kenangan Mantan" POS (Point of Sale)',
    img: 'img/Aplikasi_Kasir_Cafeshop.jpg',
    tags: ['JavaScript', 'DOM Manipulation', 'UI/UX Design'],
    problem: 'Pencatatan pesanan manual di kedai kopi sering menimbulkan selisih perhitungan transaksi, antrean lambat, dan kesulitan merekap total penjualan harian.',
    solution: 'Merancang sistem kasir web bertema dark-mode yang modern dengan fitur keranjang belanja real-time, kalkulasi otomatis pajak/diskon, serta tampilan yang nyaman dipakai di layar tablet kasir.',
    demo: 'https://raesakadp.github.io/Aplikasi-Kasir/',
    code: 'https://github.com/raesakadp'
  },
  swimmo: {
    title: 'Swimmo',
    img: 'img/swimmo.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Sport Tech'],
    problem: 'Kebutuhan akan alat bantu digital yang praktis untuk mendukung pencatatan program latihan dan informasi aktivitas renang secara terpusat.',
    solution: 'Mengembangkan aplikasi web interaktif yang memadukan pengalaman sebagai pelatih renang dengan teknologi web modern untuk mempermudah manajemen aktivitas renang.',
    demo: 'https://raesakadp.github.io/Swimmo/',
    code: 'https://github.com/RaesakaDp/Swimmo'
  }
};

const modal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const detailButtons = document.querySelectorAll('.btn-detail');

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

detailButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-project');
    const data = projectData[key];
    if (!data || !modal) return;

    document.getElementById('modalImg').src = data.img;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalProblem').textContent = data.problem;
    document.getElementById('modalSolution').textContent = data.solution;
    document.getElementById('modalDemoLink').href = data.demo;
    document.getElementById('modalCodeLink').href = data.code;

    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

closeModalBtn?.addEventListener('click', closeProjectModal);
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

/* =================================================
   8. PENGIRIMAN FORM KONTAK TANPA RELOAD (AJAX)
================================================= */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        formStatus.style.color = 'var(--accent-color)';
        formStatus.textContent = 'Pesan berhasil terkirim! Terima kasih telah menghubungi saya.';
        contactForm.reset();
      } else {
        formStatus.style.color = '#ef4444';
        formStatus.textContent = 'Gagal mengirim pesan. Pastikan Access Key sudah diisi dengan benar.';
      }
    } catch (error) {
      formStatus.style.color = '#ef4444';
      formStatus.textContent = 'Terjadi kesalahan jaringan. Silakan coba lagi nanti.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
    }
  });
}

/* =================================================
   INTERACTIVE 3D HERO STAGE PARALLAX
================================================= */
const heroStage = document.getElementById('heroStage');

if (heroStage) {
  heroStage.addEventListener('mousemove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    heroStage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroStage.addEventListener('mouseleave', () => {
    heroStage.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}