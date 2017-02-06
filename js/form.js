'use strict';

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var pinMap = tokyoPinMap.querySelectorAll('.pin');
var activePin = tokyoPinMap.querySelector('.pin--active');
var dialogMain = document.querySelector('.dialog');
var dialogClose = dialogMain.querySelector('.dialog__close');
var noticeForm = document.querySelector('.notice__form');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');
var noticeAddress = noticeForm.querySelector('#address');
var noticeHouseType = noticeForm.querySelector('#type');
var noticeRoomNumbers = noticeForm.querySelector('#room_number');
var noticeCapacity = noticeForm.querySelector('#capacity');
var noticeTime = noticeForm.querySelector('#time');
var noticeTimeOut = noticeForm.querySelector('#timeout');

noticeForm.setAttribute('name', 'noticeForm');
noticeHouseType.setAttribute('name', 'type');
noticeRoomNumbers.setAttribute('name', 'roomNumber');
noticeCapacity.setAttribute('name', 'capacity');
noticeTime.setAttribute('name', 'timeIn');
noticeTimeOut.setAttribute('name', 'timeOut');

var selectedHouseType = noticeForm.elements.type;
var selectedRoomNumbers = noticeForm.elements.roomNumber;
var selectedCapacity = noticeForm.elements.capacity;
var selectedTimeIn = noticeForm.elements.timeIn;
var selectedTimeOut = noticeForm.elements.timeOut;

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var pinsTabIndex = [4, 5, 2, 3];
document.querySelector('.footer-logo-link').setAttribute('tabindex', '0');

noticeTitle.required = true;
noticeTitle.minLength = '30';
noticeTitle.maxLength = '100';

noticePrice.required = true;
noticePrice.type = 'number';
noticePrice.setAttribute('min', '1000');
noticePrice.setAttribute('max', '1000000');

noticeAddress.required = true;
selectedCapacity.value = 'not_for_guests'; // Так как по умолчанию выбрана 1 комната, ставлю синх ей элемент на старте

function setupARIA(element, atribute1, atribute2) {
  element.setAttribute(atribute1, atribute2);
}

for (var i = 0; i < pinMap.length; i++) {
  setupARIA(pinMap[i], 'role', 'tab');
  setupARIA(pinMap[i], 'aria-selected', 'false');
  setupARIA(pinMap[i], 'tabindex', pinsTabIndex[i]);
}

setupARIA(dialogMain, 'role', 'tabpanel');
setupARIA(dialogMain, 'aria-hidden', 'false');

setupARIA(dialogClose, 'role', 'button');
setupARIA(dialogClose, 'aria-pressed', 'false');
setupARIA(dialogClose, 'tabindex', '1');

if (activePin) {
  setupARIA(activePin, 'aria-selected', 'true');
}

function isActivateEvent(e) {
  return e.keyCode && e.keyCode === ENTER_KEY_CODE;
}

function dialogMainKeydownHandler(e) {
  if (e.keyCode === ESCAPE_KEY_CODE) {
    letDialogClose();
  }
}

function selectPin(e) {
  deleteActivePin();
  e.classList.add('pin--active');
  setupARIA(e, 'aria-selected', 'true');
  dialogMain.style.display = 'block';
  setupARIA(dialogMain, 'aria-hidden', 'false');
  setupARIA(dialogClose, 'aria-pressed', 'false');
  dialogMain.addEventListener('keydown', dialogMainKeydownHandler);
}

function deleteActivePin() {
  activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
    setupARIA(activePin, 'aria-selected', 'false');
  }
}

function letDialogClose() {
  dialogMain.style.display = 'none';
  setupARIA(dialogMain, 'aria-hidden', 'true');
  setupARIA(dialogClose, 'aria-pressed', 'true');
  dialogMain.removeEventListener('keydown', dialogMainKeydownHandler);
  deleteActivePin();
}

function syncSelectedElements(selectedOption) {
  selectedOption = selectedOption.options[selectedOption.selectedIndex].value;
  switch (selectedOption) {
    case 'flat':
      noticePrice.setAttribute('min', '1000');
      noticePrice.setAttribute('value', '1000');
      break;
    case 'shack':
      noticePrice.setAttribute('min', '0');
      noticePrice.setAttribute('value', '0');
      break;
    case 'palace':
      noticePrice.setAttribute('min', '10000');
      noticePrice.setAttribute('value', '10000');
      break;
    case 'one_room':
      selectedCapacity.value = 'not_for_guests';
      break;
    case 'two_rooms':
    case 'hundred_rooms':
      selectedCapacity.value = 'for_three_guests';
      break;
  }
}

function getPinTarget(e) {
  var target = e.target;
  while (target !== tokyoPinMap) {
    if (target.classList.contains('pin')) {
      selectPin(target);
      return;
    }
    target = target.parentNode;
  }
}

tokyoPinMap.addEventListener('click', getPinTarget);
tokyoPinMap.addEventListener('keydown', function (e) {
  if (isActivateEvent(e)) {
    getPinTarget(e);
  }
});

dialogClose.addEventListener('click', letDialogClose);
dialogClose.addEventListener('keydown', function (e) {
  if (isActivateEvent(e)) {
    letDialogClose();
  }
});


selectedHouseType.addEventListener('change', function () {
  syncSelectedElements(selectedHouseType);
});

selectedRoomNumbers.addEventListener('change', function () {
  syncSelectedElements(selectedRoomNumbers);
});

selectedTimeIn.addEventListener('change', function (e) {
  selectedTimeOut.value = selectedTimeIn.value;
});

selectedTimeOut.addEventListener('change', function (e) {
  selectedTimeIn.value = selectedTimeOut.value;
});
