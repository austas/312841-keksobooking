'use strict';

window.render = (function () {
  var templateElement = document.querySelector('#pin-template');
  var elementToClone = templateElement.content.querySelector('.pin');

  return function (pin) {
    var newElement = elementToClone.cloneNode(true);

    newElement.setAttribute('role', 'button');
    newElement.setAttribute('aria-pressed', 'false');
    newElement.setAttribute('tabindex', '2');

    newElement.setAttribute('style', '');
    newElement.style = ['left: ' + pin.style.left + ';top: ' + pin.style.top];

    return newElement;
  };
})();
