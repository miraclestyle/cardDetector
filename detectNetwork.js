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
    networkName: "China UnionPay",
    cardPrefixes: [
      {low: 622126, high: 622925},
      {low: 624, high: 626},
      {low: 6282, high: 6288}
    ],
    cardLengths: [{low: 16, high: 19}]
  },
  {
    networkName: "Switch",
    cardPrefixes: [
      {low: 4903, high: 4903},
      {low: 4905, high: 4905},
      {low: 4911, high: 4911},
      {low: 4936, high: 4936},
      {low: 564182, high: 564182},
      {low: 633110, high: 633110},
      {low: 6333, high: 6333},
      {low: 6759, high: 6759},
    ],
    cardLengths: [
      {low: 16, high: 16},
      {low: 18, high: 18},
      {low: 19, high: 19},
    ]
  },
  {
    networkName: "Maestro",
    cardPrefixes: [
      {low: 5018, high: 5018},
      {low: 5020, high: 5020},
      {low: 5038, high: 5038},
      {low: 6304, high: 6304},
    ],
    cardLengths: [{low: 12, high: 19}]
  },
  {
    networkName: "Discover",
    cardPrefixes: [
      {low: 6011, high: 6011},
      {low: 644, high: 649},
      {low: 65, high: 65}
    ],
    cardLengths: [
      {low: 16, high: 16},
      {low: 19, high: 19}
    ]
  },
  {
    networkName: "MasterCard",
    cardPrefixes: [{low: 51, high: 55}],
    cardLengths: [{low: 16, high: 16}]
  },
  {
    networkName: "American Express",
    cardPrefixes: [
      {low: 34, high: 34},
      {low: 37, high: 37}
    ],
    cardLengths: [{low: 15, high: 15}]
  },
  {
    networkName: "Diner's Club",
    cardPrefixes: [{low: 38, high: 39}],
    cardLengths: [{low: 14, high: 15}]
  },
  {
    networkName: "Visa",
    cardPrefixes: [{low: 4, high: 4}],
    cardLengths: [
      {low: 13, high: 13},
      {low: 16, high: 16},
      {low: 19, high: 19}
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
    var c = key[i];
    return _get(node.next[c], key, i+1, val);
  }

  function _put(node, key, val, i) {
    if (node === undefined) { node = Node(); }
    if (i === key.length) {
      node.val = val;
    } else {
      var c = key[i];
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
        networkName: cards[i].networkName,
        cardLengths: {}
    };
      for (let j = 0; j < cards[i].cardLengths.length; j++) {
        let low = cards[i].cardLengths[j].low;
        let high = cards[i].cardLengths[j].high;
        for (let cardLength = low; cardLength <= high; cardLength++) {
          card.cardLengths[cardLength] = true;
        }
      }
      for (let j = 0; j < cards[i].cardPrefixes.length; j++) {
        let low = cards[i].cardPrefixes[j].low;
        let high = cards[i].cardPrefixes[j].high;
        for (let cardPrefix = low; cardPrefix <= high; cardPrefix++) {
          put(cardPrefix.toString(), card);
        }
      }
    }
  }

  function get(cardNumber) {
    var cardLength = cardNumber.length;
    var card = _get(root, cardNumber, 0);
    if (card !== undefined && cardLength in card.cardLengths) {
      return card.networkName;
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