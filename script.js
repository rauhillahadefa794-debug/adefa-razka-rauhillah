console.log("JS jalan — adrazr portfolio");

/* ==========================================================================
   1. NAVBAR: shadow saat scroll + tandai link aktif + menu mobile
   ========================================================================== */
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  const here = location.pathname.split('/').pop() || 'index.html';
  navbar.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  const hamburger = navbar.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => navbar.classList.toggle('open'));
    navbar.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => navbar.classList.remove('open'))
    );
  }
}

/* ==========================================================================
   2. TOGGLE MODE TERANG / GELAP
   ========================================================================== */
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('adrazr-theme');
if (savedTheme === 'light') document.body.classList.add('light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('adrazr-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

/* ==========================================================================
   3. SALAM PEMBUKA MULTI-BAHASA (efek ketik/typewriter)
   ========================================================================== */
const greetings = [
  "Halo",        // Indonesia
  "Hello",       // Inggris
  "Bonjour",     // Prancis
  "Hola",        // Spanyol
  "Hallo",       // Jerman
  "Ciao",        // Italia
  "こんにちは",     // Jepang
  "안녕하세요",      // Korea
  "你好",         // Mandarin
  "مرحباً",       // Arab
  "Namaste",     // Hindi
  "Sawasdee"     // Thailand
];

const greetEl = document.getElementById('greeting-text');

function typewriterLoop(el, words, { typeSpeed = 90, holdTime = 1100, deleteSpeed = 45 } = {}) {
  if (!el) return;
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, 250);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }
  tick();
}
typewriterLoop(greetEl, greetings);

/* ==========================================================================
   4. REVEAL ON SCROLL (fade up) — IntersectionObserver
   ========================================================================== */
const revealItems = document.querySelectorAll('.reveal, .item, .frame');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => io.observe(el));

/* ==========================================================================
   5. COUNTER ANIMASI PADA STATISTIK HERO
   ========================================================================== */
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 30);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));

/* ==========================================================================
   6. FILTER PRESTASI (index1.html & index2.html)
   ========================================================================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const frames = document.querySelectorAll('.frame');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;

    frames.forEach(frame => {
      const match = cat === 'semua' || frame.dataset.category === cat;
      frame.classList.toggle('hidden', !match);
    });
  });
});

/* ==========================================================================
   7. TOMBOL KEMBALI KE ATAS
   ========================================================================== */
const toTop = document.querySelector('.to-top');
if (toTop) {
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==========================================================================
   8. KARTU SOSIAL MEDIA — klik kanan untuk buka cepat
   ========================================================================== */
document.querySelectorAll('.scard').forEach((card) => {
  card.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    const url = card.dataset.url;
    if (url && confirm("Mau buka link sosial media ini?")) {
      window.open(url, "_blank");
    }
  });
});
