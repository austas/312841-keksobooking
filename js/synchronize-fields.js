'use strict';

window.synchronizeFields = function (element1, element2, array1, array2, value) {
  var selectedOption = element1.options[element1.selectedIndex].value;
  element2[value] = array2[array1.indexOf(selectedOption)];
};
