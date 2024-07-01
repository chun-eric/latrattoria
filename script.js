'use strict';
/* photo caoursel slider function */
document.addEventListener('DOMContentLoaded', function () {
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
  reviewButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log('button clicked');
      showReviewCard(index);
    });
  });
});
