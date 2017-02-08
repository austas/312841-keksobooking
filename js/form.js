'use strict';

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var activePin = tokyoPinMap.querySelector('.pin--active');
var dialogMain = document.querySelector('.dialog');
var dialogClose = dialogMain.querySelector('.dialog__close');
var noticeForm = document.querySelector('.notice__form');
var noticePrice = noticeForm.querySelector('#price');
var selectedHouseType = noticeForm.elements.type;
var selectedRoomNumbers = noticeForm.elements.roomNumber;
var selectedCapacity = noticeForm.elements.capacity;
var selectedTimeIn = noticeForm.elements.timeIn;
var selectedTimeOut = noticeForm.elements.timeOut;

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

function setupARIA(element, atribute1, atribute2) {
  element.setAttribute(atribute1, atribute2);
}

function selectPin(e) {
  deleteActivePin();
  e.classList.add('pin--active');
  dialogMain.style.display = 'block';
  setupARIA(e, 'aria-pressed', 'true');
  setupARIA(dialogMain, 'aria-hidden', 'false');
  setupARIA(dialogClose, 'aria-pressed', 'false');
}

function deleteActivePin() {
  activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
    setupARIA(activePin, 'aria-pressed', 'false');
  }
}

function letDialogClose() {
  dialogMain.style.display = 'none';
  setupARIA(dialogMain, 'aria-hidden', 'true');
  setupARIA(dialogClose, 'aria-pressed', 'true');
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

function keydownHandler(e) {
  var activateEvent = e.keyCode;
  switch (activateEvent) {
    case ENTER_KEY_CODE:
      getPinTarget(e);
      break;
    case ESCAPE_KEY_CODE:
      letDialogClose(e);
      break;
  }
}

tokyoPinMap.addEventListener('click', getPinTarget);
tokyoPinMap.addEventListener('keydown', function (e) {
  keydownHandler(e);
});

dialogClose.addEventListener('click', letDialogClose);

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
