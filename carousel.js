'use strict';
import { imageData } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Carousel DOM loaded');
  // State
  let state = {
    currentIndex: 0,
    slidesToShow: 3,
    isDragging: false,
    startPosition: 0,
    currentTranslate: 0,
    prevTranslate: 0,
  };

  // Elements
  const elements = {
    sliderContainer: document.querySelector('.slider-container'),
    galleryCarouselButtons: document.querySelector('.gallery-carousel-buttons'),
    sliderImages: null, // Will be set in renderCarousel
  };

  // Functions
  const createImageElement = imageInfo => {
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
    imageContainer.addEventListener('click', () =>
      console.log('Image clicked:', imageInfo.src)
    );
    return imageContainer;
  };

  const renderCarousel = () => {
    elements.sliderContainer.innerHTML = '';
    elements.galleryCarouselButtons.innerHTML = '';

    elements.sliderImages = document.createElement('div');
    elements.sliderImages.className = 'slider-images';

    imageData.forEach(imageInfo =>
      elements.sliderImages.appendChild(createImageElement(imageInfo))
    );
    elements.sliderContainer.appendChild(elements.sliderImages);

    const totalButtons = Math.max(1, imageData.length - state.slidesToShow + 1);
    for (let i = 0; i < totalButtons; i++) {
      const button = document.createElement('div');
      button.className = 'gallery-button';
      button.addEventListener('click', () => slideToIndex(i));
      elements.galleryCarouselButtons.appendChild(button);
    }

    updateCarousel();
    addDragListeners();
  };

  const updateCarousel = () => {
    const slideWidthPercent = 100 / state.slidesToShow;
    const maxIndex = imageData.length - state.slidesToShow;
    state.currentIndex = Math.min(Math.max(0, state.currentIndex), maxIndex);
    const translateX = -state.currentIndex * slideWidthPercent;

    elements.sliderImages.style.transform = `translateX(${translateX}%)`;

    document.querySelectorAll('.gallery-button').forEach((button, index) => {
      button.classList.toggle('active', index === state.currentIndex);
    });
  };

  const slideToIndex = index => {
    state.currentIndex = Math.max(
      0,
      Math.min(index, imageData.length - state.slidesToShow)
    );
    updateCarousel();
  };

  const adjustForScreenSize = () => {
    const viewportWidth = window.innerWidth;
    state.slidesToShow = viewportWidth < 600 ? 1 : viewportWidth < 900 ? 2 : 3;
    document.documentElement.style.setProperty(
      '--slides-to-show',
      state.slidesToShow
    );
    renderCarousel();
  };

  // Drag functions
  const dragStart = event => {
    state.isDragging = true;
    state.startPosition = getPositionX(event);
    elements.sliderImages.classList.add('dragging');
  };

  const drag = event => {
    if (state.isDragging) {
      const currentPosition = getPositionX(event);
      state.currentTranslate =
        state.prevTranslate + currentPosition - state.startPosition;
    }
  };

  const dragEnd = () => {
    state.isDragging = false;
    const movedBy = state.currentTranslate - state.prevTranslate;

    if (
      movedBy < -100 &&
      state.currentIndex < imageData.length - state.slidesToShow
    ) {
      state.currentIndex += 1;
    }
    if (movedBy > 100 && state.currentIndex > 0) {
      state.currentIndex -= 1;
    }

    setPositionByIndex();
    elements.sliderImages.classList.remove('dragging');
  };

  const getPositionX = event =>
    event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;

  const setPositionByIndex = () => {
    state.currentTranslate = (state.currentIndex * -100) / state.slidesToShow;
    state.prevTranslate = state.currentTranslate;
    updateCarousel();
  };

  const addDragListeners = () => {
    elements.sliderImages.addEventListener('mousedown', dragStart);
    elements.sliderImages.addEventListener('touchstart', dragStart);
    elements.sliderImages.addEventListener('mouseup', dragEnd);
    elements.sliderImages.addEventListener('touchend', dragEnd);
    elements.sliderImages.addEventListener('mousemove', drag);
    elements.sliderImages.addEventListener('touchmove', drag);
    elements.sliderImages.addEventListener('mouseleave', dragEnd);
  };

  // Initialize
  adjustForScreenSize();
  window.addEventListener('resize', adjustForScreenSize);
});
