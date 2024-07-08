const sliderImages = document.querySelector('.slider-images');
const galleryButtons = document.querySelectorAll('.gallery-button');
const imageContainers = document.querySelectorAll('.image-container');

let currentSlide = 0;
const totalSlides = imageContainers.length;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

function showSlide(index) {
  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  currentTranslate = currentSlide * -100;
  prevTranslate = currentTranslate;
  setSliderPosition();

  // Update active button
  galleryButtons.forEach((button, i) => {
    button.classList.toggle('active', i === currentSlide);
  });
}

function setSliderPosition() {
  sliderImages.style.transform = `translateX(${currentTranslate}%)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startAutoSlide() {
  return setInterval(nextSlide, 7000);
}

let autoSlideInterval = startAutoSlide();

// Touch events
sliderImages.addEventListener('touchstart', touchStart);
sliderImages.addEventListener('touchmove', touchMove);
sliderImages.addEventListener('touchend', touchEnd);

// Mouse events
sliderImages.addEventListener('mousedown', touchStart);
sliderImages.addEventListener('mousemove', touchMove);
sliderImages.addEventListener('mouseup', touchEnd);
sliderImages.addEventListener('mouseleave', touchEnd);

function touchStart(event) {
  clearInterval(autoSlideInterval);
  startPos = getPositionX(event);
  isDragging = true;
  animationID = requestAnimationFrame(animation);
  sliderImages.classList.add('dragging');
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100) {
    showSlide(currentSlide + 1);
  } else if (movedBy > 100) {
    showSlide(currentSlide - 1);
  } else {
    showSlide(currentSlide);
  }

  sliderImages.classList.remove('dragging');
  autoSlideInterval = startAutoSlide();
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Add click event listeners to gallery buttons
galleryButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    showSlide(index);
    autoSlideInterval = startAutoSlide();
  });
});

// Add click event listeners to image containers
imageContainers.forEach((container, index) => {
  container.addEventListener('click', event => {
    if (!isDragging) {
      clearInterval(autoSlideInterval);
      showSlide(index);
      autoSlideInterval = startAutoSlide();
    }
  });
});

// Optional: Pause auto-sliding when hovering over the slider
sliderImages.addEventListener('mouseenter', () => {
  clearInterval(autoSlideInterval);
});

sliderImages.addEventListener('mouseleave', () => {
  if (!isDragging) {
    autoSlideInterval = startAutoSlide();
  }
});
