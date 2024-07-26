'use strict';

import { calendarEvents } from './constants.js';

document.addEventListener('DOMContentLoaded', function () {
  const calendarGrid = document.querySelector('.calendar-grid');
  const currentMonthElement = document.querySelector('.current-month');
  const prevMonthButton = document.querySelector('.prev-month');
  const nextMonthButton = document.querySelector('.next-month');

  let currentDate = new Date();

  function renderCalendar(year, month) {
    calendarGrid.innerHTML = '';
    currentMonthElement.textContent = new Date(year, month, 1).toLocaleString(
      'default',
      { month: 'long', year: 'numeric' }
    );

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarGrid.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day');

      const dateElement = document.createElement('span');
      dateElement.classList.add('date');
      dateElement.textContent = day;
      dayElement.appendChild(dateElement);

      const eventForDay = calendarEvents.find(
        event =>
          event.date.getFullYear() === year &&
          event.date.getMonth() === month &&
          event.date.getDate() === day
      );

      if (eventForDay) {
        const eventElement = document.createElement('span');
        eventElement.classList.add('event');
        eventElement.textContent = eventForDay.title;
        dayElement.appendChild(eventElement);

        const eventDetailsElement = document.createElement('div');
        eventDetailsElement.classList.add('event-details');
        eventDetailsElement.textContent = eventForDay.description;
        dayElement.appendChild(eventDetailsElement);
      }

      calendarGrid.appendChild(dayElement);
    }
  }

  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

  prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });
});
