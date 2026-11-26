// 1) Reveal sections as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// 2) Animate the slim progress bar at the top while scrolling.
const progressBar = document.getElementById("scrollProgress");
function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// 3) Give the 3D avatar a subtle mouse-follow tilt.
const heroVisual = document.getElementById("heroVisual");
const avatarFrame = document.getElementById("avatarFrame");
if (heroVisual && avatarFrame && window.matchMedia("(pointer:fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    avatarFrame.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 7}deg) translateZ(12px)`;
  });
  heroVisual.addEventListener("mouseleave", () => {
    avatarFrame.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
  });
}

// 4) Cycle through short developer role descriptions.
const roleElement = document.getElementById("typedRole");
const roles = ["Java applications", "REST APIs", "backend solutions", "useful web experiences"];
let roleIndex = 0;
if (roleElement) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleElement.textContent = roles[roleIndex];
  }, 2200);
}

// 5) Mobile navigation menu.
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

// 6) Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));
