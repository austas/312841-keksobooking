'use strict';

var noticeForm = document.querySelector('.notice__form');
var noticePrice = noticeForm.querySelector('#price');
var selectedHouseType = noticeForm.elements.type;
var selectedRoomNumbers = noticeForm.elements.roomNumber;
var selectedCapacity = noticeForm.elements.capacity;
var selectedTimeIn = noticeForm.elements.timeIn;
var selectedTimeOut = noticeForm.elements.timeOut;

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

selectedHouseType.addEventListener('change', function () {
  syncSelectedElements(selectedHouseType);
});

selectedRoomNumbers.addEventListener('change', function () {
  syncSelectedElements(selectedRoomNumbers);
});

selectedTimeIn.addEventListener('change', function (evt) {
  selectedTimeOut.value = selectedTimeIn.value;
});

selectedTimeOut.addEventListener('change', function (evt) {
  selectedTimeIn.value = selectedTimeOut.value;
});

window.initializePins();
