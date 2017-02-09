'use strict';

var noticeForm = document.querySelector('.notice__form');
var noticePrice = noticeForm.querySelector('#price');
var selectedHouseType = noticeForm.elements.type;
var selectedRoomNumbers = noticeForm.elements.roomNumber;
var selectedCapacity = noticeForm.elements.capacity;
var selectedTimeIn = noticeForm.elements.timeIn;
var selectedTimeOut = noticeForm.elements.timeOut;

var houseTypeOptions = ['flat', 'shack', 'palace'];
var housePriceOptions = ['1000', '0', '10000'];
var roomNumbersOptions = ['one_room', 'two_rooms', 'hundred_rooms'];
var capacityOptions = ['not_for_guests', 'for_three_guests', 'for_three_guests'];
var timeOptions = ['twelve', 'one', 'two'];

selectedHouseType.addEventListener('change', function () {
  window.synchronizeFields(selectedHouseType, noticePrice, houseTypeOptions, housePriceOptions, 'min');
  window.synchronizeFields(selectedHouseType, noticePrice, houseTypeOptions, housePriceOptions, 'value');
});

selectedRoomNumbers.addEventListener('change', function () {
  window.synchronizeFields(selectedRoomNumbers, selectedCapacity, roomNumbersOptions, capacityOptions, 'value');
});

selectedCapacity.addEventListener('change', function () {
  window.synchronizeFields(selectedCapacity, selectedRoomNumbers, capacityOptions, roomNumbersOptions, 'value');
});

selectedTimeIn.addEventListener('change', function () {
  window.synchronizeFields(selectedTimeIn, selectedTimeOut, timeOptions, timeOptions, 'value');
});

selectedTimeOut.addEventListener('change', function () {
  window.synchronizeFields(selectedTimeOut, selectedTimeIn, timeOptions, timeOptions, 'value');
});

window.initializePins();
