'use strict';

window.showCard = (function () {
  return function (element, data) {
    if (data) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  };
})();
