const buyTickets = document.getElementById('buy-tickets');
const chooseType = document.getElementsByName('type');
const permanentType = document.getElementById('permanent');
const temporaryType = document.getElementById('temporary');
const combinedType = document.getElementById('combined');
const quatitys = document.querySelectorAll('.quantity');
const basicQty = quatitys[0].querySelector('.number');
const seniorQty = quatitys[1].querySelector('.number');
const totalText = document.querySelector('.tickets-total-qty');
const prices = { permanent: 20, temporary: 25, combined: 40 };
const typeNumbers = { permanent: 1, temporary: 2, combined: 3 };
let myStorage = window.localStorage;
const minusBtns = document.querySelectorAll('.minus-btn');
const plusBtns = document.querySelectorAll('.plus-btn');
const submitBtn = document.querySelector('.submit-btn');

for (let type of chooseType) {
  type.addEventListener('input', calculateTotal);
  type.addEventListener('click', calculateTotal);
}
for (let qty of quatitys) {
  qty.addEventListener('change', calculateTotal);
}

for (let minusBtn of minusBtns) {
  minusBtn.addEventListener('click', calculateTotal);
}

for (let plusBtn of plusBtns) {
  plusBtn.addEventListener('click', calculateTotal);
}


function checkType() {
  let type;
  if (permanentType.checked) {
    type = permanentType.value;
  } else if (temporaryType.checked) {
    type = temporaryType.value;
  } else {
    type = combinedType.value;
  }
  return type;
}

function getQty() {
  let result = {
    basicQuantity: 0,
    seniorQuantity: 0
  }
  result.basicQuantity = basicQty.value;
  result.seniorQuantity = seniorQty.value;
  return result;
}

function calculateTotal() {
  type = checkType();
  qty = getQty();
  let price = +prices[myStorage.getItem('ticketType')];
  let totalAmount = 0;
  totalAmount = +qty.basicQuantity * price +  +qty.seniorQuantity * price/2;
  totalText.textContent = totalAmount;
  function updateMyStorage(){
    myStorage.setItem('ticketType', type);
    myStorage.setItem('basicQuantity', basicQty.value);
    myStorage.setItem('seniorQuantity', seniorQty.value);
    myStorage.setItem('totalAmount', totalAmount);
  }
  updateMyStorage();
}


function updateFromStorage() {
  let type = myStorage.getItem('ticketType');
  if (type === 'permanent') {
    permanentType.checked = true;
  } else if (type === 'temporary') {
     temporaryType.checked = true;
  } else {
    combinedType.checked = true;
  }

  totalText.textContent =  myStorage.getItem('totalAmount') || 30;
  basicQty.value = myStorage.getItem('basicQuantity') || 1;
  seniorQty.value = myStorage.getItem('seniorQuantity')|| 1;
}
updateFromStorage();
window.addEventListener('load', updateFromStorage);

//form calculator
const formType = document.getElementById('ticket-type');
const formOverviewType = document.querySelector('.overview-type')
const typeText = { permanent: 'Permanent exhibition', temporary: 'Temporary exhibition', combined: 'Combined Admission' }
const qtyWrapper = document.querySelector('.form-qty-wrapper');
const formQtys = qtyWrapper.querySelectorAll('.number');
const formQtyBtns = qtyWrapper.querySelectorAll('button');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const telInput = document.getElementById('tel');
const form = document.querySelector('.form-book-tickets');

const formOvrviewDate = document.querySelector('.overview-date');
const formOvrviewTime = document.querySelector('.overview-time');
const overview = document.querySelector('.overview-amount-wrapper');
const formOverviewQtys = overview.querySelectorAll('.overview-amount-qty');
const formOverviewBasicText = overview.querySelector('.overview-amount-text-basic');
const formOverviewSeniorText = overview.querySelector('.overview-amount-text-senior');
const formOverviewBasicAmount = overview.querySelector('.overview-basic-qty');
const formOverviewSeniorAmount = overview.querySelector('.overview-senior-qty');
const formOverviewTotalAmount = overview.querySelector('.overview-total-number');

const formDate = document.getElementById('date');
const formTime = document.getElementById('time');

formDate.addEventListener('change', updateDate);

function updateDate() {
  formDate.classList.add('selected');
  let dateTicket = new Date(this.value).toLocaleDateString('en-US', { day: 'numeric', month: 'long', weekday: 'long'});
  formOvrviewDate.textContent = dateTicket;
  myStorage.setItem('dateTicket', this.value);
  myStorage.setItem('ticketDate', dateTicket);
}

formType.addEventListener('change', storeType);

function storeType() {
  let typeNumber = formType.options.selectedIndex;
  let type;
  if (typeNumber === 1) {
    type = 'permanent';
  } else if(typeNumber === 2) {
    type = 'temporary';
  } else {
    type = 'combined';
  }
  myStorage.setItem('ticketType', type);
  updateFormFromStorage();
  formCalculateTotal();
}

for (let btn of formQtyBtns) {
  btn.addEventListener('click', changeFormQty);
  btn.addEventListener('click', formCalculateTotal);
}

function changeFormQty() {
   let result = {
    basicQuantity: 0,
    seniorQuantity: 0
  }
  result.basicQuantity = formQtys[0].value;
  result.seniorQuantity = formQtys[1].value;
  return result;
}

function formCalculateTotal() {
  type = myStorage.getItem('ticketType');
  qty = changeFormQty();
  let price = +prices[myStorage.getItem('ticketType')];
  let totalAmount = 0;
  let basciAmount = +qty.basicQuantity * price;
  formOverviewQtys[0].textContent = +qty.basicQuantity;
  formOverviewBasicText.textContent = `Basic (${price} €)`;
  formOverviewBasicAmount.textContent = `${basciAmount} €`
  let seniorAmount = +qty.seniorQuantity * price/2;
  formOverviewQtys[1].textContent = +qty.seniorQuantity;
  formOverviewSeniorText.textContent = `Senior (${price/2} €)`;
  formOverviewSeniorAmount.textContent = `${seniorAmount} €`
  totalAmount = basciAmount +  seniorAmount;
  formOverviewTotalAmount.textContent = `${basciAmount +  seniorAmount} €`;
  function updateMyStorage(){
    myStorage.setItem('ticketType', type);
    myStorage.setItem('basicQuantity', qty.basicQuantity);
    myStorage.setItem('seniorQuantity', qty.seniorQuantity);
    myStorage.setItem('totalAmount', totalAmount);
    myStorage.setItem('totalAmountText', `${basciAmount +  seniorAmount} €`);
    myStorage.setItem('basicPrice', `Basic (${price} €)`);
    myStorage.setItem('seniorPrice', `Senior (${price/2} €)`);
    myStorage.setItem('basicAmount', `${basciAmount} €`);
    myStorage.setItem('seniorAmount', `${seniorAmount} €`);
  }
  updateMyStorage();
}

submitBtn.addEventListener('click', updateFormFromStorage);
submitBtn.addEventListener('click', formCalculateTotal);

function updateFormFromStorage() {
  formType.options.selectedIndex = typeNumbers[myStorage.getItem('ticketType')];
  formOverviewType.textContent = typeText[myStorage.getItem('ticketType')];
  formQtys[0].value = myStorage.getItem('basicQuantity') || 1;
  formQtys[1].value = myStorage.getItem('seniorQuantity')|| 1;
  formOverviewQtys[0].textContent = formQtys[0].value;
  formOverviewQtys[1].textContent = formQtys[1].value;
  formOvrviewDate.textContent = myStorage.getItem('ticketDate');
  formDate.value = myStorage.getItem('dateTicket');
  formDate.classList.add('selected');
  formOvrviewTime.textContent = myStorage.getItem('ticketTime');
  formTime.classList.add('selected');
  formTime.value = myStorage.getItem('ticketTime');
  nameInput.value = myStorage.getItem('name');
  emailInput.value = myStorage.getItem('email');
  telInput.value = myStorage.getItem('tel');
  formOverviewQtys[0].textContent = myStorage.getItem('basicQuantity');
  formOverviewQtys[1].textContent = myStorage.getItem('seniorQuantity');
  formOverviewBasicText.textContent = myStorage.getItem('basicPrice');
  formOverviewBasicAmount.textContent = myStorage.getItem('basicAmount');
  formOverviewSeniorText.textContent = myStorage.getItem('seniorPrice');
  formOverviewSeniorAmount.textContent = myStorage.getItem('seniorAmount');
  formOverviewTotalAmount.textContent = myStorage.getItem('totalAmountText');
}

updateFormFromStorage();

// form validation

function validDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; 
  if(dd < 10){
  dd = '0' + dd;
  } 
  if(mm < 10){
    mm = '0' + mm;
  } 
  today = `${today.getFullYear()}-${mm}-${dd}`;
  formDate.setAttribute("min", today);
}

formDate.addEventListener('focus', validDate);

formTime.addEventListener('change', validTime);

function updateTime() {
  formTime.classList.add('selected');
  let time = formTime.value;
  myStorage.setItem('ticketTime', time);
  formOvrviewTime.textContent = time;
}

function showError(node, message) {
  node.classList.add('error');
  let errorMessage = document.createElement('span');
  errorMessage.className = 'allert';
  errorMessage.textContent = message;
  form.prepend(errorMessage);
  setTimeout(() => errorMessage.remove(), 5000);
}

function validTime() {
  let time = formTime.value;
  let hours = +time.slice(0,2);
  let minutes = +time.slice(3);
  if ((hours > 18 || hours < 9) || (minutes !== 0 && minutes !== 30)) {
    showError(formTime, 'Time shold be from 9:00 to 18:00 with step 30 minutes');
  } else if ((hours <= 18 && hours >= 9) && (minutes === 0 || minutes === 30)){
    formTime.classList.remove('error');
    updateTime();
  }
}

nameInput.addEventListener('blur', vallidName);

function vallidName() {
  let name = nameInput.value;
  validNameSymbols();

  function validNameSymbols() {
    let regExpRu = /\p{sc=Cyrillic}*\s*/gu;
    let regExp = /[a-zA-Z]*\s*/u;
    if (!regExp.test(name) && !regExpRu.test(name)) {
      showError(nameInput, 'Only latin and cyrillic letters allowed');
    } else if (regExp.test(name) || regExpRu.test(name)) {
      nameInput.classList.remove('error');
      validNameLength();
    } 
  }

  function validNameLength() {
    if (name.length < 3 || name.length > 15) {
      showError(nameInput, 'From 3 to 15 letters allowed');
    } else {
      nameInput.classList.remove('error');
      storeName();
    }
  }

  function storeName() {
    myStorage.setItem('name', nameInput.value);
  }  
}


emailInput.addEventListener('blur', validEmail);
emailInput.addEventListener('change', validEmail);

function validEmail() {
  let email = emailInput.value;
  let arr = email.split('@');
  let domain = arr[1];
  let username = arr[0];
  let domArr = domain.split('.');
  let firstDomain = domArr[0];
  let secondDomain = domArr[1];
  if (username.length < 3 || username.length > 15) {
    showError(emailInput, 'Too shoort or too long email');
    console.log('user',(username.length < 3 || username.length > 15))
  } 
  if (firstDomain.length < 4 || secondDomain.length < 2) {
    showError(emailInput, 'Too shoort  domain name');
    console.log('1',(firstDomain.length < 4 || secondDomain.length < 2));
  }
  if ((username.length >= 3 && username.length <= 15) && (firstDomain.length >= 4 && secondDomain.length >= 2)) {
     if (emailInput.classList.contains('error')) {
      emailInput.classList.remove('error');
    }
    storeEmail();
  }
}

function storeEmail() {
  myStorage.setItem('email', emailInput.value);
}

telInput.addEventListener('blur', validateTel);
telInput.addEventListener('change', validateTel);

function storeTel() {
  myStorage.setItem('tel', telInput.value);
}

function validateTel() {
  let tel = telInput.value;
  validTelLength(tel);

  function validTelLength(str) {
    let regExp2 = /\d/g; 
    let number = str.match(regExp2);
    if (number.length > 10) {
      showError(telInput, 'Number is too long');
    } else if (number.length <= 10) {
      telInput.classList.remove('error');
      validTelSeparators(str);
    } 
  } 

  function validTelSeparators(str) {
    let regExp = /^[0-9]{2,3}\s-?[0-9]{2,3}\s-?[0-9]{2,3}\s-?[0-9]{2,3}$/gi;
    if (!regExp.test(str)) {
     console.log(regExp.test(str));
      showError(telInput, 'Only " " or "-" separators of 2 or 3 numbers are allowed (min10)');
    } else if (regExp.test(str)) {
      telInput.classList.remove('error');
      storeTel();
    } 
  }
}

