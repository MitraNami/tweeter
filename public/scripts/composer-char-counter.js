/*
 * Charecter counter logic
 */

$(document).ready(function() {
  

  $('#tweet-text').on('keyup', function() {
    let text = $(this).val();
    let numberOfCharactersLeft = 140 - text.length;
    console.log(numberOfCharactersLeft);
  });













});