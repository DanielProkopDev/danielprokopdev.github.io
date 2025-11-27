// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
  const revealItems = document.querySelectorAll(".reveal");
  const yearSpan = document.getElementById("year");

  // Ustaw aktualny rok w stopce
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile nav toggle
  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      header.classList.toggle("nav-open");
    });
  }

  // Zamknij menu po kliknięciu w link (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({
            top,
            behavior: "smooth",
          });
        }
      }
      header.classList.remove("nav-open");
    });
  });

  // Reveal on scroll (IntersectionObserver)
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealItems.forEach((el) => observer.observe(el));
  } else {
    // Fallback: po prostu pokaż wszystko
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }
});
