'use strict';
console.log('Script file loaded');

import { menuData } from './constants.js';
console.log(menuData);

// Make menuData global
window.menuData = menuData;

// Show preloader immediately
document.getElementById('preloader').style.display = 'flex';

// Global functions

function renderMenuItems(items) {
  const menuBoardContainer = document.querySelector('.menu-board-container');
  if (!menuBoardContainer) {
    console.error('Menu board container not found');
    return;
  }

  console.log('Rendering menu items');
  menuBoardContainer.innerHTML = '';

  items.forEach(item => {
    const menuBoard = document.createElement('div');
    menuBoard.className = 'menu-board';
    menuBoard.setAttribute('data-category', item.category);

    menuBoard.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="description-container">
        <div class="menu-description">
          <p class="item-name">${item.name}</p>
          <p class="item-price">${item.price}</p>
        </div>
        <p class="item-description">${item.description}</p>
      </div>
    `;

    menuBoardContainer.appendChild(menuBoard);
  });

  return document.querySelectorAll('.menu-board');
}

function initPhotoCarousel() {
  const images = document.querySelectorAll(
    '.photo-carousel-container .images img'
  );
  const photoCarouselButtons = document.querySelectorAll('.carousel-button');
  const carousel = document.querySelector('.photo-carousel');

  if (images.length === 0 || !carousel) {
    console.error('Photo carousel elements not found');
    return;
  }

  let currentPhotoCarouselIndex = 0;
  let carouselIntervalId;

  function showPhoto(index) {
    console.log('showPhoto called with index:', index);
    images.forEach((image, i) => {
      image.style.opacity = i === index ? '1' : '0';
    });

    photoCarouselButtons.forEach((button, i) => {
      i === index
        ? button.classList.toggle('active', i === index)
        : button.classList.remove('active');
    });
  }

  function nextPhoto() {
    console.log('nextPhoto called');
    currentPhotoCarouselIndex = (currentPhotoCarouselIndex + 1) % images.length;
    showPhoto(currentPhotoCarouselIndex);
  }

  function carouselStartAutoSlide() {
    carouselIntervalId = setInterval(nextPhoto, 6000);
  }

  function carouselStopAutoSlide() {
    clearInterval(carouselIntervalId);
  }

  photoCarouselButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      currentPhotoCarouselIndex = index;
      showPhoto(index);
      carouselStopAutoSlide();
      carouselStartAutoSlide();
    });
  });

  carousel.addEventListener('mouseover', carouselStopAutoSlide);
  carousel.addEventListener('mouseout', carouselStartAutoSlide);

  carouselStartAutoSlide();
}

function initTestimonialReview() {
  const reviewsGrid = document.querySelector('.reviews-grid');
  const reviewButtons = document.querySelectorAll('.review-button');
  const reviews = document.querySelectorAll('.review');

  if (!reviewsGrid || reviews.length === 0) {
    console.error('Testimonial review elements not found');
    return;
  }

  let currentIndex = 0;
  let intervalId;

  function showReview(index) {
    console.log('showReview called with index:', index);
    reviewsGrid.style.transform = `translateX(-${index * 100}%)`;
    reviewButtons.forEach((button, i) => {
      button.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function nextReview() {
    console.log('nextReview called');
    currentIndex = (currentIndex + 1) % reviews.length;
    showReview(currentIndex);
  }

  function startAutoSlide() {
    console.log('startAutoSlide called');
    intervalId = setInterval(nextReview, 6000);
  }

  function stopAutoSlide() {
    console.log('stopAutoSlide called');
    clearInterval(intervalId);
  }

  reviewButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      stopAutoSlide();
      showReview(index);
      startAutoSlide();
    });
  });

  reviewsGrid.addEventListener('mouseover', stopAutoSlide);
  reviewsGrid.addEventListener('mouseout', startAutoSlide);

  startAutoSlide();
}

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const rootElement = document.documentElement;

function handleScroll() {
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  const scrollFraction = rootElement.scrollTop / scrollTotal;
  if (scrollFraction > 0.05) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', scrollToTop);
  document.addEventListener('scroll', handleScroll);
} else {
  console.error('Scroll to top button not found');
}

// Main initialization function
function initializeAllComponents() {
  console.log('Initializing all components');

  handleScroll();
  console.log('Scroll to top function initialized');

  if (window.menuData && window.menuData.menuItems) {
    renderMenuItems(window.menuData.menuItems);
  } else {
    console.error('Menu data not found');
  }

  initPhotoCarousel();
  initTestimonialReview();

  // Your existing code for other initializations...
  // (e.g., smooth scrolling, email validation, form validation, etc.)

  /* ------------------------------------------------- */
  // function to filter menu items
  function filterMenuItems(filter) {
    const filteredItems =
      filter === 'all'
        ? menuData.menuItems
        : menuData.menuItems.filter(item => item.category === filter);

    const menuItems = renderMenuItems(filteredItems);

    menuItems.forEach(item => {
      item.style.display = 'flex';
      item.classList.remove('hide');
    });
  }

  // Set up filter button event listeners
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      filterMenuItems(filter);
    });
  });

  // function to handle Email Validation
  const emailForm = document.getElementById('email-form');
  const emailInput = document.getElementById('email');
  const termsCheckbox = document.getElementById('termsCb');
  const preloader = document.getElementById('preloader');
  const successMessage = document.getElementById('successMessage');
  const overlayEmailBg = document.getElementById('overlay-email-bg');
  const errorMessage = document.getElementById('errorMessage');

  // Submit event listener
  emailForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Form submitted');

    if (validateEmail(emailInput.value) && termsCheckbox.checked) {
      // show preloader
      showPreloader();

      // Simulate form submission (replace with actual submission logic)
      setTimeout(() => {
        hidePreloader();
        showSuccessMessage();

        // Reset form and URL after a delay
        setTimeout(() => {
          hideOverlay();
          emailForm.reset();
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }, 3000);
      }, 2000);
    } else {
      showErrorMessage('Please enter a valid email and accept the terms');
    }
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function hideOverlay() {
    overlayEmailBg.classList.remove('show');
  }

  function showPreloader() {
    preloader.style.display = 'flex';
    overlayEmailBg.style.display = 'flex';
    setTimeout(() => {
      preloader.classList.add('show');
      overlayEmailBg.classList.add('show');
    }, 50);
  }

  function hidePreloader() {
    preloader.classList.remove('show');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 700);
  }

  function hideOverlay() {
    overlayEmailBg.classList.remove('show');
    setTimeout(() => {
      overlayEmailBg.style.display = 'none';
    }, 700);
  }

  function showSuccessMessage() {
    successMessage.style.display = 'block';
    successMessage.classList.add('show');
  }

  function hideSuccessMessage() {
    successMessage.classList.remove('show');
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 500);
  }

  function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000);
  }

  /* ------------------------------------------------- */
  // function for chevron down click for contact reservation on the date picker
  const iconWrappers = document.querySelectorAll('.icon-wrapper');
  let currentlyActive = null;

  function highlightInput(input) {
    if (currentlyActive && currentlyActive !== input) {
      currentlyActive.style.borderColor = '';
    }
    input.style.borderColor = 'hsl(38, 61%, 73%)';
    currentlyActive = input;
  }

  iconWrappers.forEach(wrapper => {
    const input = wrapper.querySelector('select, input[type="date"]');

    input.addEventListener('focus', function () {
      highlightInput(this);
    });

    if (input.type === 'date') {
      // Create a div to act as the custom dropdown arrow for date input
      const dateArrow = document.createElement('div');
      dateArrow.className = 'date-arrow';
      wrapper.appendChild(dateArrow);

      dateArrow.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        input.showPicker();
        highlightInput(input);
      });
    }

    if (input.tagName.toLowerCase() === 'select') {
      input.addEventListener('change', function () {
        setTimeout(() => this.blur(), 0);
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (currentlyActive && !e.target.closest('.icon-wrapper')) {
      currentlyActive.style.borderColor = '';
      currentlyActive = null;
    }
  });

  // function to handle form validation for reservation form

  const form = document.getElementById('reservationForm');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const personSelect = document.getElementById('person-select');
  const dateInput = document.getElementById('date-input');
  const timeSelect = document.getElementById('time-select');
  const messageTextarea = document.getElementById('message');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) {
        // If the form is valid, you can submit it
        console.log('Form is valid. Submitting...');
        // Uncomment the next line to actually submit the form
        form.submit();
      }
    });
  }

  function validateForm() {
    let isValid = true;

    // Name validation
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Phone validation (simple format check)
    const phoneRegex = /^\+?\d{10,14}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      showError(phoneInput, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    // Person select validation
    if (personSelect.value === '') {
      showError(personSelect, 'Please select the number of people');
      isValid = false;
    } else {
      clearError(personSelect);
    }

    // Date validation
    if (dateInput.value === '') {
      showError(dateInput, 'Please select a date');
      isValid = false;
    } else {
      const selectedDate = new Date(dateInput.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        showError(dateInput, 'Please select a future date');
        isValid = false;
      } else {
        clearError(dateInput);
      }
    }

    // Time validation
    if (timeSelect.value === '') {
      showError(timeSelect, 'Please select a time');
      isValid = false;
    } else {
      clearError(timeSelect);
    }

    return isValid;
  }

  function showError(input, message) {
    const formControl = input.parentElement;
    const errorElement =
      formControl.querySelector('.error-message') ||
      document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!formControl.querySelector('.error-message')) {
      formControl.appendChild(errorElement);
    }
    input.classList.add('error');
  }

  function clearError(input) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error-message');
    if (errorElement) {
      formControl.removeChild(errorElement);
    }
    input.classList.remove('error');
  }

  /* ------------------------------------------------- */
  // function to handle the click for event details
  // const eventDetails = document.querySelectorAll('.event-item.details a');

  eventLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const eventDate = this.getAttribute('data-event-date');
      localStorage.setItem('eventDate', eventDate);
      window.location.href = this.href;
    });
  });
}

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', initializeAllComponents);

// Window Load Event Listener
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'flex';
  preloader.style.opacity = 0;
  preloader.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  // Hide the preloader
  setTimeout(() => {
    preloader.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  }, 3000);

  // Delay the hero animation start
  setTimeout(() => {
    const content = document.querySelector('.fade-in-content');
    if (content) {
      const elements = Array.from(content.children);
      elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        setTimeout(() => {
          element.classList.add('animate');
        }, index * 100);
      });
    }
  }, 500);
});

// Make certain functions globally available
window.renderMenuItems = renderMenuItems;
window.initializeHeader = initializeHeader;
