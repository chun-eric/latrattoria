'use strict';

function updateSVG() {
  const svg = document.querySelector('.curve');
  const path = document.querySelector('.curve-path');
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Set viewBox
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  let controlPoint1, controlPoint2;

  if (width <= 768) {
    // Less steep curve for smaller screens
    controlPoint1 = `${width * 0.3},${height * 0.6}`;
    controlPoint2 = `${width * 0.7},${height * 0.3}`;
  } else {
    // More pronounced curve for larger screens
    controlPoint1 = `${width * 0.25},${height * 0.7}`;
    controlPoint2 = `${width * 0.75},${height * 0.2}`;
  }

  const startPoint = `0,${height}`;
  const endPoint = `${width},${height * 0.1}`; // Ends near, but not at, the top right

  path.setAttribute(
    'd',
    `M${startPoint} C${controlPoint1} ${controlPoint2} ${endPoint} L${width},${height} Z`
  );

  // fill color
  path.setAttribute('fill', '#fefdfb');
}

window.addEventListener('resize', updateSVG);
updateSVG(); // Call once on load
