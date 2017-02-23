'use strict';

window.render = (function () {
  var templateElement = document.querySelector('#pin-template');
  var elementToClone = templateElement.content.querySelector('.pin');

  return function (pin) {
    var newElement = elementToClone.cloneNode(true);

    var newPin = newElement.children[0];
    newPin.style.role = 'button';
    newPin.style['aria-pressed'] = 'false';
    newPin.style.tabindex = '2';
    newPin.style.style = pin.style;

    return newElement;
  };
})();
