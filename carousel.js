'use strict';
import { imageData } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  const galleryCarouselButtons = document.querySelector(
    '.gallery-carousel-buttons'
  );
  let currentIndex = 0;
  let slidesToShow = 3;

  // Image data (you can replace this with your actual data)

  function createImageElement(imageInfo) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    imageContainer.innerHTML = `
      <img src="${imageInfo.src}" loading="lazy" alt="Instagram image" draggable="false" />
      <div class="image-overlay">
        <div class="instagram-info">
          <i class="fab fa-instagram"></i>
          <span class="username">${imageInfo.username}</span>
        </div>
        <div class="likes-info">
          <i class="fas fa-heart"></i>
          <span class="like-count">${imageInfo.likes}</span>
        </div>
      </div>
    `;

    imageContainer.addEventListener('click', () => {
      console.log('Image clicked:', imageInfo.src);
    });

    return imageContainer;
  }

  function renderCarousel() {
    // Clear existing content
    sliderContainer.innerHTML = '';
    galleryCarouselButtons.innerHTML = '';

    // Create slider-images container
    const sliderImages = document.createElement('div');
    sliderImages.className = 'slider-images';

    // Add images to slider
    imageData.forEach((imageInfo, index) => {
      const imageElement = createImageElement(imageInfo);
      sliderImages.appendChild(imageElement);
    });

    sliderContainer.appendChild(sliderImages);

    // Create and add buttons
    const totalButtons = Math.max(1, imageData.length - slidesToShow + 1);
    for (let i = 0; i < totalButtons; i++) {
      const button = document.createElement('div');
      button.className = 'gallery-button';
      button.addEventListener('click', () => {
        console.log(`Button ${i} clicked`);
        slideToIndex(i);
      });
      galleryCarouselButtons.appendChild(button);
    }

    console.log(
      'Number of buttons created:',
      galleryCarouselButtons.children.length
    );
    console.log('Total images rendered:', sliderImages.children.length);
    console.log('Slider container width:', sliderContainer.offsetWidth);
    console.log('Slider images width:', sliderImages.offsetWidth);

    updateCarousel();
  }

  // function to Update carousel based on currentIndex
  function updateCarousel() {
    const sliderImages = document.querySelector('.slider-images');
    const buttons = document.querySelectorAll('.gallery-button');

    // Calculate the width of a single slide as a percentage
    const slideWidthPercent = 100 / slidesToShow;

    // Calculate the maxiumum translation
    const maxTranslation =
      -(imageData.length - slidesToShow) * slideWidthPercent;

    // Calculate the new translation, ensuring it doesnt go beyond the maximum
    let translateX = -currentIndex * slideWidthPercent;
    translateX = Math.max(maxTranslation, Math.min(0, translateX));

    // Update the transform property of the slider images container
    sliderImages.style.transform = `translateX(${translateX}%)`;
    console.log(`Translating by: ${translateX}%`);

    // Update the active state of the gallery buttons
    buttons.forEach((button, index) => {
      button.classList.toggle('active', index === currentIndex);
    });

    console.log(
      `Current index: ${currentIndex}, Slides to show: ${slidesToShow}`
    );
  }

  // function to slide to a specific index
  function slideToIndex(index) {
    const totalSlides = imageData.length;
    const maxIndex = totalSlides - slidesToShow;

    // Ensure the index is within the bounds
    currentIndex = Math.max(0, Math.min(index, totalSlides - slidesToShow));
    console.log(`Sliding to index: ${currentIndex}`);
    updateCarousel();
  }
  

  function adjustForScreenSize() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 600) {
      slidesToShow = 1;
    } else if (viewportWidth < 900) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }

    document.documentElement.style.setProperty(
      '--slides-to-show',
      slidesToShow
    );

    console.log('Slides to show:', slidesToShow);
    renderCarousel();
  }

  // Initialize
  adjustForScreenSize();

  // Handle window resize
  window.addEventListener('resize', adjustForScreenSize);
});
