/*
 * Charecter counter logic
 */

const counterDisplay = (target, num) => {
  if (num < 0) {
    target.addClass('red-counter');
  } else {
    target.removeClass('red-counter');
  }
  target.text(num);
};


$(document).ready(function() {

  $('#tweet-text').on('keyup', function() {
    let text = $(this).val();
    let numberOfCharactersLeft = 140 - text.length;
    counterjQueryObj = $(this).parent().find('.counter');
    counterDisplay(counterjQueryObj, numberOfCharactersLeft);
  });


});