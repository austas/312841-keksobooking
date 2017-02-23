'use strict';

window.initializePins = (function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogMain = document.querySelector('.dialog');
  var dialogClose = dialogMain.querySelector('.dialog__close');
  var selectedPin = null;
  var focusOn = null;
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var pins = document.querySelectorAll('.pin');
  tokyoPinMap.removeChild(pins[1]);
  tokyoPinMap.removeChild(pins[2]);
  tokyoPinMap.removeChild(pins[3]);

  function setupARIA(element, atribute1, atribute2) {
    element.setAttribute(atribute1, atribute2);
  }

  function selectActivePin(evt) {
    deleteActivePin();
    evt.classList.add('pin--active');
    window.showCard(dialogMain);
    setupARIA(evt, 'aria-pressed', 'true');
    setupARIA(dialogMain, 'aria-hidden', 'false');
    setupARIA(dialogClose, 'aria-pressed', 'false');
  }

  function deleteActivePin() {
    var activePin = tokyoPinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      setupARIA(activePin, 'aria-pressed', 'false');
    }
  }

  function dialogCloseHandler() {
    dialogMain.style.display = 'none';
    setupARIA(dialogMain, 'aria-hidden', 'true');
    setupARIA(dialogClose, 'aria-pressed', 'true');
    deleteActivePin();

    if (typeof focusOn === 'function') {
      focusOn();
    }
  }

  function pinTargetHandler(evt) {
    var target = evt.target;
    while (target !== tokyoPinMap) {
      if (target.classList.contains('pin')) {
        selectActivePin(target);
        selectedPin = target;
        return;
      }
      target = target.parentNode;
    }
  }

  var setFocusOnSelectedPin = function () {
    selectedPin.focus();
  };

  var onTokyoPinMapHandler = function (evt) {
    if (window.utils.isActivateEvent(evt)) {
      window.initializePins(setFocusOnSelectedPin, evt);
    } else if (window.utils.isEscEvent(evt)) {
      dialogCloseHandler();
    }
  };

  tokyoPinMap.addEventListener('click', pinTargetHandler);
  tokyoPinMap.addEventListener('keydown', onTokyoPinMapHandler);

  dialogClose.addEventListener('click', dialogCloseHandler);

  var loadSimilarApartments = function (data) {
    var similarApartments = data;
    similarApartments.splice(3, similarApartments.length);
    // console.log(similarApartments);
  };

  var errorDataHandler = function (err) {
    dialogMain.innerHTML = err;
  };

  window.load(DATA_URL, loadSimilarApartments, errorDataHandler);

  /* similarApartments.forEach(function (it) {
    fragment.appendChild(window.render(it));
  }); */

  var fragment = document.createDocumentFragment();

  var newPins = [{style: 'left: 200px;top: 400px'}, {style: 'left: 400px;top: 200px'}, {style: 'left: 500px;top: 500px'}];

  newPins.forEach(function (it) {
    fragment.appendChild(window.render(it));
  });

  tokyoPinMap.appendChild(fragment);

  return function (cb, evt) {
    pinTargetHandler(evt);
    focusOn = cb;
  };

})();
