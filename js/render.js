'use strict';

window.render = (function () {
  var templateElement = document.querySelector('#pin-template');
  var elementToClone = templateElement.content.querySelector('.pin');

  return {
    pin: function (pin, index) {
      var newElement = elementToClone.cloneNode(true);

      newElement.setAttribute('data', index);
      newElement.setAttribute('role', 'button');
      newElement.setAttribute('aria-pressed', 'false');
      newElement.setAttribute('tabindex', '2');
      newElement.setAttribute('style', '');
      newElement.style = ['left: ' + pin.location.x + 'px;top: ' + pin.location.y + 'px'];

      var newAvatar = newElement.children[0];
      newAvatar.src = pin.author.avatar;

      return newElement;
    },

    feature: function (lodgeList) {
      var lodge = document.createElement('span');

      lodge.classList.add('feature__image');
      lodge.classList.add(['feature__image--' + lodgeList]);
      return lodge;
    },

    photo: function (photos) {
      var newPhoto = document.createElement('img');

      newPhoto.setAttribute('src', photos);
      newPhoto.setAttribute('alt', 'Lodge photo');
      newPhoto.setAttribute('width', '52');
      newPhoto.setAttribute('height', '42');
      newPhoto.setAttribute('style', 'border: 1px solid white');
      return newPhoto;
    }
  };
})();
