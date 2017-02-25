'use strict';

window.initializePins = (function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogMain = document.querySelector('.dialog');
  var dialogClose = dialogMain.querySelector('.dialog__close');
  var selectedPin = null;
  var focusOn = null;
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  function selectActivePin(evt, data) {
    deleteActivePin();
    evt.classList.add('pin--active');
    window.showCard(dialogMain, data);
    window.utils.setupARIA(evt, 'aria-pressed', 'true');
    window.utils.setupARIA(dialogMain, 'aria-hidden', 'false');
    window.utils.setupARIA(dialogClose, 'aria-pressed', 'false');
  }

  function deleteActivePin() {
    var activePin = tokyoPinMap.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      window.utils.setupARIA(activePin, 'aria-pressed', 'false');
    }
  }

  function dialogCloseHandler() {
    dialogMain.style.display = 'none';
    window.utils.setupARIA(dialogMain, 'aria-hidden', 'true');
    window.utils.setupARIA(dialogClose, 'aria-pressed', 'true');
    deleteActivePin();

    if (typeof focusOn === 'function') {
      focusOn();
    }
  }

  function pinTargetHandler(evt, data) {
    var target = evt.target;
    while (target !== tokyoPinMap) {
      if (target.classList.contains('pin')) {
        selectActivePin(target, data[target.dataset.index]);
        selectedPin = target;
        return;
      }
      target = target.parentNode;
    }
  }

  var setFocusOnSelectedPin = function () {
    selectedPin.focus();
  };

  var onTokyoPinMapHandler = function (evt, data) {
    if (window.utils.isActivateEvent(evt)) {
      window.initializePins(setFocusOnSelectedPin, evt, data);
    } else if (window.utils.isEscEvent(evt)) {
      dialogCloseHandler();
    }
  };

  dialogClose.addEventListener('click', dialogCloseHandler);

  var getSimilarApartments = function (data) {
    var firstRandomApartments = window.utils.getMinRandomElement(data);
    var threeRandomApartments = data.slice(firstRandomApartments, firstRandomApartments + 3);

    var fragment = document.createDocumentFragment();

    threeRandomApartments.forEach(function (object, index) {
      fragment.appendChild(window.render.pin(object, index));
    });

    tokyoPinMap.appendChild(fragment);

    tokyoPinMap.addEventListener('click', function (evt) {
      pinTargetHandler(evt, threeRandomApartments);
    });

    tokyoPinMap.addEventListener('keydown', function (evt) {
      onTokyoPinMapHandler(evt, threeRandomApartments);
    });
  };

  var errorDataHandler = function (err) {
    dialogMain.innerHTML = err;
  };

  window.load(DATA_URL, getSimilarApartments, errorDataHandler);

  return function (cb, evt, data) {
    pinTargetHandler(evt, data);
    focusOn = cb;
  };

})();
