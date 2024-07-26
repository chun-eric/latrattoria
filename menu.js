'use state';

import { fullMenuData } from './constants.js';

// dom to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const menuBoardContainer = document.querySelector('.menu-board-container');

  // function to render  all the menu Items from constants.js
  function renderMenuItems(items) {
    menuBoardContainer.innerHTML = '';

    if (!menuBoardContainer) {
      console.error('Menu board container not found');
      return;
    }

    items.forEach(item => {
      const menuBoard = document.createElement('div');
      menuBoard.className = 'menu-board';
      menuBoard.setAttribute('data-category', item.category);

      menuBoard.innerHTML = `
            <img src="${item.image}" alt="${item.name}"loading="lazy" />
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
  }

  // function to filter menu items based on category
  function filterMenuItems(filter) {
    const menuItems = document.querySelectorAll('.menu-board');
    menuItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hide');
        item.style.display = 'flex';
      } else {
        item.classList.add('hide');
        item.style.display = 'none';
      }
    });
  }

  // event listener for filter buttons to add active class and filter menuItems
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = button.getAttribute('data-filter');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterMenuItems(filter);
    });
  });

  //Initial Render
  renderMenuItems(fullMenuData.menuItems);
});
