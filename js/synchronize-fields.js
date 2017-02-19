'use strict';

window.synchronizeFields = (function () {
  return function (element1, element2, array1, array2, value) {
    var selectedOption = element1.options[element1.selectedIndex].value;
    value(element2, array2[array1.indexOf(selectedOption)]);
  };
})();
