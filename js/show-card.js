'use strict';

window.showCard = (function () {

  var getLodgeType = function (data) {
    var lodgeType = data.offer.type;

    switch (lodgeType) {
      case 'flat':
        lodgeType = 'Квартира';
        break;
      case 'bungalo':
        lodgeType = 'Лачуга';
        break;
      case 'house':
        lodgeType = 'Дворец';
        break;
    }
    return lodgeType;
  };

  var getRoomsAndGuests = function (data) {
    var rooms = data.offer.rooms;
    var guests = data.offer.guests;
    var roomsAndGuests = null;

    switch (rooms) {
      case 1:
        roomsAndGuests = rooms + ' комната, для ';
        break;
      case 2:
      case 3:
        roomsAndGuests = rooms + ' комнаты, для ';
        break;
    }

    switch (guests) {
      case 1:
        roomsAndGuests += guests + ' гостя';
        break;
      case 2:
      case 3:
        roomsAndGuests += guests + ' гостей';
        break;
    }

    if (roomsAndGuests === '0') {
      roomsAndGuests = '';
    }

    return roomsAndGuests;
  };

  var getCheckinCheckoutTime = function (data) {
    var checkIn = data.offer.checkin;
    var checkOut = data.offer.checkout;
    var checkinAndCheckout = 'Заезд после ' + checkIn + ', выезд до ' + checkOut;

    if (checkIn && checkOut === '0:00') {
      checkinAndCheckout = '';
    }

    return checkinAndCheckout;
  };

  var renderLodgeFeatures = function (element, data) {
    var lodgeList = data.offer.features;
    var fragment = document.createDocumentFragment();

    lodgeList.forEach(function (object) {
      fragment.appendChild(window.renderLodgeList(object));
    });

    return fragment;
  };

  var renderOpenedCard = function (element, data) {

    var dialogTitle = element.querySelector('.dialog__title');
    dialogTitle.querySelector('img').src = data.author.avatar;

    var dialogPanel = element.querySelector('.dialog__panel');
    dialogPanel.querySelector('.lodge__title').textContent = data.offer.title;
    dialogPanel.querySelector('.lodge__address').textContent = data.offer.address;
    dialogPanel.querySelector('.lodge__price').innerHTML = data.offer.price + '<span style="font-family: \'PT Sans\', serif;">&#8399;</span>/ночь';
    dialogPanel.querySelector('.lodge__type').textContent = getLodgeType(data);
    dialogPanel.querySelector('.lodge__rooms-and-guests').textContent = getRoomsAndGuests(data);
    dialogPanel.querySelector('.lodge__checkin-time').textContent = getCheckinCheckoutTime(data);

    var lodgeFeatures = dialogPanel.querySelector('.lodge__features');
    lodgeFeatures.textContent = '';
    lodgeFeatures.appendChild(renderLodgeFeatures(lodgeFeatures, data));

  };

  var dialogOpenHandler = function (element, data) {
    if (data) {
      renderOpenedCard(element, data);
      element.style.display = 'block';
    }
  };

  return function (element, data) {
    dialogOpenHandler(element, data);
  };
})();
