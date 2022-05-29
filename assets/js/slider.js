const slider = document.querySelector('.welcome-slider');
const sliderContainer = document.querySelector('.slides');
const sliderNext = document.querySelector('.slider-next');
const sliderPrev = document.querySelector('.slider-prev');

function slide(items, prev, next) {
  const sliderIndicator = document.querySelector('.slider-indicator');
  const sliderControls = document.querySelector('.slider-controls');
  let bullets = sliderControls.getElementsByClassName('slider-bullet');
  let posInitial;
  let slides = items.getElementsByClassName('slide');
  let slidesLength = slides.length;
  let slideSize = items.getElementsByClassName('slide')[0].offsetWidth;
  let firstSlide = slides[0];
  let lastSlide = slides[slidesLength - 1];
  let cloneFirst = firstSlide.cloneNode(true);
  let cloneLast = lastSlide.cloneNode(true);
  let count = 0;
  let allowShift = true;

  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  items.style.left = `-${slideSize}px`;

  prev.addEventListener('click', function () {
    shiftSlide(-1);
  });
  next.addEventListener('click', function () {
    shiftSlide(1);
  });

  
  bullets[0].classList.add('active');

  for (let bul of bullets) {
    bul.addEventListener('click', ChangeSlide, true);
  }

  function ChangeSlide(e) {
    function getBulletNumber(e) {
      let number = e.target.getAttribute('name');
      return number;
    }

    let slideNumber = +(getBulletNumber(e));
    items.style.left = - (slideSize * slideNumber) + 'px';
    count = slideNumber -1;
    countIndicator();
  }

  function countIndicator() {
    let indicatoText = count + 1;
    if (indicatoText === 0 || indicatoText === 6) {
      indicatoText = 1;
    }
    if (count === -1) {
      indicatoText = 5;
    }
    sliderIndicator.textContent = `0${indicatoText} | 05`;

    function colorBullet() {
      for (let bul of bullets) {
        bul.classList.remove('active');
      }
      bullets[indicatoText - 1].classList.add('active');
    }
    colorBullet();
  }

  function mouseSwipe() {
    let startX = 0;
    let startY = 0;
    let distanceX = 0;
    let distanceY = 0;
    let startTime = 0;
    let elapsedTime = 0;
    let alowedTime = 500;
    let threshold = 150;
    let swerve = 100;

    slider.addEventListener('mousedown', function (e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    });

    slider.addEventListener('mouseup', function (e) {
      distanceX = e.pageX - startX;
      distanceY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= alowedTime) {
        if (Math.abs(distanceX) >= threshold && Math.abs(distanceY) <= swerve) {
          if (distanceX > 0) {
            if (allowShift) {
              console.log(distanceX, distanceY);
              shiftSlide(-1);
            }
          } else {
            if (allowShift) {
              console.log(distanceX, distanceY);
              shiftSlide(1);
            }
          }
        }
      }
      e.preventDefault();
    });
  }

  mouseSwipe();

  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        items.style.left = posInitial - slideSize + 'px';
        count++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + 'px';
        count--;
      }
    }
    allowShift = false;
    countIndicator();
  }

  items.addEventListener('transitionend', checkCount, false);

  function checkCount() {
    items.classList.remove('shifting');

    if (count == -1) {
      items.style.left = -(slidesLength * slideSize) + 'px';
      count = slidesLength - 1;
    }

    if (count == slidesLength) {
      items.style.left = -(1 * slideSize) + 'px';
      count = 0;
    }

    allowShift = true;
  }
}
slide(sliderContainer, sliderPrev, sliderNext);
