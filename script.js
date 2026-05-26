const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

const slider = document.querySelector("[data-committee-slider]");

if (slider) {
  const slides = Array.from(slider.querySelectorAll(".committee-slide"));
  const current = slider.querySelector("[data-slider-current]");
  const previous = slider.querySelector("[data-slider-prev]");
  const next = slider.querySelector("[data-slider-next]");
  let activeIndex = 0;

  const setSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    if (current) {
      current.textContent = String(activeIndex + 1);
    }
  };

  const syncToScroll = () => {
    const section = slider.closest(".committee-showcase");
    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
    setSlide(Math.round(progress * (slides.length - 1)));
  };

  previous?.addEventListener("click", () => setSlide(activeIndex - 1));
  next?.addEventListener("click", () => setSlide(activeIndex + 1));
  window.addEventListener("scroll", syncToScroll, { passive: true });
  window.addEventListener("resize", syncToScroll);
  setSlide(0);
  syncToScroll();
}
