function compareImages() {
  const slider = document.querySelector('.img-compare-slider');
  const sliderImg = document.querySelector('.img-compare-slider-img');
  const imgAfter = document.querySelector('.img-after');

  slider.addEventListener('input', handleCoordinates);
  slider.addEventListener('change', handleCoordinates);
  

  function handleCoordinates(e) {
    imgAfter.style.width = (+e.target.value) + 'px';
    sliderImg.style.left = (+e.target.value - 19) + 'px';
  }
}

compareImages();

