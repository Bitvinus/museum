function showForm() {
  const form = document.querySelector('.form-layout');
  const showBtn = document.querySelector('.submit-btn');
  const cancelBtn = document.querySelector('.cancel-form');
  const overlay = document.querySelector('.form-layout');

  showBtn.addEventListener('click', toggleForm);
  cancelBtn.addEventListener('click', toggleForm);
  overlay.addEventListener('click', handleForm);

  function toggleForm() {
    form.classList.toggle('active');
  }

  function handleForm(e) {
    if (e.target.classList.value === 'form-layout active') {
      toggleForm();
    }
  }
}

showForm();

function showMenu() {
  const menu = document.querySelector('.header-nav');
  const menuBtn = document.querySelector('.burger');
  const welcomeText = document.querySelector('.welcome-text-wrapper');
  const headerWrapper = document.querySelector('.header-wrapper');
  const welcomeWrapper = document.querySelector('.welcome-wrapper');

  menuBtn.addEventListener('click', toggleMenu);

  function toggleMenu(e) {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    welcomeText.classList.toggle('active');
    headerWrapper.classList.toggle('active');
  }
}

showMenu();

const onTopBot = document.querySelector('.on-top-bot');
const onTop = document.querySelector('.on-top-img');
const onBot = document.querySelector('.on-bot-img');

onTop.addEventListener('click', onTopScroll);
onBot.addEventListener('click', onBotScroll);

function onTopScroll() {
  window.scrollTo(scrollX, 0);
}

function onBotScroll() {
  window.scrollTo(scrollX, document.body.scrollHeight);
}

window.addEventListener('scroll', function () {
  let height = document.documentElement.clientHeight || 1100;
  if (scrollY < height || scrollY < document.body.scrollHeight - height) {
    onTopBot.classList.add('active');
  } else if (
    scrollY >
      document.body.scrollHeight -
        document.documentElement.clientHeight * 1.5 ||
    scrollY === 0
  ) {
    onTopBot.classList.remove('active');
  }
});
