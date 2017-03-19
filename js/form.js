'use strict';

window.noticeForm = (function () {

  var noticeForm = document.querySelector('.notice__form');
  var noticePrice = noticeForm.querySelector('#price');
  var noticeFormTitle = noticeForm.querySelector('#title');
  var pinMainAddress = noticeForm.querySelector('#address');
  var noticeFormDescription = noticeForm.querySelector('#description');
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
    window.synchronizeFields(selectedRoomNumbers, selectedCapacity, ['1', '2', '100'], ['0', '3', '3'], syncValues);
  });

  selectedCapacity.addEventListener('change', function () {
    window.synchronizeFields(selectedCapacity, selectedRoomNumbers, ['0', '3', '3'], ['1', '2', '100'], syncValues);
  });

  selectedTimeIn.addEventListener('change', function () {
    window.synchronizeFields(selectedTimeIn, selectedTimeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  });

  selectedTimeOut.addEventListener('change', function () {
    window.synchronizeFields(selectedTimeOut, selectedTimeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  });

  var onFormSubmit = function () {

    var userNotice = {
      'author': {
        'avatar': 'img/avatars/no-avatar.png'
      },
      'offer': {
        'features': [],
        'photos': ['img/NoPhoto.png']
      },
      'location': {
        'x': null,
        'y': null
      }
    };

    userNotice.offer.title = noticeFormTitle.value;
    userNotice.offer.price = noticePrice.value;

    userNotice.offer.address = pinMainAddress.value;
    userNotice.location.x = window.initializePins.pinMainCoords.x;
    userNotice.location.y = window.initializePins.pinMainCoords.y;

    userNotice.offer.type = selectedHouseType.value;
    userNotice.offer.rooms = Number(selectedRoomNumbers.value);
    userNotice.offer.guests = Number(selectedCapacity.value);
    userNotice.offer.checkin = selectedTimeIn.value;
    userNotice.offer.checkout = selectedTimeOut.value;
    userNotice.offer.description = noticeFormDescription.value;

    window.render.setPinCoords(window.initializePins.pinMainCoords.element, 600, 300);
    pinMainAddress.value = '';
    noticeFormTitle.value = '';
    noticePrice.value = '';

    window.initializePins.allApartments.push(userNotice);
    window.initializePins.filteredApartments.push(userNotice);
    var userPin = window.render.pin(userNotice, [window.initializePins.filteredApartments.length - 1]);
    window.initializePins.tokyoPinMap.appendChild(userPin);

    window.initializePins.filteredApartments.push(userNotice);
    window.initializePins.selectActivePin(userPin, userNotice);
  };

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    onFormSubmit();
  });

  return {
    onFormSubmit: onFormSubmit,
    pinMainAddress: pinMainAddress
  };

})();
