// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

// Card definitions
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

// 10-way trie data structure for fast card search
function cardFinder(cards) {
  var root;
  var R = 10;

  function Node(val) {
    return {
      'val': val,
      'next': new Array(R)
    };
  }

  function _get(node, key, i, val) {
    if (node === undefined) { return val; }
    if (node.val !== undefined) { val = node.val; }
    if (i === key.length) { return val; }
    c = key[i];
    return _get(node.next[c], key, i+1, val);
  }

  function _put(node, key, val, i) {
    if (node === undefined) { node = new Node(); }
    if (i === key.length) {
      node.val = val;
    } else {
      c = key[i];
      node.next[c] = _put(node.next[c], key, val, i+1);
    }
    return node;
  }

  function put(prefix, card) {
    root = _put(root, prefix, card, 0);
  }

  function build(cards) {
    for (let i = 0; i < cards.length; i++) {
      let card = {
        'name': cards[i].name,
        'lengths': {}
    };
      for (let j = 0; j < cards[i].lengths.length; j++) {
        let lo = cards[i].lengths[j].lo;
        let hi = cards[i].lengths[j].hi;
        for (let length = lo; length <= hi; length++) {
          card.lengths[length] = true;
        }
      }
      for (let j = 0; j < cards[i].prefixes.length; j++) {
        let lo = cards[i].prefixes[j].lo;
        let hi = cards[i].prefixes[j].hi;
        for (let prefix = lo; prefix <= hi; prefix++) {
          put(prefix.toString(), card);
        }
      }
    }
  }

  function get(cardNumber) {
    var len = cardNumber.length;
    var card = _get(root, cardNumber, 0);
    if (card !== undefined && len in card.lengths) {
      return card.name;
    }
  }

  build(cards);

  return get;
}

// Build trie and produce card finding function
// We can assume that most of the time consumed for running
// this script is in fact running this function.
// The assumption comes from the fact that this function runs in
// (C*P*l) + (C*L), where C is the number of card definitions,
// P is the entire range of prefixes for a given card definition,
// l is the length of each prefix in the prefix range for a given card definition,
// and L is the entire range of card number lengths for a given card definition.
var findCard = cardFinder(cards);

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.

  // Find the card network
  return findCard(cardNumber);
};