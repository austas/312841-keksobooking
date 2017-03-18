'use strict';

window.noticeForm = (function () {

  var noticeForm = document.querySelector('.notice__form');
  var noticePrice = noticeForm.querySelector('#price');
  // var noticeFormTitle = noticeForm.querySelector('#title');
  // var noticeFormSubmit = noticeForm.querySelector('.form__submit');
  var selectedHouseType = noticeForm.elements.type;
  var selectedRoomNumbers = noticeForm.elements.roomNumber;
  var selectedCapacity = noticeForm.elements.capacity;
  var selectedTimeIn = noticeForm.elements.timeIn;
  var selectedTimeOut = noticeForm.elements.timeOut;

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  selectedHouseType.addEventListener('change', function () {
    window.synchronizeFields(selectedHouseType, noticePrice, ['flat', 'bungalo', 'house'], ['1000', '0', '10000'], syncValueWithMin);
    window.synchronizeFields(selectedHouseType, noticePrice, ['flat', 'bungalo', 'house'], ['1000', '0', '10000'], syncValues);
  });

  selectedRoomNumbers.addEventListener('change', function () {
    window.synchronizeFields(selectedRoomNumbers, selectedCapacity, ['one_room', 'two_rooms', 'hundred_rooms'], ['not_for_guests', 'for_three_guests', 'for_three_guests'], syncValues);
  });

  selectedCapacity.addEventListener('change', function () {
    window.synchronizeFields(selectedCapacity, selectedRoomNumbers, ['not_for_guests', 'for_three_guests', 'for_three_guests'], ['one_room', 'two_rooms', 'hundred_rooms'], syncValues);
  });

  selectedTimeIn.addEventListener('change', function () {
    window.synchronizeFields(selectedTimeIn, selectedTimeOut, ['twelve', 'one', 'two'], ['twelve', 'one', 'two'], syncValues);
  });

  selectedTimeOut.addEventListener('change', function () {
    window.synchronizeFields(selectedTimeOut, selectedTimeIn, ['twelve', 'one', 'two'], ['twelve', 'one', 'two'], syncValues);
  });

  var onFormSubmit = function () {
    alert('Not sent');
  };

  return onFormSubmit;

})();
