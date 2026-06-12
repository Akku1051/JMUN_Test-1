const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

const finishLoading = () => {
  document.body.classList.remove("is-loading");
};

if (document.readyState === "complete") {
  window.setTimeout(finishLoading, 180);
} else {
  window.addEventListener("load", () => window.setTimeout(finishLoading, 180), { once: true });
  window.setTimeout(finishLoading, 2500);
}

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
  let isPaused = false;
  let autoplay;

  const setSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    if (current) {
      current.textContent = String(activeIndex + 1);
    }
  };

  const moveSlide = (step) => {
    setSlide(activeIndex + step);
  };

  const startAutoplay = () => {
    window.clearInterval(autoplay);
    autoplay = window.setInterval(() => {
      if (!isPaused) {
        moveSlide(1);
      }
    }, 2000);
  };

  previous?.addEventListener("click", () => {
    moveSlide(-1);
    startAutoplay();
  });
  next?.addEventListener("click", () => {
    moveSlide(1);
    startAutoplay();
  });
  slider.addEventListener("mouseenter", () => {
    isPaused = true;
  });
  slider.addEventListener("mouseleave", () => {
    isPaused = false;
  });
  slider.addEventListener("focusin", () => {
    isPaused = true;
  });
  slider.addEventListener("focusout", () => {
    isPaused = false;
  });
  setSlide(0);
  startAutoplay();
}
