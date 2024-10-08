'use strict';

import { wineList } from './constants.js';

document.addEventListener('DOMContentLoaded', function () {
  const wineMenuBoardContainer = document.querySelector(
    '.wine-menu-board-container'
  );

  function renderWineItems(items) {
    if (!wineMenuBoardContainer) {
      console.error('Wine board container not found');
      return;
    }

    wineMenuBoardContainer.innerHTML = '';
    items.forEach((item, index) => {
      const wineBoard = document.createElement('div');
      wineBoard.className = 'wine-menu-board';
      wineBoard.setAttribute('data-category', item.category);

      wineBoard.innerHTML = `
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="wine-description-container">
            <div class="wine-menu-description">
              <p class="wine-name">${item.name}</p>
              <p class="wine-price">${item.price}</p>
            </div>
            <p class="wine-description">${item.description}</p>
          </div>
        `;

      wineMenuBoardContainer.appendChild(wineBoard);

      // staggered fade in effect
      setTimeout(() => {
        wineBoard.classList.add('fade-in');
      }, index * 300);
    });
    lazyLoadImages();
  }

  function lazyLoadImages() {
    const images = document.querySelectorAll('.lazy-image');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-image');
          img.addEventListener('error', handleImageError);
          imageObserver.unobserve(img);
        }
      });
    }, options);

    images.forEach(img => imageObserver.observe(img));
  }

  function handleImageError(event) {
    const img = event.target;
    img.src = 'path/to/fallback-image.jpg'; // Replace with your fallback image path
    img.alt = 'Image not available';
  }

  // Filter Wine Items
  function filterWineItems(filter) {
    let filteredWines;
    if (filter === 'all') {
      filteredWines = wineList.wines;
    } else {
      filteredWines = wineList.wines.filter(wine => wine.category === filter);
    }
    renderWineItems(filteredWines);
  }

  //
  const wineFilterButtons = document.querySelectorAll('.wine-filter-btn');
  wineFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      wineFilterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterWineItems(filter);
    });
  });

  // Initial Render
  renderWineItems(wineList.wines);
});
