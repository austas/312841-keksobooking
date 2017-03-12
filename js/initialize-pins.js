'use strict';

window.initializePins = (function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogMain = document.querySelector('.dialog');
  var dialogClose = dialogMain.querySelector('.dialog__close');
  var filtersForm = document.querySelector('.tokyo__filters');
  var pinMain = document.querySelector('.pin__main');
  var pinMainAddress = document.querySelector('#address');

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
    window.showCard(dialogMain, data);
    window.utils.setupARIA(evt, 'aria-pressed', 'true');
    window.utils.setupARIA(dialogMain, 'aria-hidden', 'false');
    window.utils.setupARIA(dialogClose, 'aria-pressed', 'false');
  };

  var deleteActivePin = function () {
    var activePin = tokyoPinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      window.utils.setupARIA(activePin, 'aria-pressed', 'false');
    }
  };

  var dialogCloseHandler = function () {
    dialogMain.style.display = 'none';
    window.utils.setupARIA(dialogMain, 'aria-hidden', 'true');
    window.utils.setupARIA(dialogClose, 'aria-pressed', 'true');
    deleteActivePin();

    if (typeof focusOn === 'function') {
      focusOn();
    }
  };

  var pinTargetHandler = function (evt, data) {
    var target = evt.target;
    while (target !== tokyoPinMap) {
      if (target.classList.contains('pin')) {
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

  var tokyoPinMapHandler = function (evt, data) {
    if (window.utils.isActivateEvent(evt)) {
      window.initializePins(setFocusOnSelectedPin, evt, data);
    } else if (window.utils.isEscEvent(evt)) {
      dialogCloseHandler();
    }
  };

  dialogClose.addEventListener('click', dialogCloseHandler);

  var filtersFormHandler = function () {
    filteredApartments = window.filtersForm(allApartments);
    removeRenderedPins();
    renderSimilarApartments(filteredApartments);
  };

  var removeRenderedPins = function () {
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

    tokyoPinMap.addEventListener('click', function (evt) {
      pinTargetHandler(evt, data);
    });

    tokyoPinMap.addEventListener('keydown', function (evt) {
      tokyoPinMapHandler(evt, data);
    });
  };

  pinMain.addEventListener('mousedown', function (evt) {
    window.utils.mouseMoveHandler(evt, pinMain);
    pinMain.addEventListener('mousemove', function () {

      var pinMainCoords = {
        x: pinMain.offsetLeft + PIN_MAIN_WIDTH / 2,
        y: pinMain.offsetTop + PIN_MAIN_HEIGHT
      };

      pinMainAddress.value = 'x: ' + pinMainCoords.x + '; y: ' + pinMainCoords.y;
    });
  });

  var errorDataHandler = function (err) {
    dialogMain.innerHTML = err;
  };

  var onLoad = function (data) {
    allApartments = data;
    var firstRandomApartments = window.utils.getRandomElement(data, MAX_NUMBER_OF_PINS_ON_START);
    var threeRandomApartments = data.slice(firstRandomApartments, firstRandomApartments + MAX_NUMBER_OF_PINS_ON_START);
    renderSimilarApartments(threeRandomApartments);
  };

  window.load(DATA_URL, onLoad, errorDataHandler);

  return function (cb, evt, data) {
    pinTargetHandler(evt, data);
    focusOn = cb;
  };

})();
