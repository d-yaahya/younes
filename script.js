const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');
const year = document.querySelector('#year');
const glow = document.querySelector('.cursor-glow');
const typed = document.querySelector('.typed-text');
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll('section[id]')];

year.textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 45, 420)}ms`;
  revealObserver.observe(el);
});

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const item = entry.target;
    const target = Number(item.dataset.count || 0);
    const duration = 1300;
    const started = performance.now();

    function animate(now) {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      item.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
    countObserver.unobserve(item);
  });
}, { threshold: .6 });

document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

if (typed) {
  typed.textContent = 'قرارات واضحة';
  typed.removeAttribute('data-words');
}

window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const canHover = window.matchMedia('(hover: hover)').matches;
if (canHover) {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - .5) * -8;
      const rotateX = ((y / rect.height) - .5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('pointermove', (event) => {
      const rect = btn.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .18;
      const y = (event.clientY - rect.top - rect.height / 2) * .18;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });
}

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => activeObserver.observe(section));

