'use strict';

var pinMap = document.querySelectorAll('.pin');
var activePin = document.querySelector('.pin--active');
var dialogMain = document.querySelector('.dialog');
var dialogClose = dialogMain.querySelector('.dialog__close');
var noticeForm = document.querySelector('.notice__form');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');
var noticeAddress = noticeForm.querySelector('#address');

var noticeUserForm = document.forms[1];
var selectedHouseType = noticeUserForm.elements[1];
var selectedRoomNumbers = noticeUserForm.elements[3];
var selectedCapacity = noticeUserForm.elements[4];
var selectedTimeIn = noticeUserForm.elements[7];
var selectedTimeOut = noticeUserForm.elements[8];

noticeTitle.required = true;
noticeTitle.minLength = '30';
noticeTitle.maxLength = '100';

noticePrice.required = true;
noticePrice.type = 'number';
noticePrice.setAttribute('min', '1000');
noticePrice.setAttribute('max', '1000000');

noticeAddress.required = true;

function selectPin() {
  deletePin();
  this.classList.add('pin--active');
  dialogMain.style.display = 'block';
}

function deletePin() {
  for (var i = 0; i < pinMap.length; i++) {
    if (activePin) {
      pinMap[i].classList.remove('pin--active');
    }
  }
}

function letDialogClose() {
  dialogMain.style.display = 'none';
  deletePin();
}

function syncSelectedElements(selectedOption) {
  selectedOption = selectedOption.options[selectedOption.selectedIndex].value;
  if (selectedOption === 'flat') {
    noticePrice.setAttribute('min', '1000');
  }
  if (selectedOption === 'shack') {
    noticePrice.setAttribute('min', '0');
  }
  if (selectedOption === 'palace') {
    noticePrice.setAttribute('min', '10000');
  }
  if (selectedOption === 'hundred_rooms' || 'two_rooms') {
    selectedCapacity.value = 'for_three_guests';
  }
  if (selectedOption === 'one_room') {
    selectedCapacity.value = 'not_for_guests';
  }
}

for (var i = 0; i < pinMap.length; i++) {
  pinMap[i].addEventListener('click', selectPin);
}

dialogClose.addEventListener('click', letDialogClose);


selectedHouseType.addEventListener('change', function () {
  syncSelectedElements(selectedHouseType);
});

selectedRoomNumbers.addEventListener('change', function () {
  syncSelectedElements(selectedRoomNumbers);
});

selectedTimeIn.addEventListener('change', function () {
  for (i = 0; i < selectedTimeIn.length; i++) {
    selectedTimeOut.selectedIndex = this.selectedIndex;
  }
});
