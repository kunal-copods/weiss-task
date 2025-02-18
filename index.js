const lgRangeCarouselStickySection = document.querySelectorAll(".lg-range-carousel-sticky");

window.addEventListener("scroll", (e) => {
  if (lgRangeCarouselStickySection) {
    lgRangeCarouselStickySection.forEach((section) => {
      scrollTransform(section);
    });
  }
});

function scrollTransform(section) {
  const offsetTop = section?.parentElement?.offsetTop;
  const carouselArea = section.querySelector(".lg-range-carousel-area");
  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;

  if (percentage < 0) {
    percentage = 0;
  } else if (percentage > 300) {
    percentage = 300;
  }

  // Move the carousel area to the left by the percentage of the scroll position
  carouselArea.style.transform = `translate3d(${-percentage}vw, 0, 0)`;

  const activeIndicatorEl = document.querySelector(`.indicator-item[data-slide="${Math.round(percentage / 100)}"]`);
  activeIndicatorEl.classList.add("active");
  // Remove active class from all indicators except the active one
  document.querySelectorAll(".indicator-item").forEach((indicator) => {
    if (indicator !== activeIndicatorEl) {
      indicator.classList.remove("active");
    }
  });
}
