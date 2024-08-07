'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Load header (including side menu)
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      // Add active class to current page link
      const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll(
        '#main-header nav a, .side-menu nav a'
      );
      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
        }
      });

      // Initialize side menu functionality
      initializeSideMenu();

      // Add home page class to body if on index.html
      if (currentPage === 'index.html' || currentPage === '') {
        document.body.classList.add('home-page');
        initalizeHeaderScroll();
      }
    });

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});

// Initialize side menu
function initializeSideMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const sideMenu = document.querySelector('.side-menu');
  const closeBtn = document.querySelector('.close-btn');
  const overlay = document.querySelector('.overlay');

  function toggleMenu() {
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    hamburger.classList.toggle('active');
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }

  // Close side menu when a link is clicked
  const sideMenuLinks = document.querySelectorAll('.side-menu nav a');
  sideMenuLinks.forEach(link => {
    link.addEventListener('click', e => {
      if (!link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        toggleMenu();
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      } else {
        toggleMenu();
      }
    });
  });
}

// Initialize header scroll
function initalizeHeaderScroll() {
  const header = document.querySelector('header');
  const scrollThreshold = window.innerHeight * 0.1; /* 5% of viewport height */

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}
