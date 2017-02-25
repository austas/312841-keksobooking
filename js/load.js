'use strict';

window.load = (function () {

  return function (url, onLoad, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status >= 400) {
        errorHandler('Failed to load data. Server returned status: ' + xhr.status);
      } else if (xhr.status >= 200) {
        onLoad(xhr.response);
      }
    });

    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', errorHandler);

    xhr.responseType = 'json';

    xhr.open('GET', url);
    xhr.send();
  };
})();
