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
    newElement.style = ['left: ' + pin.location.x + 'px;top: ' + pin.location.y + 'px'];

    var newAvatar = newElement.children[0];
    newAvatar.src = pin.author.avatar;

    return newElement;
  };
})();
