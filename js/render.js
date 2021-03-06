'use strict';

window.render = (function () {
  var templateElement = document.querySelector('#pin-template');
  var elementToClone = templateElement.content.querySelector('.pin');
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;

  return {
    pin: function (pin, index) {
      var newElement = elementToClone.cloneNode(true);

      newElement.dataset.index = index;
      newElement.setAttribute('role', 'button');
      newElement.setAttribute('aria-pressed', 'false');
      newElement.setAttribute('tabindex', '2');
      newElement.setAttribute('style', '');

      var coordsX = pin.location.x - PIN_WIDTH / 2;
      var coordsY = pin.location.y - PIN_HEIGHT;
      window.render.setPinCoords(newElement, coordsX, coordsY);

      var newAvatar = newElement.children[0];
      newAvatar.src = pin.author.avatar;

      return newElement;
    },

    setPinCoords: function (element, coordsX, coordsY) {
      element.style = ['left: ' + coordsX.toString() + 'px;top: ' + coordsY.toString() + 'px'];
    },

    feature: function (features) {
      var newFeature = document.createElement('span');
      var featureItem = 'feature__image--' + features.toString();

      newFeature.classList.add('feature__image');
      newFeature.classList.add(featureItem);
      return newFeature;
    },

    photo: function (photoSource) {
      var newPhoto = document.createElement('img');

      newPhoto.setAttribute('src', photoSource);
      newPhoto.setAttribute('alt', 'Lodge photo');
      newPhoto.setAttribute('width', '52');
      newPhoto.setAttribute('height', '42');
      newPhoto.setAttribute('style', 'padding: 1px');
      return newPhoto;
    }
  };
})();
