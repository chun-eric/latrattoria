'use state';

import { fullMenuData } from './constants.js';

// dom to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  /* ------------------------------------------------- */
  // function to render  all the menu Items from constants.js
  function renderMenuItems(items) {
    // not working
    console.log('renderMenuItems called with:', items);

    const menuBoardContainer = document.querySelector('.menu-board-container');
    console.log('menuBoardContainer:', menuBoardContainer);

    if (!menuBoardContainer) {
      console.error('Menu board container not found');
      return;
    }

    menuBoardContainer.innerHTML = '';

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
      });
    });
  });

  //Initial Render
  renderMenuItems(fullMenuData.menuItems);
});
