'use strict';

export function initializeSideMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const closeBtn = document.querySelector('.close-btn');
  const sideMenu = document.querySelector('.side-menu');
  const overlay = document.querySelector('.overlay');

  function toggleMenu() {
    console.log('Toggle menu called');
    const isActive = sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    if (isActive) {
      animateHamburger();
    } else {
      animateClose();
    }
  }

  // function to animate Hamburger on open
  function animateHamburger() {
    console.log('animateHamburger called');
    hamburger.classList.add('active');
    hamburger.style.transform = 'rotate(90deg)';
  }

  // function to animate Hamburger on close
  function animateClose() {
    console.log('animateClose called');
    hamburger.classList.remove('active');
    hamburger.style.transform = 'rotate(0deg)';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      console.log('Hamburger clicked');
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      console.log('Close button clicked');
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      console.log('Overlay clicked');
      toggleMenu();
    });
  }

  // Function to handle resize and close side menu on desktop
  function handleResize() {
    if (window.innerWidth > 1200) {
      sideMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      animateClose(); // Ensure hamburger is in closed state
    }
  }

  // Call handleResize on window resize and initial load
  window.addEventListener('resize', handleResize);
  handleResize();
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function () {
  // Wait for the header to be loaded before initializing the side menu
  const headerLoadCheckInterval = setInterval(() => {
    if (document.querySelector('.hamburger-menu')) {
      clearInterval(headerLoadCheckInterval);
      initializeSideMenu();
    }
  }, 100);
});
