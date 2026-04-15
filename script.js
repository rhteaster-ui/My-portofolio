/*
 * Custom scripts for the portfolio website.
 * Implements a simple typing effect and scroll reveal animations using
 * IntersectionObserver for better performance.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Typing effect for the subtitle
  const typingElement = document.getElementById('typing');
  const phrases = [
    'Self‑taught Web Developer',
    'Pencipta Web App & PWA',
    'Penggemar Teknologi',
    'AI‑assisted Productivity Maker'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (!deleting) {
      typingElement.innerHTML = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      typingElement.innerHTML = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    const delay = deleting ? 60 : 120;
    setTimeout(type, delay);
  }
  type();

  // Scroll reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  reveals.forEach(el => observer.observe(el));

  /**
   * Animated particles in the hero section
   * Creates floating circles that move gently across the hero
   * background to add a subtle but sophisticated animation.
   */
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 40;

  // Resize canvas to match hero size and handle HiDPI displays
  function resizeCanvas() {
    const hero = document.querySelector('.hero');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = hero.clientWidth * dpr;
    canvas.height = hero.clientHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Particle constructor
  function Particle() {
    const hero = document.querySelector('.hero');
    this.x = Math.random() * hero.clientWidth;
    this.y = Math.random() * hero.clientHeight;
    this.radius = 2 + Math.random() * 3;
    // Random velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.2 + Math.random() * 0.4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    // Random color from gradient palette
    const colors = ['#1de9b6', '#00bcd4', '#2196f3'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  Particle.prototype.update = function(heroWidth, heroHeight) {
    this.x += this.vx;
    this.y += this.vy;
    // Bounce off edges
    if (this.x < -10 || this.x > heroWidth + 10) this.vx *= -1;
    if (this.y < -10 || this.y > heroHeight + 10) this.vy *= -1;
  };
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  // Initialize particles
  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const hero = document.querySelector('.hero');
    const heroWidth = hero.clientWidth;
    const heroHeight = hero.clientHeight;
    // Draw particles
    particles.forEach(p => {
      p.update(heroWidth, heroHeight);
      p.draw();
    });
  }
  animate();
});