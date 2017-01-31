'use strict';

var pinMap = document.querySelectorAll('.pin');
var dialogMain = document.querySelector('.dialog');
var dialogClose = dialogMain.querySelector('.dialog__close');

function selectPin() {
  deletePin();
  this.classList.add('pin--active');
  dialogMain.style.display = 'block';
}

function deletePin() {
  for (var i = 0; i < pinMap.length; i++) {
    pinMap[i].classList.remove('pin--active');
  }
}

function letDialogClose() {
  dialogMain.style.display = 'none';
  deletePin();
}

for (var i = 0; i < pinMap.length; i++) {
  pinMap[i].addEventListener('click', selectPin);
}

dialogClose.addEventListener('click', letDialogClose);
