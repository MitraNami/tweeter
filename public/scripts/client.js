/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // form submission handler
  // Makes an Ajax request (instead of form submit) to send the form data to the server
  // Disallows the submission of an empty or exceeding 140 characters tweet
  const $form = $('section.new-tweet form');
  $form.on('submit', function(event) {
    event.preventDefault();
    // tweet length validation
    $errorLabel = $(this).parent().find('p');
    $errorLabel.slideUp();
    
    const text = $(this).find('textarea').val();
    const textLength = text.length;
    if (!textLength) {
      $errorLabel.text('Please write something.');
      $errorLabel.slideDown();
      return;
    } else if (textLength > 140) {
      $errorLabel.text('You have exceeded character limit!');
      $errorLabel.slideDown();
      return;
    }

    const data = $(this).serialize();
    // Ajax GET request to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data
    }).then (() => {
      //empty out the tweet text if it is sent successfully
      $(this).find('textarea').val('');
      $('#tweets-container').empty();
      loadTweets();
    });


  });


  // fetches tweets from /tweets page
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then((tweetsJson) => {
      renderTweets(tweetsJson)
    });
  };

 loadTweets();

 //nav bar animation
 $('nav button').on('click', function() {
   $newTweet = $('section.new-tweet');
  if ($newTweet.css('display') === 'none') {
    $newTweet.slideDown();
    $('#tweet-text').focus();
  } else {
    $newTweet.slideUp();
  }
 });

});


