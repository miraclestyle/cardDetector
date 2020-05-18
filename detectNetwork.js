// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.

  // Build our case structure
  // JS objects return undefined for non-existing props by default
  var cards = {
    '3814': "Diner's Club",
    '3914': "Diner's Club",
    '3415': "American Express",
    '3715': "American Express",
    '5116': "MasterCard",
    '5216': "MasterCard",
    '5316': "MasterCard",
    '5416': "MasterCard",
    '5516': "MasterCard",
    '413': "Visa",
    '416': "Visa",
    '419': "Visa",
    '601116': "Discover",
    '601119': "Discover",
    '644-64916': "Discover",
    '644-64919': "Discover",
    '6516': "Discover",
    '6519': "Discover"
  };
  // Build tokens from prefixes and lenght
  var prefixLengths = [1, 2, 4, 7];
  var length = cardNumber.length.toString();
  var tokens = [];
  for (let i = 0; i < prefixLengths.length; i++) {
    let l = prefixLengths[i];
    let prefix = cardNumber.substr(0, l);
    tokens.push(prefix+length);
  }
  // Find the card network
  var i = 0;
  var result;
  while (i < 4 && result === undefined) {
    result = cards[tokens[i]];
    i = i + 1;
  }
  return result;
};


