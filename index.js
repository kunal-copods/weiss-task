const lgRangeCarouselStickySection = document.querySelectorAll(".lg-range-carousel-sticky");

// Scroll event listener for the sticky carousel
window.addEventListener("scroll", (e) => {
  if (lgRangeCarouselStickySection) {
    lgRangeCarouselStickySection.forEach((section) => {
      scrollTransform(section);
    });
  }
});

let IS_AUTO_SCROLLING = false;

function scrollTransform(section) {
  const offsetTop = section?.parentElement?.offsetTop;
  const carouselArea = section.querySelector(".lg-range-carousel-area");
  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;

  
  // Limit the percentage to the range of the carousel
  if (percentage < 0) {
    percentage = 0;
  } else if (percentage > 300) {
    percentage = 300;
  }
  
  // If the carousel is already scrolling, don't scroll again
  if (IS_AUTO_SCROLLING) {
    return;
  }
  
  console.log({percentage});
  // Snap to the first image
  if (percentage < 50) {
    smoothScrollToPercentage(0, carouselArea, offsetTop);
    setTimeout(() => {
      IS_AUTO_SCROLLING = false;
    }, 300);
  }

  // Snap to the second image
  if (percentage > 50 && percentage < 150) {
    smoothScrollToPercentage(100, carouselArea, offsetTop);
    setTimeout(() => {
      IS_AUTO_SCROLLING = false;
    }, 300);
  }

  // Snap to the third image
  if (percentage > 150 && percentage < 250) {
    smoothScrollToPercentage(200, carouselArea, offsetTop);
    setTimeout(() => {
      IS_AUTO_SCROLLING = false;
    }, 300);
  }

  // Snap to the fourth image
  if (percentage > 250 && percentage < 300) {
    smoothScrollToPercentage(300, carouselArea, offsetTop);
    setTimeout(() => {
      IS_AUTO_SCROLLING = false;
    }, 300);
  }
}

// Smoothly transitions the carousel's transform to a given percentage
function smoothScrollToPercentage(targetPercentage, carouselArea, offsetTop) {
  IS_AUTO_SCROLLING = true;
  if (!carouselArea) {
    console.warn('No carousel area found for section');
    return;
  }

  // Update transform with a smooth transition
  carouselArea.style.transform = `translate3d(${-targetPercentage}vw, 0, 0)`;


  const activeIndicatorEl = document.querySelector(`.indicator-item[data-slide="${Math.floor(targetPercentage / 100)}"]`);

  // Check if the active indicator is already active
  if (!activeIndicatorEl.classList.contains("active")) {
    activeIndicatorEl.classList.add("active");
  }

  document.querySelectorAll(".indicator-item").forEach((indicator) => {
    if (indicator !== activeIndicatorEl) {
      indicator.classList.remove("active");
    }
  });
}