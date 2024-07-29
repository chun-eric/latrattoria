'use strict';
console.log('Script file loaded');

import { menuData } from './constants.js';
console.log(menuData);

// Show preloader immediately
document.getElementById('preloader').style.display = 'flex';

// window loading the preloader
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'flex';
  preloader.style.opacity = 0;
  preloader.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  this.setTimeout(() => {
    preloader.style.transform = 'translateY(-100%)';

    this.setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  }, 3000);
});

// dom to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Fully loaded in script.js');

  // function to initialize the header
  function initializeHeader() {
    console.log('Initializing header');

    const header = document.querySelector('header');
    if (!header) {
      console.error('Header element not found');
      return;
    }

    const body = document.body;
    const isHomePage =
      window.location.pathname === '/' ||
      window.location.pathname.endsWith('index.html');

    if (isHomePage) {
      body.classList.add('home-page');
    }

    function handleScroll() {
      // A value to determine when header should change to scrolled state
      const scrollThreshold = 60;
      console.log('Scrolled: ', window.pageYOffset);
      console.log('Is home page: ', isHomePage);
      // function to handle scroll down and show the header
      // check if the window has scrolled past the threshold
      if (isHomePage && window.pageYOffset > scrollThreshold) {
        console.log('adding scrolled class');
        header.classList.add('scrolled');
      } else if (isHomePage) {
        console.log('removing scrolled class');
        header.classList.remove('scrolled');
      }
    }

    // Call handleScroll on window scroll
    window.addEventListener('scroll', handleScroll);
    // Call the handleScroll function to check the initial scroll position
    handleScroll();
  }
  // Make initializeHeader available Globally
  window.initializeHeader = initializeHeader;

  /* ------------------------------------------------- */
  // function to handle the active state of the navigation links

  /* ------------------------------------------------- */
  // function to handle hero overlay image transitions
  // select all hero images
  const heroImages = document.querySelectorAll('.intro .background img');
  // set the current image index to 0
  let currentImageIndex = 0;

  function changeHeroImage() {
    console.log('Changing hero image');

    // remove active class from current image
    heroImages[currentImageIndex].classList.remove('active');

    // update current image index
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;

    // add active class to the new image
    heroImages[currentImageIndex].classList.add('active');
  }
  // Initialize the changeHeroImage function
  setInterval(changeHeroImage, 10000);

  // function to add staggered animation to the hero intro content
  const content = document.querySelector('.fade-in-content');
  // returns the html collection of all the children of the content element
  const elements = content.children;
  console.log(elements);

  // function to show each element with a delay
  function showElement(index) {
    console.log('showElement called with index:', index);
    if (index < elements.length) {
      elements[index].classList.add('show');
      // call the showElement function recursively with a delay
      setTimeout(() => showElement(index + 1), 1000);
    }
  }
  // Run the function and start the animation when the page loads
  showElement(0);

  /* ------------------------------------------------- */
  // function to handle smooth scrolling to the reservation form when clicking the book button
  const bookButtons = document.querySelectorAll('.book-btn a');

  // adding click event listener to all book buttons
  bookButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      // prevents the default navigation to the url link
      e.preventDefault();

      // getting the href attribute of the button aka the #contact-section
      const targetId = this.getAttribute('href');
      console.log(targetId);

      // our target section element which is the #contact-section
      const targetSection = document.querySelector(targetId);

      // check if the target section exists
      // then scroll to the target section smoothly
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });

  /* ------------------------------------------------- */
  // function to render  all the menu Items from constants.js
  function renderMenuItems(items) {
    const menuBoardContainer = document.querySelector('.menu-board-container');
    if (!menuBoardContainer) {
      console.error('Menu board container not found');
      return;
    }

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

  //Initial Render
  renderMenuItems(menuData.menuItems);

  /* ------------------------------------------------- */
  // function to handle Testimonial Review Slider
  const reviewsGrid = document.querySelector('.reviews-grid');
  const reviewButtons = document.querySelectorAll('.review-button');
  const reviews = document.querySelectorAll('.review');
  let currentIndex = 0;
  let intervalId;

  // function to show the review at given index
  function showReview(index) {
    // not working
    console.log('showReview called with index:', index);
    // move the reviewsGrid to show the review at the given index on the x axis
    reviewsGrid.style.transform = `translateX(-${index * 100}%)`;

    // loop through the reviewButtons and add the active class to the button at the given
    // index and remove the active class from the rest
    reviewButtons.forEach((button, i) => {
      button.classList.toggle('active', i === index);
    });

    // update the currentIndex to the given index
    currentIndex = index;
  }

  // function to show the next review
  function nextReview() {
    // not working
    console.log('nextReview called');

    currentIndex = currentIndex + 1 >= reviews.length ? 0 : currentIndex + 1;
    showReview(currentIndex);
  }

  // function for the autoslide
  function startAutoSlide() {
    // not working
    console.log('startAutoSlide called');
    intervalId = setInterval(nextReview, 6000);
  }

  // function to stop the autoslide
  function stopAutoSlide() {
    // not working
    console.log('stopAutoSlide called');
    clearInterval(intervalId);
  }

  // Add click event listener to the review buttons
  reviewButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // stop the autoslide
      stopAutoSlide();
      // show the review at the clicked button index
      showReview(index);
      // start the autoslide
      startAutoSlide();
    });
  });

  // start the autoslide when the page loads
  startAutoSlide();

  // Pause autoslide on hover
  reviewsGrid.addEventListener('mouseover', stopAutoSlide);
  reviewsGrid.addEventListener('mouseout', startAutoSlide);

  // function to handle Photo Carousel Slider
  const images = document.querySelectorAll(
    '.photo-carousel-container .images img'
  );
  const photoCarouselButtons = document.querySelectorAll('.carousel-button');
  const carousel = document.querySelector('.photo-carousel');
  let currentPhotoCarouselIndex = 0;
  let carouselIntervalId;

  // function to show the photo at given index
  function showPhoto(index) {
    // not working
    console.log('showPhoto called with index:', index);

    // loop through the images and set the opacity of the image at the given index to 1
    images.forEach((image, i) => {
      image.style.opacity = i === index ? '1' : '0';
    });

    // loop through the photoCarouselButtons and toggle active class to the button at the given index
    photoCarouselButtons.forEach((button, i) => {
      i === index
        ? button.classList.toggle('active', i === index)
        : button.classList.remove('active');
    });
  }

  // function to show the next photo
  function nextPhoto() {
    // not working
    console.log('nextPhoto called');

    currentPhotoCarouselIndex =
      currentPhotoCarouselIndex + 1 >= images.length
        ? 0
        : currentPhotoCarouselIndex + 1;
    showPhoto(currentPhotoCarouselIndex);
  }

  // function to start carousel autoslide
  function carouselStartAutoSlide() {
    carouselIntervalId = setInterval(nextPhoto, 7000);
  }

  // function to stop carousel autoslide
  function carouselStopAutoSlide() {
    clearInterval(carouselIntervalId);
  }

  // Add click event listener to the photoCarouselButtons
  photoCarouselButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // update the currentPhotoCarouselIndex to the clicked button index
      currentPhotoCarouselIndex = index;

      // show the photo at the clicked button index
      showPhoto(index);

      // stop the autoslide
      carouselStopAutoSlide();

      // start the autoslide after manual intervention
      carouselStartAutoSlide();
    });
  });

  // start the carousel autoslide
  carouselStartAutoSlide();

  // Pause autoslide on hover
  carousel.addEventListener('mouseover', carouselStopAutoSlide);
  carousel.addEventListener('mouseout', carouselStartAutoSlide);

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
  const eventDetails = document.querySelectorAll('.event-item.details a');

  eventLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const eventDate = this.getAttribute('data-event-date');
      localStorage.setItem('eventDate', eventDate);
      window.location.href = this.href;
    });
  });

  /* --------------------------------------------------- */
  // function to handle active state Nav links
  
});
