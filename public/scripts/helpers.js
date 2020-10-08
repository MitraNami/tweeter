// Puts the number (with color red if nagative) in the innerText of target
const counterDisplay = (target, num) => {
  if (num < 0) {
    target.addClass('red-counter');
  } else {
    target.removeClass('red-counter');
  }
  target.text(num);
};


// Prevents XSS with escaping
const escape =  str => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};




// Creates a tweet jQuery object given a tweet object
const createTweetElement  = tweet => {
  const $tweet = $(`
    <article class="tweet">
    <header>
      <div class="user">
        <div>
          <img src=${tweet.user.avatars} alt="avatar">
          <span>${escape(tweet.user.name)}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </div>
      <p>${escape(tweet.content.text)}</p>
    </header>
    <footer>
      <div>
        <span>${new Date(tweet.created_at)}</span>
        <span class="icons">🚩🔷💙</span>
      </div>
    </footer>
  </article>
  `);
  return $tweet;
};


// Puts all the tweets in tweet container section dynamically
const renderTweets = tweets => {
  tweets.forEach((tweet) => {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  });
};


// Fetches tweets from /tweets page
const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then((tweetsJson) => {
    renderTweets(tweetsJson)
  });
};




// Slides down an Error box if the tweet text is empty or over 140 characters and returns
// false; slides the Error up if the second message complies with the rules and returns true
const validateLength = (formElement) => {
  $errorLabel = $(formElement).parent().find('p');
  $errorLabel.slideUp();
  
  const text = $(formElement).find('textarea').val();
  const textLength = text.length;
  if (!textLength) {
    $errorLabel.text('Please write something.');
    $errorLabel.slideDown();
    return false;
  } else if (textLength > 140) {
    $errorLabel.text('You have exceeded character limit!');
    $errorLabel.slideDown();
    return false;
  }
  return true;
};


// Sends the tweet text to the server if it's not empty or over the limit
const sendTweet = function(event) {
  event.preventDefault();
  // tweet validation
  const isValidTweet = validateLength(this); //'this' would have been document for an arrow function

  if (isValidTweet) {
    const data = $(this).serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data
    }).then (() => {
      $(this).find('textarea').val(''); // Empty out the text area
      $(this).find('output.counter').text('140'); //Reset the counter
      $('#tweets-container').empty();
      loadTweets();
    });
  }
};




// Toggles down the write new section in a type-ready mode or pulls it up if
//it's already down
const writeNewTweet = () => {
  $newTweet = $('section.new-tweet');
 if ($newTweet.css('display') === 'none') {
   $newTweet.slideDown();
   $('#tweet-text').focus();
 } else {
   $newTweet.slideUp();
 }
};

