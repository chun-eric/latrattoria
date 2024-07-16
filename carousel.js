'use strict';
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');
  /* ---------------------------------- */
  // Start
  // function to handle photo carousel
  const slider = document.querySelector('.slider-images');
  const slides = document.querySelectorAll('.image-container');
  const buttons = document.querySelectorAll('.gallery-button');
  let activeSlideIndex = 0;
  let startX;
  let scrollLeft;
  let isDown = false;
  let autoSlidetimer;
  let slidesToShow = 3;

  console.log('Slider:', slider);
  console.log('Slides:', slides.length);
  console.log('Buttons:', buttons.length);
  // Set initial State
  updateButtonStates();
  startAutoSlide();

  // function to update button states
  function updateButtonStates() {
    buttons.forEach((button, index) => {
      button.classList.toggle('active', index === activeSlideIndex);
    });
  }

  // function to scroll to a specific slide
  function scrollToSlide(index) {
    const slideWidth = slider.clientWidth / slidesToShow;
    let scrollPosition = index * slideWidth;

    //
    if (index >= slides.length) {
      // if past last slide loop back to first
      index = 0;
      scrollPosition = 0;
    } else if (index < 0) {
      index = slides.length - 1;
      scrollPosition = (slides.length - slidesToShow) * slideWidth;
    } else {
      scrollPosition = index * slideWidth;
    }

    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
    activeSlideIndex = index;
    updateButtonStates();
  }

  // Event Listeners
  // 1 Click event listener for buttons
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // function to scroll to a specific slide
      scrollToSlide(index);
      // start the auto slide
      restartAutoSlide();
    });
  });

  // 2. Mouse down events for dragging
  slider.addEventListener('mousedown', e => {
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
  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  // function to start auto slide
  function startAutoSlide() {
    cancelAutoSlide();
    autoSlidetimer = setInterval(() => {
      activeSlideIndex = (activeSlideIndex + 1) % slides.length;
      scrollToSlide(activeSlideIndex);
    }, 7000);
  }

  // function to cancel auto-sliding
  function cancelAutoSlide() {
    clearInterval(autoSlidetimer);
  }

  // function to restart auto-sliding
  function restartAutoSlide() {
    cancelAutoSlide();
    startAutoSlide();
  }

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

    slides.forEach(slide => {
      slide.style.flex = `0 0 ${100 / slidesToShow}%`;
    });

    scrollToSlide(activeSlideIndex);
  }

  // Call on load and resize
  adjustSliderForScreenSize();
  updateButtonStates();
  startAutoSlide();

  window.addEventListener('resize', adjustSliderForScreenSize);

  // Snap to the nearest slide function
  function snapToNearestSlide() {
    const slideWidth = slider.clientWidth / slidesToShow;
    const nearestSlideIndex = Math.round(slider.scrollLeft / slideWidth);
    scrollToSlide(nearestSlideIndex);
  }

  // Event listeners for touch devices
  slider.addEventListener('touchstart', e => {
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

  slider.addEventListener('touchmove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  /* End;*/
  /* ---------------------------------- */
});
