let IS_SCROLL_SNAPPING_ENABLED = true;
let IS_AUTO_SCROLLING = false;
const SCROLL_TRANSITION_DURATION = 0.7;
const SCROLL_TRANSITION_TIMEOUT = SCROLL_TRANSITION_DURATION * 1000; // 700ms

const lgRangeCarouselStickySection = document.querySelectorAll(".lg-range-carousel-sticky");

// Scroll event listener for the sticky carousel
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

  
  // Limit the percentage to the range of the carousel
  if (percentage < 0) {
    percentage = 0;
  } else if (percentage > 300) {
    percentage = 300;
  }

  if(!IS_SCROLL_SNAPPING_ENABLED) {
    carouselArea.style.transition = "none";
    carouselArea.style.transform = `translate3d(${-percentage}vw, 0, 0)`;

    const slideIndex = Math.round(percentage / 100);
    // Active indicator
    const activeIndicatorEl = document.querySelector(`.indicator-item[data-slide="${slideIndex}"]`);
    if (!activeIndicatorEl.classList.contains("active")) {
      activeIndicatorEl.classList.add("active");
    }

    document.querySelectorAll(".indicator-item").forEach((indicator) => {
      if (indicator !== activeIndicatorEl) {
        indicator.classList.remove("active");
      }
    });

    // Update active class for carousel items
    const carouselItems = carouselArea.querySelectorAll('.lg-range-carousel-area-item');
    carouselItems.forEach((item, index) => {
      if (index === slideIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    return;
  } else {
    carouselArea.style.transition = `transform ${SCROLL_TRANSITION_DURATION}s ease`;
  }

  
  console.log({percentage});
  // Snap to the first image
  if (percentage < 50) {
    smoothScrollToPercentage(0, carouselArea, offsetTop);
  }

  // Snap to the second image
  if (percentage > 50 && percentage < 150) {
    smoothScrollToPercentage(100, carouselArea, offsetTop);
  }

  // Snap to the third image
  if (percentage > 150 && percentage < 250) {
    smoothScrollToPercentage(200, carouselArea, offsetTop);
  }

  // Snap to the fourth image
  if (percentage > 250 && percentage < 300) {
    smoothScrollToPercentage(300, carouselArea, offsetTop);
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

  const slideIndex = Math.floor(targetPercentage / 100);
  const activeIndicatorEl = document.querySelector(`.indicator-item[data-slide="${slideIndex}"]`);

  // Check if the active indicator is already active
  if (!activeIndicatorEl.classList.contains("active")) {
    activeIndicatorEl.classList.add("active");
  }

  document.querySelectorAll(".indicator-item").forEach((indicator) => {
    if (indicator !== activeIndicatorEl) {
      indicator.classList.remove("active");
    }
  });

  // Update active class for carousel items
  const carouselItems = carouselArea.querySelectorAll('.lg-range-carousel-area-item');
  carouselItems.forEach((item, index) => {
    if (index === slideIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Toggle scroll snapping
document.getElementById("toggle-scroll-snapping").addEventListener("click", () => {
  IS_SCROLL_SNAPPING_ENABLED = !IS_SCROLL_SNAPPING_ENABLED;
  console.log("Scroll snapping enabled:", IS_SCROLL_SNAPPING_ENABLED);

  // Change the button text
  document.getElementById("toggle-scroll-snapping").textContent = IS_SCROLL_SNAPPING_ENABLED ? "Disable Scroll Snapping" : "Enable Scroll Snapping";
});
