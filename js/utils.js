'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var MAX_NUMBER_OF_PINS = 3;

  return {

    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },

    isEscEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ESCAPE_KEY_CODE;
    },

    setupARIA: function (element, atribute1, atribute2) {
      element.setAttribute(atribute1, atribute2);
    },

    getRandomElement: function (array) {
      var randomElementIndex = Math.floor(Math.random() * (array.length - MAX_NUMBER_OF_PINS));
      return randomElementIndex;
    }
  };
})();
