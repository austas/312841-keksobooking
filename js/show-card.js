'use strict';

window.showCard = (function () {

  var dialogOpenHandler = function (element, data) {
    if (data) {
      element.style.display = 'block';
    }
  };

  return function (element, data) {
    dialogOpenHandler(element, data);
  };
})();
