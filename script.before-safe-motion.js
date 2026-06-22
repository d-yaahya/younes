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

/* ظهور العناصر بدون حركة تسبب اهتزاز */
document.querySelectorAll(".reveal").forEach((el) => {
  el.classList.add("visible");
});

/* تثبيت أي نص كان متحرك */
document.querySelectorAll(".typed-text").forEach((el) => {
  el.textContent = el.textContent || "قرارات واضحة";
  el.removeAttribute("data-words");
});