/* jshint esversion: 6 */

function hideQuoteBox() {
  $('#quote-actions, #quote-text').hide();
  $('#spinner').show();
}

function showQuoteBox() {
  $('#spinner').hide();
  $('#quote-text, #quote-actions').show();
}

function quoteHandler(data) {
  const quoteText = data.quoteText.trim(),
        quoteAuthor = '~' + (data.quoteAuthor.trim() || 'Anonymous'),
        quoteMachineUrl = 'http://s.codepen.io/TylerMoeller/debug/WQGjvO',
        tweetText = encodeURIComponent(quoteText + ' ' + quoteAuthor + ' ' + quoteMachineUrl),
        tweetUrl = 'https://\ttwitter.com/intent/tweet?text=' + tweetText, // '\t' bypasses adblock
        wikiUrl = 'https://en.wikipedia.org/wiki/' + data.quoteAuthor.trim().replace(/\s/g, '_');

  // Twitter has a 140 character limit + 23 characters allowed for the URL = 163.
  if (tweetText.length > 163) {
    getQuote();
    return;
  }

  // Populate the HTML 
  $('#quote').text(quoteText);
  $('#author').text(quoteAuthor);
  $('#tweetLink').attr('href', tweetUrl);
  $('#wikiLink').attr('href', wikiUrl);
  
  // Initialize tooltips and add click handler for dismissing them on mobile
  $('.tooltipped').tooltip({ delay: 50 }).click(() => $('.tooltipped').blur());
  
  // Show the quote!
  showQuoteBox();
}

function error(err) {
  $('#quote').html('Error: ' + err.status + ' (' + err.statusText + '). ' + 
                   'Please try again later.');
  $('#author').html('~ Random Quote Machine');

  if (window.location.protocol === 'https:') {
    $('#quote').html('The Forismatic Quotes API does not support HTTPS. ' + 
                     'Please open this page over HTTP instead.');
  }

  showQuoteBox();
  $('#quote-actions').hide();
}

// Get a quote from the Forismatic API
function getQuote() {
  hideQuoteBox();

  // Throttle connection attempts to 1 quote per second
  setTimeout(() => {
    $.getJSON('//api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?')
      .done(quoteHandler)
      .fail(error);
  }, 1000);
}

$(document).ready(getQuote);
