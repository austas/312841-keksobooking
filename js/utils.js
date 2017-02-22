'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  return {

    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },

    isEscEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ESCAPE_KEY_CODE;
    }
  };
})();
