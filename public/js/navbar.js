window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 100) {
    console.log('Scrolled more than 100px!');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
});
