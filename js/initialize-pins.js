'use strict';

window.initializePins = (function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var filtersForm = document.querySelector('.tokyo__filters');
  var pinMain = document.querySelector('.pin__main');

  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var MAX_NUMBER_OF_PINS_ON_START = 3;
  var PIN_MAIN_WIDTH = 75;
  var PIN_MAIN_HEIGHT = 94;

  var selectedPin = null;
  var focusOn = null;
  var allApartments;
  var filteredApartments;

  var selectActivePin = function (evt, data) {
    deleteActivePin();
    evt.classList.add('pin--active');
    window.showCard.show(data);
    window.utils.setupARIA(evt, 'aria-pressed', 'true');
  };

  var deleteActivePin = function () {
    var activePin = tokyoPinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      window.utils.setupARIA(activePin, 'aria-pressed', 'false');
    }

    if (typeof focusOn === 'function') {
      focusOn();
    }
  };

  var pinTargetHandler = function (evt, data) {
    var target = evt.target;
    while (target !== tokyoPinMap) {
      if (target.classList.contains('pin') && !target.classList.contains('pin__main')) {
        selectActivePin(target, data[target.dataset.index]);
        selectedPin = target;
        return;
      }
      target = target.parentNode;
    }
  };

  var setFocusOnSelectedPin = function () {
    selectedPin.focus();
  };

  var tokyoPinMapHandler = function (evt) {
    pinTargetHandler(evt, window.initializePins.filteredApartments);
  };

  var tokyoPinMapKeydownHandler = function (evt) {
    if (window.utils.isActivateEvent(evt)) {
      window.initializePins.rememberFocus(setFocusOnSelectedPin, evt, window.initializePins.filteredApartments);
    } else if (window.utils.isEscEvent(evt)) {
      window.showCard.dialogCloseHandler();
    }
  };

  var filtersFormHandler = function () {
    filteredApartments = window.filtersForm(window.initializePins.allApartments);
    window.initializePins.filteredApartments = filteredApartments;
    removeRenderedPins();
    renderSimilarApartments(filteredApartments);
  };

  var removeRenderedPins = function () {
    tokyoPinMap.removeEventListener('click', tokyoPinMapHandler);
    tokyoPinMap.removeEventListener('keydown', tokyoPinMapKeydownHandler);

    var pins = tokyoPinMap.querySelectorAll('.pin');
    for (var i = 1; i < pins.length; i++) {
      tokyoPinMap.removeChild(pins[i]);
    }
  };

  filtersForm.addEventListener('change', filtersFormHandler);

  var renderSimilarApartments = function (data) {

    var fragment = document.createDocumentFragment();
    data.forEach(function (object, index) {
      fragment.appendChild(window.render.pin(object, index));
    });

    tokyoPinMap.appendChild(fragment);
    tokyoPinMap.addEventListener('click', tokyoPinMapHandler);
    tokyoPinMap.addEventListener('keydown', tokyoPinMapKeydownHandler);

  };

  pinMain.addEventListener('mousedown', function (evt) {
    window.utils.mouseMoveHandler(evt, pinMain);
    pinMain.addEventListener('mousemove', function () {

      var pinMainCoords = {
        x: pinMain.offsetLeft + PIN_MAIN_WIDTH / 2,
        y: pinMain.offsetTop + PIN_MAIN_HEIGHT,
        element: pinMain
      };

      window.noticeForm.pinMainAddress.value = 'x: ' + pinMainCoords.x + '; y: ' + pinMainCoords.y;
      window.initializePins.pinMainCoords = pinMainCoords;
    });
  });

  var errorDataHandler = function (err) {
    var main = document.querySelector('.tokyo');
    var dialogError = document.createElement('div');
    dialogError.classList.add('dialog');
    dialogError.style.display = 'block';
    dialogError.innerHTML = '<h3>' + err + '</h3>';
    main.appendChild(dialogError);
  };

  var onLoad = function (data) {
    window.initializePins.allApartments = data;
    var firstRandomApartments = window.utils.getRandomElement(data, MAX_NUMBER_OF_PINS_ON_START);
    filteredApartments = data.slice(firstRandomApartments, firstRandomApartments + MAX_NUMBER_OF_PINS_ON_START);
    window.initializePins.filteredApartments = filteredApartments;
    renderSimilarApartments(filteredApartments);
  };

  window.load(DATA_URL, onLoad, errorDataHandler);

  return {
    rememberFocus: function (cb, evt, data) {
      pinTargetHandler(evt, data);
      focusOn = cb;
    },
    deleteActivePin: deleteActivePin,
    selectActivePin: selectActivePin,
    allApartments: allApartments,
    filteredApartments: filteredApartments,
    tokyoPinMap: tokyoPinMap,
    pinMainCoords: null
  };

})();
