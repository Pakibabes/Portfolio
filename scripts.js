const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let W, H, stars = [], shootingStars = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  const count = Math.floor((W * H) / 3000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      parallax: Math.random() * 0.4 + 0.1
    });
  }
}
function createShootingStar() {
  const x = Math.random() * W * 1.2 - W * 0.1;
  shootingStars.push({
    x, y: Math.random() * H * 0.5,
    vx: 6 + Math.random() * 6,
    vy: 2 + Math.random() * 3,
    len: 80 + Math.random() * 120,
    alpha: 1,
    life: 1
  });
}

let scrollY = 0;
window.addEventListener('scroll', () => { scrollY = window.scrollY; });

let tick = 0;
function draw() {
  ctx.clearRect(0, 0, W, H);

  // Deep space radial gradient background
  const grd = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.8);
  grd.addColorStop(0, 'rgba(14,10,30,0.92)');
  grd.addColorStop(0.5, 'rgba(5,5,10,0.95)');
  grd.addColorStop(1, 'rgba(2,2,5,1)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // Nebula clouds
  const nebulaGrd = ctx.createRadialGradient(W*0.2, H*0.3, 0, W*0.2, H*0.3, W*0.35);
  nebulaGrd.addColorStop(0, 'rgba(60,30,120,0.07)');
  nebulaGrd.addColorStop(1, 'transparent');
  ctx.fillStyle = nebulaGrd;
  ctx.fillRect(0, 0, W, H);

  const nebulaGrd2 = ctx.createRadialGradient(W*0.8, H*0.6, 0, W*0.8, H*0.6, W*0.4);
  nebulaGrd2.addColorStop(0, 'rgba(20,60,100,0.06)');
  nebulaGrd2.addColorStop(1, 'transparent');
  ctx.fillStyle = nebulaGrd2;
  ctx.fillRect(0, 0, W, H);

  // Twinkling stars with parallax
  for (const s of stars) {
    s.alpha += s.twinkleSpeed * s.twinkleDir;
    if (s.alpha > 0.95 || s.alpha < 0.1) s.twinkleDir *= -1;

    const py = s.y - scrollY * s.parallax * 0.15;

    ctx.beginPath();
    ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();

    // Occasional cross-sparkle for bright stars
    if (s.r > 1.2) {
      ctx.strokeStyle = `rgba(255,255,255,${s.alpha * 0.4})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(s.x - s.r * 3, py);
      ctx.lineTo(s.x + s.r * 3, py);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(s.x, py - s.r * 3);
      ctx.lineTo(s.x, py + s.r * 3);
      ctx.stroke();
    }
  }

  // Shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const ss = shootingStars[i];
    ss.x += ss.vx;
    ss.y += ss.vy;
    ss.life -= 0.018;
    if (ss.life <= 0) { shootingStars.splice(i, 1); continue; }

    const grad = ctx.createLinearGradient(ss.x - ss.vx * 8, ss.y - ss.vy * 8, ss.x, ss.y);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, `rgba(255,255,255,${ss.life * 0.9})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ss.x - ss.len * (ss.vx / 10), ss.y - ss.len * (ss.vy / 10));
    ctx.lineTo(ss.x, ss.y);
    ctx.stroke();
  }

  tick++;
  if (tick % 240 === 0) createShootingStar();

  requestAnimationFrame(draw);
}

resize();
createStars();
window.addEventListener('resize', () => { resize(); createStars(); });
draw();

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// Stagger sibling cards
document.querySelectorAll('.projects-grid .project-card, .skills-grid .skill-group, .about-stats .stat-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});


const hamburger = document.getElementById("hamb");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked!");
  navLinks.classList.toggle("active");
});


// ===== SCROLLED NAV =====
const nav = document.querySelector('nav');
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;

    if (window.scrollY > heroBottom * 0.6) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});