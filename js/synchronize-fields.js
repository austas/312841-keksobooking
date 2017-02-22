'use strict';

window.synchronizeFields = (function () {
  return function (element1, element2, array1, array2, syncSelectedOption) {
    var selectedOption = element1.value;
    syncSelectedOption(element2, array2[array1.indexOf(selectedOption)]);
  };
})();
