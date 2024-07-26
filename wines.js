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
    items.forEach(item => {
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
    });
  }

  function filterWineItems(filter) {
    const wineItems = document.querySelectorAll('.wine-menu-board');
    wineItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hide');
        item.style.display = 'flex';
      } else {
        item.classList.add('hide');
        item.style.display = 'none';
      }
    });
  }

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
