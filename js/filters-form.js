'use strict';

window.filtersForm = (function () {
  var selectedHousingType = document.querySelector('#housing_type');
  var selectedHousingPrice = document.querySelector('#housing_price');
  var selectedHousingRoomNumber = document.querySelector('#housing_room-number');
  var selectedHousingGuestsNumber = document.querySelector('#housing_guests-number');
  // var selectedHousingFeatures = filtersForm.element.housing_features;

  var getPriceRange = function (data) {
    var priceRange;
    var housingPrice = selectedHousingPrice.value;
    switch (housingPrice) {
      case 'low':
        priceRange = data.filter(function (object) {
          return object.offer.price < 10000;
        });
        break;
      case 'middle':
        priceRange = data.filter(function (object) {
          return object.offer.price >= 10000 && object.offer.price < 50000;
        });
        break;
      case 'hight':
        priceRange = data.filter(function (object) {
          return object.offer.price >= 50000;
        });
        break;
    }
    return priceRange;
  };

  return function (data) {
    var filteredApartments = data.filter(function (object) {
      return object.offer.type === selectedHousingType.value || selectedHousingType.value === 'any';
    });

    filteredApartments = getPriceRange(filteredApartments);

    filteredApartments = filteredApartments.filter(function (object) {
      return selectedHousingRoomNumber.value === 'any' || object.offer.rooms.toString() === selectedHousingRoomNumber.value;
    });

    filteredApartments = filteredApartments.filter(function (object) {
      return selectedHousingGuestsNumber.value === 'any' || object.offer.guests.toString() === selectedHousingGuestsNumber.value;
    });

    return filteredApartments;
  };
})();
