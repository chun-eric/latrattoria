'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-images');
  const slides = document.querySelectorAll('.image-container');
  const buttons = document.querySelectorAll('.gallery-button');
  let activeSlideIndex = 0;
  let slidesToShow = 3;
  let startX;
  let slideWidth;
  let isDragging = false;

  function updateButtonStates() {
    buttons.forEach((button, index) => {
      button.classList.toggle('active', index === activeSlideIndex);
    });
  }

  function scrollToSlide(index) {
    const totalSlides = slides.length;
    index = Math.max(0, Math.min(index, totalSlides - slidesToShow));

    const scrollPosition = index * slideWidth;

    slider.classList.add('smooth-scroll');
    slider.scrollLeft = scrollPosition;

    setTimeout(() => {
      slider.classList.remove('smooth-scroll');
    }, 500); // Match this with the CSS transition duration

    activeSlideIndex = index;
    updateButtonStates();
  }

  function adjustSliderForScreenSize() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 600) {
      slidesToShow = 1;
    } else if (viewportWidth < 900) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }

    slideWidth = slider.clientWidth / slidesToShow;

    slides.forEach(slide => {
      slide.style.flex = `0 0 ${100 / slidesToShow}%`;
    });

    scrollToSlide(activeSlideIndex);
  }

  // Mouse events
  slider.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    slider.style.cursor = 'grabbing';
    e.preventDefault();
  });

  slider.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;

    if (walk > 50) {
      isDragging = false;
      scrollToSlide(activeSlideIndex - 1);
    } else if (walk < -50) {
      isDragging = false;
      scrollToSlide(activeSlideIndex + 1);
    }
  });

  slider.addEventListener('mouseup', endDrag);
  slider.addEventListener('mouseleave', endDrag);

  function endDrag() {
    isDragging = false;
    slider.style.cursor = 'grab';
  }

  // Touch events
  slider.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
  });

  slider.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;

    if (walk > 50) {
      isDragging = false;
      scrollToSlide(activeSlideIndex - 1);
    } else if (walk < -50) {
      isDragging = false;
      scrollToSlide(activeSlideIndex + 1);
    }
  });

  slider.addEventListener('touchend', endDrag);

  // Button click event listeners
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      scrollToSlide(index);
    });
  });

  // Initialize
  adjustSliderForScreenSize();
  updateButtonStates();

  // Handle window resize
  window.addEventListener('resize', adjustSliderForScreenSize);
});
