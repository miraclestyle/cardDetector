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
  var result = {
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
    '419': "Visa"
  };
  // Extract first prefixes and calcualte lenght
  var prefixOne = cardNumber.substr(0, 1);
  var prefixTwo = cardNumber.substr(0, 2);
  var length = cardNumber.length.toString();
  // Build token
  var tokenOne = prefixOne+length;
  var tokenTwo = prefixTwo+length;
  if (result[tokenOne] === undefined) {
    return result[tokenTwo];
  } else {
    return result[tokenOne]
  }
};


