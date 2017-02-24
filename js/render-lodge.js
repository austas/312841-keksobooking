'use strict';

window.renderLodgeList = (function () {
  return function (lodgeList) {

    var lodge = document.createElement('span');
    lodge.classList.add('feature__image');
    lodge.classList.add(['feature__image--' + lodgeList]);
    return lodge;

  };
})();
