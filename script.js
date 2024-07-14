'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Start
  // function to handle hero overlay image transitions
  // select all hero images
  const heroImages = document.querySelectorAll('.intro .background img');

  // set the current image index to 0
  let currentImageIndex = 0;

  function changeHeroImage() {
    // remove active class from current image
    heroImages[currentImageIndex].classList.remove('active');

    // update current image index
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;

    // add active class to the new image
    heroImages[currentImageIndex].classList.add('active');
  }

  // Initialize the changeHeroImage function
  setInterval(changeHeroImage, 10000);
  // End

  // Start
  // Function to handle header navigation and side menu on mobile and tablet

  // select elements
  const hamburger = document.querySelector('.hamburger-menu');
  const closeBtn = document.querySelector('.close-btn');
  const sideMenu = document.querySelector('.side-menu');
  const overlay = document.querySelector('.overlay');
  const headerNav = document.querySelector('header .columns nav');
  const bookBtn = document.querySelector('.book-btn');

  // function to toggle Menu
  function toggleMenu() {
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }
  // End

  /* ---------------------------------- */
  // Event listeners
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
    animateHambuger();
  });

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
    animateClose();
  });

  overlay.addEventListener('click', function (e) {
    toggleMenu();
    animateClose();
  });

  // Prevent clicks on the side menu from closing it
  // sideMenu.addEventListener('click', function(e) {
  //   e.stopPropagation();
  // });

  // Function to handle resize and close side menu on desktop
  function handleResize() {
    if (window.innerWidth > 1200) {
      // remove active class from side menu
      sideMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }

  // Call handleResize on window resize and initial load
  handleResize();
  window.addEventListener('resize', handleResize);
  // End

  // Start
  // Function to animate Hamburger on open
  function animateHambuger() {
    hamburger.classList.add('active');
    hamburger.style.transform = 'rotate(90deg)';
  }

  // Start
  // Function to animate Hamburger on close
  function animateClose() {
    hamburger.classList.remove('active');
    hamburger.style.transform = 'rotate(0deg)';
  }
  // End
  /* ---------------------------------- */

  /* ---------------------------------- */
  // Start
  // function to add staggered animation to the hero intro content
  const content = document.querySelector('.fade-in-content');

  // returns the html collection of all the children of the content element
  const elements = content.children;
  console.log(elements);

  // function to show each element with a delay
  function showElement(index) {
    if (index < elements.length) {
      elements[index].classList.add('show');
      // call the showElement function recursively with a delay
      setTimeout(() => showElement(index + 1), 1000);
    }
  }

  // Run the function and start the animation when the page loads
  showElement(0);

  // Add an Intersection Observer to the content element when in view. Maybe not necessary here.
  // const observer = new IntersectionObserver((entires) => {
  //   entires.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       showElement(0);
  //       observer.unobserve(entry.target);
  //     }
  //   });
  // }, { threshold: 0.1});
  /* the threshold means trigger when 10% of the element is visible */
  // observer.observe(content);
  // End
  /* ---------------------------------- */

  /* ---------------------------------- */
  // Start
  // function to handle scroll down and show the header
  const header = document.querySelector('header');
  // A number value to store to determine when the header should changed to scrolled state
  const scrollThreshold = 60;

  function handleScroll() {
    // check if the window has scrolled past the threshold
    if (window.pageYOffset > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Call the handleScroll function to check the initial scroll position
  handleScroll();

  // Call handleScroll on window scroll
  window.addEventListener('scroll', handleScroll);
  // End
  /* ---------------------------------- */

  /* ---------------------------------- */
  // Start
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
  // End
  /* ---------------------------------- */

  /* ---------------------------------- */
  // Start
  // function to handle Filtering the menu items
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-board');

  // loop through the filter buttons and add click event
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // getting the data-filter value of the clicked button
      const filter = button.getAttribute('data-filter');

      // removing all active state on all filterbuttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // add active class to the clicked button
      button.classList.add('active');

      // Filter menu items
      menuItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hide');
          item.style.order = setTimeout(() => (item.style.display = 'flex'), 5);
        } else {
          item.classList.add('hide');
          setTimeout(() => (item.style.display = 'none'), 10);
        }

        // dynamically adjust the container height
        // setTimeout(() => {
        //   const visibleItems = document.querySelectorAll(
        //     '.menu-board:not(.hide)'
        //   );
        //   const rows = Math.ceil(visibleItems.length / 2);
        //   const itemHeight = visibleItems[0].offsetHeight;
        //   const containerHeight = rows * itemHeight + (rows - 1) * 20;
        //   menuContainer.style.height = `${containerHeight}px`;
        // }, 50);
      });
    });
  });
  // End
  /* ---------------------------------- */

  /* ---------------------------------- */
  // Start
  // function to handle Testimonial Review Slider
  const reviewsGrid = document.querySelector('.reviews-grid');
  const reviewButtons = document.querySelectorAll('.review-button');
  const reviews = document.querySelectorAll('.review');
  let currentIndex = 0;
  let intervalId;

  // function to show the review at given index
  function showReview(index) {
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
    currentIndex = currentIndex + 1 >= reviews.length ? 0 : currentIndex + 1;
    showReview(currentIndex);
  }

  // function to show the previous review
  // function prevReview() {
  //   currentIndex = currentIndex - 1 < 0 ? reviews.length - 1 : currentIndex - 1;
  //   showReview(currentIndex);
  // }

  // function for the autoslide
  function startAutoSlide() {
    intervalId = setInterval(nextReview, 7000);
  }

  // function to stop the autoslide
  function stopAutoSlide() {
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
  // End
  /* ---------------------------------- */

  /* ---------------------------------- */
  // Start
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
    currentPhotoCarouselIndex =
      currentPhotoCarouselIndex + 1 >= images.length
        ? 0
        : currentPhotoCarouselIndex + 1;
    showPhoto(currentPhotoCarouselIndex);
  }

  // function to start carousel autoslide
  function carouselStartAutoSlide() {
    carouselIntervalId = setInterval(nextPhoto, 9000);
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
  // End
  /* ---------------------------------- */

  /* ---------------------------------- */
  // Start
  // function to handle Email Validation
  const emailForm = document.getElementById('email-form');
  const emailInput = document.getElementById('email');
  const termsCheckbox = document.getElementById('termsCb');
  const preloader = document.getElementById('preloader');
  const successMessage = document.getElementById('successMessage');
  const overlayEmailBg = document.getElementById('overlay-email-bg');

  // add submit event listener to the emailForm
  emailForm.addEventListener('submit', function (e) {
    // prevent the default form submission
    e.preventDefault();

    // conditional check for a valid email input and terms checkbox checked
    if (validateEmail(emailInput.value) && termsCheckbox.checked) {
      // show overlay
      showOverlay();
      // show the preloader
      showPreloader();

      // simulate a form submission
      setTimeout(() => {
        // hide the preloader after 2 seconds
        hidePreloader();
      }, 2000);
    } else {
      alert('Please enter a valid email and accept the terms');
    }
  });

  // function to validate email
  function validateEmail(email) {
    // regex for email validation.
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // converts email string to lowercase to ensure case insensitivity
    return emailRegex.test(String(email).toLowerCase());
  }

  // function to show the overlay
  function showOverlay() {
    overlayEmailBg.classList.add('show');
  }

  // function to hide the overlay
  function hideOverlay() {
    overlayEmailBg.classList.remove('show');
  }

  // function to show the preloader
  function showPreloader() {
    preloader.style.display = 'flex';
    setTimeout(() => {
      preloader.classList.add('show');
    }, 10); // wait for 10ms before adding preloader show class
  }

  // function to hide the preloader
  function hidePreloader() {
    preloader.classList.remove('show');
    setTimeout(() => {
      // preloader is hidden after 1 second
      preloader.style.display = 'none';
      // show success message
      showSuccessMessage();
    }, 1000); // wait for preloader to slide up before showing success message
  }

  function showSuccessMessage() {
    // displays a success message for 3 seconds
    successMessage.style.display = 'block';
    // hides the success message and resets the form
    setTimeout(() => {
      successMessage.style.display = 'none';
      hideOverlay();
      emailForm.reset(); // rest form
    }, 3000); // success message stays for 3 seconds
  }
  // End
  /* ---------------------------------- */

  /* ---------------------------------- */
  // Start
  // function to handle chevron down clicks for contact reservation
  // document
  //   .querySelectorAll('.icon-wrapper ion-icon[name="chevron-down"]')
  //   .forEach(icon => {
  //     icon.addEventListener('click', function () {
  //       const previousElement = this.previousElementSibling;

  //       if (previousElement) {
  //         if (previousElement.type === 'date') {
  //           console.log('Date input found', previousElement);
  //           // Trigger the date picker
  //           previousElement.showPicker();

  //         } else if (previousElement.tagName.toLowerCase() === 'select') {
  //           // Show select opti
  //           console.log('Select input found', previousElement);
  //           previousElement.classList.remove('custom-focus');
  //           previousElement.focus();
  //           previousElement.dispatchEvent(
  //             new MouseEvent('mousedown', { bubbles: true, cancelable: true })
  //           );
  //         } else {
  //           console.log('No matching input found');
  //         }
  //       }
  //     });
  //   });

  /* Start */
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

  /* End;*/
});
