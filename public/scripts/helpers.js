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
        <span>🚩🔷💙</span>
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




//
const multiple = function(event) {
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

}


















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

