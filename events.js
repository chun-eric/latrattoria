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

        // Format the time
        const startTime = eventForDay.startTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const endTime = eventForDay.endTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        eventDetailsElement.innerHTML = `
          <div class="event-time">${startTime} - ${endTime}</div>
          <div class="event-description">${eventForDay.description}</div>
        `;
        dayElement.appendChild(eventDetailsElement);

        // Add a class to the calendar day to indicate it has an event
        dayElement.classList.add('has-event');
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

  /*-------------------------------*/
  // function to handle the selecte date from the index.html
  const selectedEventDate = localStorage.getItem('selectedEventDate');
  if (selectedEventDate) {
    highlightCalendarDate(selectedEventDate);
    localStorage.removeItem('selectedEventDate'); // Clear the stored date
  }
});

function highlightCalendarDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();

  // Assuming you have a function to render the calendar for a specific month/year
  renderCalendar(year, month);

  // Find the calendar day element for the specific date and highlight it
  const dayElement = document.querySelector(
    `.calendar-day[data-date="${dateString}"]`
  );
  if (dayElement) {
    dayElement.classList.add('highlighted');
    dayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
