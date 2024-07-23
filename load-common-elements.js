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
    });

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});
