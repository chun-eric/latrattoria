'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
      // After header is loaded, initialize header functionality
      if (window.initializeHeader) {
        window.initializeHeader();
      }

      // Add the set active navigation class
      setActiveNavigation();

      // Render Menu items
      // this function is globally available and is first loaded from script.js
      if (window.renderMenuItems && window.menuData) {
        window.renderMenuItems(window.menuData.menuItems);
      } else {
        console.error('renderMenuItems or menuData not found');
      }
    })
    .catch(error => console.error('Error loading header:', error));

  // Load the header and then run the navigation script
  function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    console.log('Current page:', currentPage);

    // set active class
    const setActiveClass = nav => {
      const links = nav.getElementsByTagName('a');
      console.log('Navigation links:', links);
      for (let link of links) {
        let linkPage = link.getAttribute('href');

        // remove .html extension
        linkPage = linkPage.replace('.html', '');
        let currentPageName = currentPage.replace('.html', '');

        console.log(`Comparing: ${linkPage} with ${currentPageName}`);

        // compare the link page with the current page
        if (
          linkPage === currentPageName ||
          (currentPageName === '' && linkPage === 'index')
        ) {
          link.classList.add('active');
          console.log(`Added active class to: ${linkPage}`);
        } else {
          link.classList.remove('active');
          console.log(`Removed active class from: ${linkPage}`);
        }
      }
    };

    // set active class for the header navigation
    const headerNav = document.querySelector('header nav');
    if (headerNav) {
      console.log('Setting active class for header navigation');
      setActiveClass(headerNav);
    } else {
      console.log('Header navigation not found');
    }

    // set active class for side bar navigation
    const sidebarNav = document.querySelector('.side-menu nav');
    if (sidebarNav) {
      console.log('Setting active class for sidebar navigation');
      setActiveClass(sidebarNav);
    } else {
      console.log('Sidebar navigation not found');
    }
  }

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});
