// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var inRange = function(num, lo, hi) {
  return num >= lo && num <= hi;
};

var getPrefix = function(cardNumber, length) {
  return Number(cardNumber.substr(0, length));
};

var getLength = function(cardNumber) {
  return cardNumber.length;
};


// Test if the given cardNumber matches the card definition

// Since we are dealing with numerical characters (base 10) in strings,
// one way to improve the time complexity of card detection is to build
// an R-way trie data structure (no more than 10 child nodes per root)
// from the card prefixes, and query it with decreasing prefix lengths
// in order to solve the first loop in this method.
var isValid = function(card, cardNumber) {
  var len = getLength(cardNumber);
  for (let i = 0; i < card.prefixes.length; i++) {
    let pLo = card.prefixes[i].lo;
    let pHi = card.prefixes[i].hi;
    let pLen = pLo.toString().length;
    let pre = getPrefix(cardNumber, pLen);
    if (!inRange(pre, pLo, pHi)) {
      continue;
    }
    for (let j = 0; j < card.lengths.length; j++) {
      let lLo = card.lengths[j].lo;
      let lHi = card.lengths[j].hi;
      if (inRange(len, lLo, lHi)) {
        return true;
      }
    }
  }
  return false;
};

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.

  // Build our card definitions
  var cards = [
    {
      'name': "China UnionPay",
      'prefixes': [
        {'lo': 622126, 'hi': 622925},
        {'lo': 624, 'hi': 626},
        {'lo': 6282, 'hi': 6288}
      ],
      'lengths': [{'lo': 16, 'hi': 19}]
    },
    {
      'name': "Switch",
      'prefixes': [
        {'lo': 4903, 'hi': 4903},
        {'lo': 4905, 'hi': 4905},
        {'lo': 4911, 'hi': 4911},
        {'lo': 4936, 'hi': 4936},
        {'lo': 564182, 'hi': 564182},
        {'lo': 633110, 'hi': 633110},
        {'lo': 6333, 'hi': 6333},
        {'lo': 6759, 'hi': 6759},
      ],
      'lengths': [
        {'lo': 16, 'hi': 16},
        {'lo': 18, 'hi': 18},
        {'lo': 19, 'hi': 19},
      ]
    },
    {
      'name': "Maestro",
      'prefixes': [
        {'lo': 5018, 'hi': 5018},
        {'lo': 5020, 'hi': 5020},
        {'lo': 5038, 'hi': 5038},
        {'lo': 6304, 'hi': 6304},
      ],
      'lengths': [{'lo': 12, 'hi': 19}]
    },
    {
      'name': "Discover",
      'prefixes': [
        {'lo': 6011, 'hi': 6011},
        {'lo': 644, 'hi': 649},
        {'lo': 65, 'hi': 65}
      ],
      'lengths': [
        {'lo': 16, 'hi': 16},
        {'lo': 19, 'hi': 19}
      ]
    },
    {
      'name': "MasterCard",
      'prefixes': [{'lo': 51, 'hi': 55}],
      'lengths': [{'lo': 16, 'hi': 16}]
    },
    {
      'name': "American Express",
      'prefixes': [
        {'lo': 34, 'hi': 34},
        {'lo': 37, 'hi': 37}
      ],
      'lengths': [{'lo': 15, 'hi': 15}]
    },
    {
      'name': "Diner's Club",
      'prefixes': [{'lo': 38, 'hi': 39}],
      'lengths': [{'lo': 14, 'hi': 15}]
    },
    {
      'name': "Visa",
      'prefixes': [{'lo': 4, 'hi': 4}],
      'lengths': [
        {'lo': 13, 'hi': 13},
        {'lo': 16, 'hi': 16},
        {'lo': 19, 'hi': 19}
      ]
    },
  ];
  // Find the card network
  for (let i = 0; i < cards.length; i++) {
    if (isValid(cards[i], cardNumber)) {
      return cards[i].name;
    }
  }
};