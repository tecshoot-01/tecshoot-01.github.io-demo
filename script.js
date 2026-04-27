// Nav scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// FAQ toggle
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// Modal
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => {
    if (e.target === m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  });
});

// Gallery grid
const gallery = document.getElementById('galleryGrid');
const emojis = ['🌸','🌿','🌅','💫','🎋','🌊','🌙','🏔️','🌺','🦋','🌼','🌙','🎑','🌸','🌿','🌅','💫','🎋'];
const selected = new Set([2,5,8,11]);
for (let i = 0; i < 18; i++) {
  const thumb = document.createElement('div');
  thumb.className = 'gallery-thumb' + (selected.has(i) ? ' selected' : '');
  thumb.innerHTML = `
    <div class="gallery-thumb-bg">${emojis[i % emojis.length]}</div>
    <div class="watermark-overlay">TECSHOOT</div>
    <button class="heart-btn">${selected.has(i) ? '♥' : '♡'}</button>
  `;
  thumb.addEventListener('click', function() {
    this.classList.toggle('selected');
    const hb = this.querySelector('.heart-btn');
    hb.textContent = this.classList.contains('selected') ? '♥' : '♡';
    if (this.classList.contains('selected')) hb.style.color = '#e06060';
    else hb.style.color = '';
  });
  gallery.appendChild(thumb);
}

// Request chips interactive
document.querySelectorAll('.request-chip').forEach(chip => {
  chip.addEventListener('click', function() {
    this.classList.toggle('active');
  });
});

// Vote buttons
document.querySelectorAll('.vote-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('voted');
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// Animate storage bars on scroll
const storageObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.storage-bar-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 100);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.storage-bar-wrap, .dash-sidebar').forEach(el => storageObserver.observe(el));