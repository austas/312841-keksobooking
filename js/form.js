'use strict';

var pinMap = document.querySelectorAll('.pin');
var dialogMain = document.querySelector('.dialog');

function deletePin() {
  var pinActive = document.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
}

function selectPin(pin) {
  pin.classList.add('pin--active');
}

for (var i = 0; i < pinMap.length; i++) {
  pinMap[i].addEventListener('click', function () {
    deletePin();
    selectPin(event.currentTarget);
    dialogMain.style.display = 'block';
  });
}
