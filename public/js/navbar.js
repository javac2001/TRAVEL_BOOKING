const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const barLine = document.getElementById('rotateBar');

document.addEventListener('DOMContentLoaded', function () {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    barLine.classList.toggle('rotate');
  });
});
