'use strict';

var pinMap = document.querySelectorAll('.pin');
var dialogMain = document.querySelector('.dialog');
var dialogClose = dialogMain.querySelector('.dialog__close');
var noticeForm = document.querySelector('.notice__form');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');

noticeTitle.required = true;
noticeTitle.minLength = '30';
noticeTitle.maxLength = '100';

noticePrice.required = true;
noticePrice.type.value = 'number';

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
