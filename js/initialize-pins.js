'use strict';

window.initializePins = (function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogMain = document.querySelector('.dialog');
  var dialogClose = dialogMain.querySelector('.dialog__close');
  var selectedPin = null;
  var focusOn = null;
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  function setupARIA(element, atribute1, atribute2) {
    element.setAttribute(atribute1, atribute2);
  }

  function selectActivePin(evt, data) {
    deleteActivePin();
    evt.classList.add('pin--active');
    window.showCard(dialogMain, data);
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

  function pinTargetHandler(evt, data) {
    var target = evt.target;
    while (target !== tokyoPinMap) {
      if (target.classList.contains('pin')) {
        selectActivePin(target, data[target.getAttribute('data')]);
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
    var firstThreeSimilarApartments = data.slice(0, 3);
    var fragment = document.createDocumentFragment();

    firstThreeSimilarApartments.forEach(function (object, index) {
      fragment.appendChild(window.render(object, index));
    });

    tokyoPinMap.appendChild(fragment);

    tokyoPinMap.addEventListener('click', function (evt) {
      pinTargetHandler(evt, data);
    });

    tokyoPinMap.addEventListener('keydown', function (evt) {
      onTokyoPinMapHandler(evt, data);
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
