'use strict';

window.noticeForm = (function () {

  var noticeForm = document.querySelector('.notice__form');
  var noticePrice = noticeForm.querySelector('#price');
  var selectedHouseType = noticeForm.elements.type;
  var selectedRoomNumbers = noticeForm.elements.roomNumber;
  var selectedCapacity = noticeForm.elements.capacity;
  var selectedTimeIn = noticeForm.elements.timeIn;
  var selectedTimeOut = noticeForm.elements.timeOut;

  selectedHouseType.addEventListener('change', function () {
    window.synchronizeFields(selectedHouseType, noticePrice, ['flat', 'shack', 'palace'], ['1000', '0', '10000'], 'min');
    window.synchronizeFields(selectedHouseType, noticePrice, ['flat', 'shack', 'palace'], ['1000', '0', '10000'], 'value');
  });

  selectedRoomNumbers.addEventListener('change', function () {
    window.synchronizeFields(selectedRoomNumbers, selectedCapacity, ['one_room', 'two_rooms', 'hundred_rooms'], ['not_for_guests', 'for_three_guests', 'for_three_guests'], 'value');
  });

  selectedCapacity.addEventListener('change', function () {
    window.synchronizeFields(selectedCapacity, selectedRoomNumbers, ['not_for_guests', 'for_three_guests', 'for_three_guests'], ['one_room', 'two_rooms', 'hundred_rooms'], 'value');
  });

  selectedTimeIn.addEventListener('change', function () {
    window.synchronizeFields(selectedTimeIn, selectedTimeOut, ['twelve', 'one', 'two'], ['twelve', 'one', 'two'], 'value');
  });

  selectedTimeOut.addEventListener('change', function () {
    window.synchronizeFields(selectedTimeOut, selectedTimeIn, ['twelve', 'one', 'two'], ['twelve', 'one', 'two'], 'value');
  });

})();
