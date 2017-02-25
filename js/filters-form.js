'use strict';

window.filtersForm = (function () {
  var selectedHousingType = document.querySelector('#housing_type');
  // var selectedHousingPrice = filtersForm.elements.housing_price;
  // var selectedHousingRoomNumber = filtersForm.elements['housing_room-number'];
  // var selectedHousingGuestsNumber = filtersForm.elements['housing_guests-number'];
  // var selectedHousingFeatures = filtersForm.element.housing_features;

  return function (data) {
    var filteredApartments = data.filter(function (object) {
      return object.offer.type === selectedHousingType.value || selectedHousingType.value === 'any';
    });
    return filteredApartments;
  };
})();
