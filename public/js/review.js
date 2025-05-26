const ratingSlider = document.getElementById('rating');
    const ratingDisplay = document.getElementById('ratingValue');

    ratingSlider.addEventListener('input', () => {
        ratingDisplay.textContent = ratingSlider.value;
    });