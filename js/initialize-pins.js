'use strict';

window.initializePins = (function () {

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogMain = document.querySelector('.dialog');
  var dialogClose = dialogMain.querySelector('.dialog__close');

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  function setupARIA(element, atribute1, atribute2) {
    element.setAttribute(atribute1, atribute2);
  }

  function selectActivePin(evt) {
    deleteActivePin();
    evt.classList.add('pin--active');
    dialogMain.style.display = 'block';
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
  }

  function pinTargetHandler(evt) {
    var target = evt.target;
    while (target !== tokyoPinMap) {
      if (target.classList.contains('pin')) {
        selectActivePin(target);
        return;
      }
      target = target.parentNode;
    }
  }

  function keydownHandler(evt) {
    var activateEvent = evt.keyCode;
    switch (activateEvent) {
      case ENTER_KEY_CODE:
        pinTargetHandler(evt);
        break;
      case ESCAPE_KEY_CODE:
        dialogCloseHandler(evt);
        break;
    }
  }

  tokyoPinMap.addEventListener('click', pinTargetHandler);
  tokyoPinMap.addEventListener('keydown', function (evt) {
    keydownHandler(evt);
  });

  dialogClose.addEventListener('click', dialogCloseHandler);

})();
