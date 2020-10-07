/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }


  const createTweetElement  = function(tweet) {

    const $tweet = $(`
      <article class="tweet">
      <header>
        <div class="user">
          <div class>
            <img src=${tweet.user.avatars} alt="avatar">
            <span>${tweet.user.name}</span>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </div>
        <p>${tweet.content.text}</p>
      </header>
      <footer>
        <div>
          <span>${tweet.created_at}</span>
          <span>✅</span>
        </div>
      </footer>
    </article>
    `);

    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  $('#tweets-container').append($tweet);

});