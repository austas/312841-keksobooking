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
    var firstThreeSimilarApartments = similarApartments.slice(0, 3);
    // console.log(firstThreeSimilarApartments);
  };

  var errorDataHandler = function (err) {
    dialogMain.innerHTML = err;
  };

  window.load(DATA_URL, loadSimilarApartments, errorDataHandler);

  /* similarApartments.forEach(function (it) {
    fragment.appendChild(window.render(it));
  }); */

  var fragment = document.createDocumentFragment();

  var newPins = [{
    style: {left: '300px', top: '400px'}}, {
      style: {left: '500px', top: '200px'}}, {
        style: {left: '300px', top: '300px'}}];

  newPins.forEach(function (it) {
    fragment.appendChild(window.render(it));
  });

  tokyoPinMap.appendChild(fragment);

  return function (cb, evt) {
    pinTargetHandler(evt);
    focusOn = cb;
  };

})();
