const videoContainer = document.querySelector('.video-section-wrapper');
const playerContainer = document.querySelector('.video-wrapper');
const player = document.querySelector('.player');
const playPauseIco = document.querySelector('.small-play-btn-ico');
const controls = document.querySelector('.video-controls');
const play = document.querySelector('.small-play-btn');
const bigPlayBtnWrapper = document.querySelector('.big-play-btn-wrapper');
const bigPlayBtnImg = document.querySelector('.big-play-btn-ico');
const bigPlayBtn = document.querySelector('.big-play-btn');
const mute = document.querySelector('.mute-btn');
const muteIco = document.querySelector('.mute-btn-ico');
const fullscreenBtn = document.querySelector('.full-screen-btn');
const fullscreenBtnIco = document.querySelector('.fullscreen-btn-ico');
const progressBar = document.querySelector('.progress-bar');
const volumeBar = document.querySelector('.volume-bar');
const formActive = document.querySelector('.form-layout');

player.removeAttribute('controls');
muteIco.setAttribute('src', 'assets/svg/volume-ico.svg');
player.volume = 0.5;

bigPlayBtn.addEventListener('click', playPauseMedia);
play.addEventListener('click', playPauseMedia);
bigPlayBtnWrapper.addEventListener('click', playPauseMedia);
bigPlayBtnImg.addEventListener('click', playPauseMedia);
mute.addEventListener('click', muteVideo);
player.addEventListener('timeupdate', setProgress);
progressBar.addEventListener('change', setProgress);

let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => (mousedown = true));
progressBar.addEventListener('mouseup', () => (mousedown = false));
document.addEventListener('keydown', keyHandle, false);
fullscreenBtn.addEventListener('click', function (e) {
  handleFullscreen();
});

volumeBar.addEventListener('change', setVolme);
volumeBar.addEventListener('click', changeVolume);
volumeBar.addEventListener('mousemove', (e) => mousedown && changeVolume(e));
volumeBar.addEventListener('mousedown', () => (mousedown = true));
volumeBar.addEventListener('mouseup', () => (mousedown = false));

player.addEventListener('ended', (event) => {
  bigPlayBtn.style.opacity = 0.9;
  playPauseIco.setAttribute('src', 'assets/svg/small-play-btn.svg');
});

function playPauseMedia() {
  if (player.paused || player.ended) {
    player.play();
    bigPlayBtn.style.opacity = 0;
    playPauseIco.setAttribute('src', 'assets/svg/pause.svg');
  } else {
    bigPlayBtn.style.opacity = 0.9;
    playPauseIco.setAttribute('src', 'assets/svg/small-play-btn.svg');
    player.pause();
  }
}

function muteVideo() {
  if (player.muted) {
    muteIco.setAttribute('src', 'assets/svg/volume-ico.svg');
    player.muted = false;
    player.volume = 0.5;
  } else {
    muteIco.setAttribute('src', 'assets/svg/mute.svg');
    player.volume = 0;
    player.muted = true;
  }
  setVolme();
}

function setVolme() {
  let barVolume = player.volume * 100;
  volumeBar.value = barVolume;
  volumeBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${barVolume}%, #C4C4C4 ${barVolume}%, #C4C4C4 100%)`;
}

function keyHandle(e) {
  if (!formActive.classList.contains('active')) {
    switch (e.code) {
      case 'Space':
      case 'KeyK':
        e.preventDefault();
        playPauseMedia(e);

        break;
      case 'KeyF':
        handleFullscreen();
        break;
      case 'KeyM':
        muteVideo();
        break;
      case 'ArrowDown':
        keyChangeVolume('down');
        break;
      case 'ArrowUp':
        keyChangeVolume('up');
        break;
      case 'ArrowLeft':
      case 'KeyJ':
        keySkip('backward');
        break;
      case 'ArrowRight':
      case 'KeyL':
        keySkip('forward');
        break;
      case e.shiftKey && 'Comma':
        changePaybackRate('slower');
        break;
      case e.shiftKey && 'Period':
        changePaybackRate('faster');
        break;
    }
  }
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
  progressBar.setAttribute('value', `${Math.floor(scrubTime)}`);
}

function setProgress(e) {
  let progress = Math.floor((this.currentTime / this.duration) * 100) || 0;
  progressBar.value = progress;
  progressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress}%, #C4C4C4 ${progress}%, #C4C4C4 100%)`;
}

function handleFullscreen() {
  if (!!document.webkitIsFullScreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  } else {
    if (playerContainer.requestFullscreen) {
      playerContainer.requestFullscreen();
    } else if (playerContainer.webkitRequestFullScreen) {
      playerContainer.webkitRequestFullScreen();
    }
  }
  updateFullscreenHud();
}

function updateFullscreenHud() {
  if (document.fullscreenElement) {
    fullscreenBtnIco.setAttribute('src', 'assets/svg/full-screen-btn.svg');
  } else if (document.fullscreenElement !== 0) {
    fullscreenBtnIco.setAttribute('src', 'assets/svg/fullscreen-exit.svg');
  }
}

function changeVolume(e) {
  let currentVolume = (e.offsetX / volumeBar.offsetWidth).toFixed(2);
  if (currentVolume > 1) {
    currentVolume = 1;
  } else if (currentVolume <= 0) {
    currentVolume = 0;
    muteVideo();
  }
  if (player.muted && currentVolume > 0.1) {
    muteVideo();
  }
  player.volume = currentVolume;
  setVolme();
}

function keyChangeVolume(direction) {
  if (direction === 'down') {
    try {
      if (player.volume > 0) {
        player.volume -= 0.1;
        setVolme();
      } else if (player.volume === 0.1) {
        muteVideo();
        player.volume = 0;
      }
    } catch {
      if (player.volume <= 0) {
        player.volume = 0;
      }
    }
  } else if (direction === 'up') {
    try {
      if (player.volume < 1) {
        player.volume += 0.1;
        setVolme();
      } else if (player.volume === 0) {
        muteVideo();
        player.volume += 0.1;
      }
    } catch {
      if (player.volume === 1) {
        player.volume = 1;
      }
    }
  }
  setVolme();
}

function changePaybackRate(direction) {
  if (direction === 'slower') {
    try {
      if (player.playbackRate > 0.25) {
        player.playbackRate -= 0.25;
      } else if (player.playbackRate === 0.25) {
        player.pause();
      }
    } catch {
      if (player.playbackRate === 0) {
        player.playbackRate += 0.25;
      }
    }
  } else if (direction === 'faster') {
    try {
      if (player.playbackRate > 0 && player.playbackRate < 2) {
        player.playbackRate += 0.25;
      } else if (player.playbackRate === 2) {
        player.playbackRate = 2;
      }
    } catch {
      if (player.playbackRate < 0 || player.playbackRate > 2) {
        player.playbackRate = 2;
      }
    }
  }
}

function keySkip(direction) {
  if (direction === 'backward') {
    try {
      if (player.currentTime > 0) {
        player.currentTime -= 10;
      }
    } catch {
      if (player.currentTime <= 10) {
        player.currentTime = 0;
      }
    }
  } else if (direction === 'forward') {
    try {
      if (player.currentTime < player.duration) {
        player.currentTime += 10;
      }
    } catch {
      if (player.currentTime >= player.duration) {
        player.currentTime = player.duration;
      }
    }
  }
}

function slide() {
  const player = document.querySelector('.player');
  const slider = document.querySelector('.playlist');
  const sliderWidth = document.querySelector('.playlist').offsetWidth;
  const slideWidth = document.querySelector(
    '.playlist-item-container',
  ).offsetWidth;
  const sliderBullets = document.querySelectorAll('.video-slider-indicator');
  const sliderControl = document.querySelector('.video-slider-controls');
  const slidesAmount = slider.getElementsByTagName('li').length - 1;
  const slidesArray = document.querySelectorAll('.playlist-item-container');
  const slideMargin =
    slidesArray[1].offsetLeft - slidesArray[0].offsetLeft - slideWidth;
  const cloneLast = slidesArray[slidesAmount].cloneNode(true);
  const cloneFirst = slidesArray[0].cloneNode(true);

  slider.append(cloneFirst);
  slider.prepend(cloneLast);

  let counter = 1;
  let slideSize = slider.clientWidth / 3 + 84;
  slider.style.left = -(slideWidth + slideMargin) + 'px';
  let allowShift = true;
  player.setAttribute('poster', `assets/video/poster0.jpg`);
  let posInitial = slider.offsetLeft;

  sliderControl.addEventListener('click', function (e) {
    shiftSlide(e.target.name);
  });

  function shiftSlide(direction) {
    slider.classList.add('shifting');
    console.log('before', counter);
    if (allowShift) {
      if (direction === 'right') {
        slider.style.left =
          posInitial - (slideWidth + slideMargin) * counter + 'px';
        counter++;
        setSource(`assets/video/video${counter - 1}.mp4`);
      } else if (direction === 'left') {
        if (counter >= -1 && counter <= 1) {
          slider.style.left =
            posInitial + (slideWidth + slideMargin) * counter + 'px';
          if (counter === 1) {
            setSource(`assets/video/video${4}.mp4`);
          } else if (counter === 0) {
            setSource(`assets/video/video${3}.mp4`);
          }
          counter--;
        } else {
          slider.style.left = -((slideWidth + slideMargin) * counter) + 'px';
          setSource(`assets/video/video${counter - 1}.mp4`);
          counter--;
        }
        console.log('after', counter, allowShift);
      }
    }

    allowShift = false;
  }

  slider.addEventListener('transitionend', checkCounter);

  function checkCounter() {
    if (counter === -1) {
      slider.classList.remove('shifting');
      counter = 4;
      slider.style.left = -(counter * (slideWidth + slideMargin)) + 'px';
    }
    if (counter === 0) {
      slider.classList.remove('shifting');
      slider.style.left = -(slideWidth + slideMargin) + 'px';
    }

    if (counter > slidesAmount) {
      slider.classList.remove('shifting');
      slider.style.left = 0 + 'px';
      counter = 0;
    }
    allowShift = true;
  }

  for (let bullet of sliderBullets) {
    bullet.addEventListener('click', swapVideo);
  }

  function setSource(str) {
    player.setAttribute('src', str);
    let num = str[str.length - 5];
    player.setAttribute('poster', `assets/video/poster${num}.jpg`);
    counter = +num + 1;
    allowShift = true;
    colorIndicator(num);
  }

  function swapVideo(e) {
    function getVideoSrc(e) {
      let video = e.target.getAttribute('name');
      return `assets/video/${video}.mp4`;
    }
    setSource(getVideoSrc(e));
  }

  let indicator = sliderControl.querySelectorAll('.video-slider-indicator');
  indicator[0].classList.add('active');

  function colorIndicator(num) {
    for (let item of indicator) {
      item.classList.remove('active');
    }
    indicator[num].classList.add('active');
  }
}

slide();
