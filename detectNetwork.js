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

  // Build our cards structure
  // Objects can get us the fastest access to the data that we are looking for
  // Objects return undefined for non-existing props by default
  var diners = {
    'name': "Diner's Club",
    'lengths': {
      '14': true,
      '15': true
    },
    'prefixes': {
      '38': true,
      '39': true
    }
  };
  var amex = {
    'name': "American Express",
    'lengths': {'15': true},
    'prefixes': {
      '34': true,
      '37': true
    }
  };
  var mastercard = {
    'name': "MasterCard",
    'lengths': {'16': true},
    'prefixes': {
      '51': true,
      '52': true,
      '53': true,
      '54': true,
      '55': true
    }
  };
  var visa = {
    'name': "Visa",
    'lengths': {
      '13': true,
      '16': true,
      '19': true
    },
    'prefixes': {'4': true}
  };
  var discover = {
    'name': "Discover",
    'lengths': {
      '16': true,
      '19': true
    },
    'prefixes': {
      '6011': true,
      '644-649': true,
      '645': true,
      '646': true,
      '647': true,
      '648': true,
      '649': true,
      '65': true
    }
  };
  var maestro = {
    'name': "Maestro",
    'lengths': {
      '12': true,
      '13': true,
      '14': true,
      '15': true,
      '16': true,
      '17': true,
      '18': true,
      '19': true
    },
    'prefixes': {
      '5018': true,
      '5020': true,
      '5038': true,
      '6304': true
    }
  };
  var cards = {
    '38': diners,
    '39': diners,
    '34': amex,
    '37': amex,
    '51': mastercard,
    '52': mastercard,
    '53': mastercard,
    '54': mastercard,
    '55': mastercard,
    '4': visa,
    '6011': discover,
    '644': discover,
    '645': discover,
    '646': discover,
    '647': discover,
    '648': discover,
    '649': discover,
    '65': discover,
    '5018': maestro,
    '5020': maestro,
    '5038': maestro,
    '6304': maestro
  };
  // Find the card network
  var prefixLengths = [1, 2, 3, 4];
  var length = cardNumber.length.toString();
  var tokens = [];
  for (let i = 0; i < prefixLengths.length; i++) {
    let l = prefixLengths[i];
    let prefix = cardNumber.substr(0, l);
    let card = cards[prefix];
    if (card !== undefined && card.lengths[length] !== undefined) {
      return card.name;
    }
  }
};


