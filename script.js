const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  revealItems.forEach((el) => revealObserver.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("visible"));
}

const stableText = "\u0642\u0631\u0627\u0631\u0627\u062A \u0648\u0627\u0636\u062D\u0629";

document.querySelectorAll(".typed-text").forEach((el) => {
  el.textContent = el.textContent || stableText;
  el.removeAttribute("data-words");
});


// === Counters animation ===
const counterItems = document.querySelectorAll("[data-count]");

function animateCounter(counter) {
  if (!counter || counter.dataset.done === "true") return;

  const target = Number(counter.dataset.count || "0");
  const duration = 1200;
  const startTime = performance.now();

  counter.dataset.done = "true";

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    counter.textContent = String(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = String(target);
    }
  }

  requestAnimationFrame(update);
}

if (counterItems.length) {
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: "0px 0px -20px 0px"
    });

    counterItems.forEach((counter) => counterObserver.observe(counter));
  } else {
    counterItems.forEach(animateCounter);
  }

  // Fallback for mobile browsers if observer delays
  window.addEventListener("load", () => {
    setTimeout(() => {
      counterItems.forEach((counter) => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          animateCounter(counter);
        }
      });
    }, 450);
  });
}
// === End counters animation ===