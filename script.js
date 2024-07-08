'use strict';
/* photo caoursel slider function */

// select all buttons and images elements
const buttons = document.querySelectorAll('.carousel-button');
const images = document.querySelectorAll('.images img');
console.log(images);
let currentIndex = 0;

// function to update the active image and button class
function updateCarousel(index) {
  // remove active calss from all buttons and images
  buttons.forEach(button => button.classList.remove('active'));
  images.forEach(img => (img.style.opacity = '0'));

  // add active class to current button and image
  buttons[index].classList.add('active');
  images[index].style.opacity = '1';

  // update current index
  currentIndex = index;
}

// Initialize active image and button
updateCarousel(currentIndex);

// add event listener to all buttons
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // update the active image and button
    updateCarousel(index);
    // Calculate the offset to slide to the target image
  });
});

// Creating function to show the review slider at index 0
let currentReview = 0;

function showReviewCard(index) {
  const reviewCards = document.querySelectorAll('.review');
  console.log(reviewCards);
  const reviewButtons = document.querySelectorAll('.review-button');
  console.log(reviewButtons);
  const reviewsGrid = document.querySelector('.reviews-grid');

  // remove all active classes
  reviewCards[currentReview].classList.remove('active');
  reviewButtons[currentReview].classList.remove('active');

  // grabbing the index and setting to a variable
  currentReview = index;

  // add active class to the current review card and button
  reviewCards[currentReview].classList.add('active');
  reviewButtons[currentReview].classList.add('active');

  // Sliding the views grid to the new position
  const offset = -currentReview * 100; // 100% is the width of the review card and calculates the offset in percentage
  console.log(offset);
  // Move the reviews grid to the new position on X axis
  reviewCards.style.transform = `translateX(${offset}%)`;
}

// Initialize active review card as active
showReviewCard(0);

// Add event listenter to all review buttons
document.querySelectorAll('.review-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    console.log('button clicked');
    showReviewCard(index);
  });
});

// function to handle chevron down click border effect
document.querySelectorAll('.icon-wrapper ion-icon:last-child').forEach(icon => {
  icon.addEventListener('click', function () {
    const inputField = this.previousElementSibling;
    inputField.focus();
    const iconWrapper = this.parentElement;
    iconWrapper.classList.add('select-focused');

    inputField.addEventListener('blur', function () {
      iconWrapper.classList.remove('select-focused');
    });
  });
});

// function to handle photo gallery slider
const sliderImages = document.querySelector('.slider-images');
const galleryButtons = document.querySelectorAll('.gallery-button');
const imageContainers = document.querySelectorAll('.image-container');

let currentSlide = 0;
const totalSlides = imageContainers.length;

function showSlide(index) {
  // if the index is out of bounds, set it to the first or last slide
  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  // offset to slide to the target image
  const offset = -currentSlide * 100;
  sliderImages.style.transform = `translateX(${offset}%)`;

  // update active button
  galleryButtons.forEach((button, i) => {
    button.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startAutoSlide() {
  setInterval(nextSlide, 7000);
}

let autoSlideInterval = startAutoSlide();

// Add click event listeners to gallery buttons
galleryButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    showSlide(index);
    clearInterval(autoSlideInterval);
    autoSlideInterval = startAutoSlide();
  });
});

// Pause auto on mouse enter
sliderImages.addEventListener('mouseenter', () => {
  clearInterval(autoSlideInterval);
});

sliderImages.addEventListener('mouseleave', () => {
  autoSlideInterval = startAutoSlide();
});
