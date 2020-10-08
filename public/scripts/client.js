/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const $form = $('section.new-tweet form');
  // form submission handler
  // Makes an Ajax request (instead of form submit) to send the form data to the server
  // Disallows the submission of an empty or exceeding 140 characters tweet
  $form.on('submit', sendTweet);



 // Toggle nav bar button for write new tweet section
 $('nav button').on('click', writeNewTweet);


 loadTweets();

});


