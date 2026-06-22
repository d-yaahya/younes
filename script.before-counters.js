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