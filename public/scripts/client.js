/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Puts all the tweets in tweet container section dynamically
  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
  };

  // prevents XSS with escaping
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement  = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
      <header>
        <div class="user">
          <div class>
            <img src=${escape(tweet.user.avatars)} alt="avatar">
            <span>${escape(tweet.user.name)}</span>
          </div>
          <span class="handle">${escape(tweet.user.handle)}</span>
        </div>
        <p>${escape(tweet.content.text)}</p>
      </header>
      <footer>
        <div>
          <span>${escape(tweet.created_at)}</span>
          <span>✅</span>
        </div>
      </footer>
    </article>
    `);

    return $tweet;
  };

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

 loadTweets()

});


