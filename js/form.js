'use strict';

var pinMap = document.querySelectorAll('.pin');
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

noticeTitle.required = true;
noticeTitle.minLength = '30';
noticeTitle.maxLength = '100';

noticePrice.required = true;
noticePrice.type = 'number';
noticePrice.setAttribute('min', '1000');
noticePrice.setAttribute('max', '1000000');

noticeAddress.required = true;
selectedCapacity.value = 'not_for_guests'; // Так как по умолчанию выбрана 1 комната, ставлю синх ей элемент на старте

function selectPin(e) {
  deleteActivePin();
  e.currentTarget.classList.add('pin--active');
  dialogMain.style.display = 'block';
}

function deleteActivePin() {
  var activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
    dialogMain.style.display = 'none';
  }
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

for (var i = 0; i < pinMap.length; i++) {
  pinMap[i].addEventListener('click', selectPin);
}

dialogClose.addEventListener('click', deleteActivePin);


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
