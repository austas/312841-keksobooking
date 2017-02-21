'use strict';

window.initializePins = (function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogMain = document.querySelector('.dialog');
  var dialogClose = dialogMain.querySelector('.dialog__close');
  var selectedPin = null;
  var focusOn = null;

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

  return function (cb, evt) {
    pinTargetHandler(evt);
    focusOn = cb;
  };

})();

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  return {

    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },

    isEscEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ESCAPE_KEY_CODE;
    }
  };
})();
