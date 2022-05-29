function galleryLoad() {
const pictureContainer = document.querySelector('.inner-gallery-container');
const images = pictureContainer.querySelectorAll('.gallery-img');
const imagesAmount = images.length;

function collectSourses() {
  let array = [];
  for (let image of images) {
    array.push(image.attributes[0].textContent);
  }
  return array;
}

const sourses = collectSourses();

function removeImages() {
  for (let image of images) {
    image.remove();
  }
}

function addImages(array) {
  for (let i = 0; i < imagesAmount; i++) {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = array[i];
    img.alt = `galery${i+1}`;
    pictureContainer.append(img);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

removeImages();
const shuffled = shuffle(sourses);
addImages(shuffled);
}

galleryLoad();

function animateItem() {
  const animatedItems = document.querySelectorAll('.gallery-img');

  if (animatedItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
      for (let i=0; i < animatedItems.length; i++) {
        const animItem = animatedItems[i];
        const itemHeight = animItem.offsetHeight;
        const itemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - itemHeight / animStart;

        if (itemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if((window.scrollY > itemOffset - animItemPoint) && window.scrollY < (itemOffset + itemHeight)) {
          animItem.classList.add('active');
        } else {
          animItem.classList.remove('active');
        }
      }
    }
    function offset(el) {
      const rectangle = el.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {top: rectangle.top + scrollTop};
    }
    animOnScroll();
  }  
}
animateItem();
