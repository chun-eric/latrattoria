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

  function openMenu() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
    hamburger.classList.add('active');
  }

  function closeMenu() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.classList.remove('active');
  }

  if (hamburger) {
    hamburger.addEventListener('click', openMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close side menu when clicking outside
  document.addEventListener('click', e => {
    if (
      sideMenu.classList.contains('active') &&
      !sideMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Prevent clicks on the side menu from closing it
  if (sideMenu) {
    sideMenu.addEventListener('click', e => {
      e.stopPropagation();
    });
  }

  // Close side menu when a link is clicked
  const sideMenuLinks = document.querySelectorAll('.side-menu nav a');
  sideMenuLinks.forEach(link => {
    link.addEventListener('click', e => {
      if (!link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        closeMenu();
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
