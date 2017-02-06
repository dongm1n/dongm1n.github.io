var string1 = "This is the first quote";
var string2 = "This is the second quote";
var string3 = "This is the third quote";
var newArray = new Array(string1, string2,  string3);
var randomQuote = document.getElementById("randomQuote");
function getQuote() {
  if(randomQuote != null)
    randomQuote.parentNode.removeChild(randomQuote);
  var rndNum = Math.floor(Math.random() * newArray.length-1) + 1;
  console.log(rndNum);
  var getQuoteParentElement = document.getElementById("appendQuote");
  var pickQuote = document.createElement("p");
  pickQuote.id = "randomQuote";
  pickQuote.innerHTML = newArray[rndNum];
  getQuoteParentElement.appendChild(pickQuote);
}
