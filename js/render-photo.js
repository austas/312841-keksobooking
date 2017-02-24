'use strict';

window.renderPhoto = (function () {
  return function (photos) {

    var newPhoto = document.createElement('img');
    newPhoto.setAttribute('src', photos);
    newPhoto.setAttribute('alt', 'Lodge photo');
    newPhoto.setAttribute('width', '52');
    newPhoto.setAttribute('height', '42');
    return newPhoto;

  };
})();
