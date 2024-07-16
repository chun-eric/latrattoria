'use strict';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');

  const slider = document.querySelector('.slider-images');
  const slides = document.querySelectorAll('.image-container');
  const buttons = document.querySelectorAll('.gallery-button');
  let activeSlideIndex = 0;
  let autoSlidetimer;
  let slidesToShow = 3;
  let startX;
  let scrollLeft;
  let isDown = false;

  console.log('Slider:', slider);
  console.log('Slides:', slides.length);
  console.log('Buttons:', buttons.length);

  // Set initial state
  updateButtonStates();
  startAutoSlide();

  // Function to update button states
  function updateButtonStates() {
    buttons.forEach((button, index) => {
      button.classList.toggle('active', index === activeSlideIndex);
    });
    console.log(`Active slide index:`, activeSlideIndex);
  }

  // Function to scroll to a specific slide
  function scrollToSlide(index) {
    const totalSlides = buttons.length; // Use the number of buttons to limit slides
    const visibleSlides = Math.min(slidesToShow, totalSlides);
    const slideWidth = slider.clientWidth / visibleSlides;

    // Ensure index wraps around
    index = (index + totalSlides) % totalSlides;

    let scrollPosition = index * slideWidth;

    // Adjust scroll position for end of carousel
    const maxScroll = (totalSlides - visibleSlides) * slideWidth;
    scrollPosition = Math.min(scrollPosition, maxScroll);

    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });

    activeSlideIndex = index;
    updateButtonStates();

    console.log(`Scrolled to slide ${index}, position ${scrollPosition}`);
  }

  // Function to start auto slide
  function startAutoSlide() {
    cancelAutoSlide();
    autoSlidetimer = setInterval(() => {
      let nextIndex = (activeSlideIndex + 1) % buttons.length; // Use buttons.length to wrap correctly
      console.log(`Auto-sliding to index: ${nextIndex}`);
      scrollToSlide(nextIndex);
    }, 7000);
  }

  // Function to cancel auto-sliding
  function cancelAutoSlide() {
    clearInterval(autoSlidetimer);
  }

  // Function to restart auto-sliding
  function restartAutoSlide() {
    cancelAutoSlide();
    startAutoSlide();
  }

  // Event Listeners
  // 1. Click event listener for buttons
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      scrollToSlide(index);
      restartAutoSlide();
    });
  });

  // 2. Mouse down events for dragging
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cancelAutoSlide();
  });

  // 3. Mouse leave event
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    restartAutoSlide();
  });

  // 4. Mouse up event
  slider.addEventListener('mouseup', () => {
    isDown = false;
    restartAutoSlide();
  });

  // 5. Mouse move event
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // Adjust for responsive design
  function adjustSliderForScreenSize() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 600) {
      slidesToShow = 1;
    } else if (viewportWidth < 900) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }

    slides.forEach((slide) => {
      slide.style.flex = `0 0 ${100 / slidesToShow}%`;
    });

    scrollToSlide(activeSlideIndex);
  }

  window.addEventListener('resize', adjustSliderForScreenSize);

  // Snap to the nearest slide function
  function snapToNearestSlide() {
    const slideWidth = slider.clientWidth / slidesToShow;
    const nearestSlideIndex = Math.round(slider.scrollLeft / slideWidth);
    scrollToSlide(nearestSlideIndex);
  }

  // Event listeners for touch devices
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cancelAutoSlide();
  });

  slider.addEventListener('touchend', () => {
    isDown = false;
    snapToNearestSlide();
    restartAutoSlide();
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // Initial call to set up the slider
  adjustSliderForScreenSize();
  updateButtonStates();
  startAutoSlide();
});
