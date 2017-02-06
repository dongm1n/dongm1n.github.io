// Random Quote Generator

var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

var fetchQuote = function(data){
    if(data.quoteAuthor == ''){
    data.quoteAuthor = 'Unknown Author';
  }
  $(".Author").text(data.quoteAuthor);
  $(".Quote").text(data.quoteText);

  var tweet = 'https://twitter.com/intent/tweet?text=' + data.quoteText + ' ' + data.quoteAuthor;

  $(".twitter-share").attr("href", tweet);
}
$(document).ready(function(){
   $.getJSON(url, fetchQuote, 'jsonp');
});

$("#fetch").click(function(){
   $.getJSON(url, fetchQuote, 'jsonp')
});
