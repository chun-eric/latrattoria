'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  const galleryCarouselButtons = document.querySelector(
    '.gallery-carousel-buttons'
  );
  let currentIndex = 0;
  let slidesToShow = 3;

  // Image data (you can replace this with your actual data)
  const imageData = [
    {
      src: './images/gallery/insta-1.jpg',
      username: '@wanderlust_diaries',
      likes: '22.5k',
    },
    {
      src: './images/gallery/insta-2.jpg',
      username: '@artsy_visions',
      likes: '12.0k',
    },
    {
      src: './images/gallery/insta-3.jpg',
      username: '@foodie_journey',
      likes: '23.9k',
    },
    {
      src: './images/gallery/insta-4.jpg',
      username: '@style_maven',
      likes: '42.1k',
    },
    {
      src: './images/gallery/insta-5.jpg',
      username: '@food_geek',
      likes: '2.1k',
    },
    {
      src: './images/gallery/insta-6.jpg',
      username: '@foodie_bun',
      likes: '6.5k',
    },
    {
      src: './images/gallery/insta-7.jpg',
      username: '@jane_paradise',
      likes: '4.5k',
    },
    {
      src: './images/gallery/insta-8.jpg',
      username: '@crazy_88',
      likes: '32.7k',
    },
  ];

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
    for (let i = 0; i < imageData.length - slidesToShow + 1; i++) {
      const button = document.createElement('div');
      button.className = 'gallery-button';
      button.addEventListener('click', () => slideToIndex(i));
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

  function updateCarousel() {
    const sliderImages = document.querySelector('.slider-images');
    const buttons = document.querySelectorAll('.gallery-button');
    const slideWidth = 100 / slidesToShow;

    sliderImages.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    buttons.forEach((button, index) => {
      button.classList.toggle('active', index === currentIndex);
    });

    console.log('Current index:', currentIndex);
    console.log('Transform applied:', sliderImages.style.transform);
  }

  function slideToIndex(index) {
    currentIndex = Math.max(
      0,
      Math.min(index, imageData.length - slidesToShow)
    );
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
