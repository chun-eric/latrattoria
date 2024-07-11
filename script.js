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
          item.style.order = setTimeout(
            () => (item.style.display = 'flex'),
            10
          );
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
  document
    .querySelectorAll('.icon-wrapper ion-icon:last-child')
    .forEach(icon => {
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
});
