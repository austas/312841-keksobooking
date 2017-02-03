'use strict';

var pinMap = document.querySelectorAll('.pin');
var dialogMain = document.querySelector('.dialog');
var dialogClose = dialogMain.querySelector('.dialog__close');
var noticeForm = document.querySelector('.notice__form');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');
var noticeAddress = noticeForm.querySelector('#address');
// var selector = noticeForm.querySelectorAll('option');

noticeTitle.required = true;
noticeTitle.minLength = '30';
noticeTitle.maxLength = '100';

noticePrice.required = true;
noticePrice.type = 'number';
noticePrice.setAttribute('min', '1000');
noticePrice.setAttribute('max', '1000000');

noticeAddress.required = true;

var selectType = noticeForm.querySelector('#type');
var typeOptions = selectType.querySelectorAll('option');

function getSelectedOption() {
  for (var i = 0; i < typeOptions.length; i++) {
    var optionType = typeOptions[i];
    if (optionType.selected) {
      console.log(optionType.value);
    }
  }
}

noticeForm.addEventListener('change', getSelectedOption);

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
