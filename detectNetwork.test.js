/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
var FILL_ME_IN = 'Fill this value in';

var getInfoMessage = function(cardPrefix, cardLength) {
  return `has a prefix of ${cardPrefix} and a length of ${cardLength}`;
};

var testCardSample = function(cardPrefix, cardLength, cardNetwork) {
  var cardTailTemplate = '12345678901234567890';
  var cardSufixLength = cardLength - cardPrefix.toString().length;
  var cardSufix = cardTailTemplate.substr(0, cardSufixLength);
  var cardSample = cardPrefix.toString() + cardSufix;
  return detectNetwork(cardSample) === cardNetwork;
};

describe('Introduction to Mocha Tests - READ ME FIRST', function() {
  // A Mocha test is just a function!
  // If the function throws an error when run, it fails.
  // If it doesn't throw an error when run, it doesn't fail.
  // To read more about mocha, visit mochajs.org

  // Once you've read and understood this section, please comment it out.
  // You will not be able to proceed with a failing test.
  /*
  it('Throws an error so it fails', function() {
    throw new Error('Delete me!');
  });

  it('Doesn\'t throw an error, so it doesn\'t fail', function() {
    // This test doesn't really test anything at all! It will pass no matter what.
    var even = function(num){
      return num/2 === 0;
    }
    return even(10) === true;
  });

  // In tests, we want to compare the expected behavior to the actual behavior.
  // A test should only fail if the expected behavior doesn't match the actual.
  it('Throws an error when expected behavior does not match actual behavior', function() {
    var even = function(num){
      return num/2 === 0;
    }

    if(even(10) !== true) {
      throw new Error('10 should be even!');
    }
  });
  */
});
describe('Diner\'s Club', function() {
  // Be careful, tests can have bugs too...

  it(getInfoMessage('38', '14'), function() {
    // throw new Error('Delete me!');

    if (detectNetwork('38345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }
  });

  it(getInfoMessage('39', '14'), function() {
    if (detectNetwork('39345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }

  });
});

describe('American Express', function() {
  // It can get annoying to keep typing the if/throw, so here is a
  // helper function to throw an error if the input statement isn't true.
  var assert = function(isTrue) {
    if(!isTrue) {
      throw new Error('Test failed');
    }

  };

  it(getInfoMessage('34', '15'), function() {
    assert(detectNetwork('343456789012345') === 'American Express');
  });

  it(getInfoMessage('37', '15'), function() {
    assert(detectNetwork('373456789012345') === 'American Express');
  });
});

describe('Visa', function() {
  // Chai is an entire library of helper functions for tests!
  // Chai provides an assert that acts the same as our previous assert.
  // Search the documentation to figure out how to access it.
  //   http://chaijs.com/
  var assert = chai.assert;


  it(getInfoMessage('4', '13'), function() {
    assert(detectNetwork('4123456789012') === 'Visa', 'Test failed');
  });

  it(getInfoMessage('4', '16'), function() {
    assert(detectNetwork('4123456789012345') === 'Visa', 'Test failed');
  });

  it(getInfoMessage('4', '19'), function() {
    assert(detectNetwork('4123456789012345678') === 'Visa', 'Test failed');
  });
});

describe('MasterCard', function() {
  // Chai lets you write more human-readable tests that throw helpful errors.
  // Expect syntax is one way to do this, but there are others.
  // If you want to know more, check out the documentation.
  //   http://chaijs.com/api/bdd/
  var expect = chai.expect;

  it(getInfoMessage('51', '16'), function() {
    expect(detectNetwork('5112345678901234')).to.equal('MasterCard');
  });

  it(getInfoMessage('52', '16'), function() {
    expect(detectNetwork('5212345678901234')).to.equal('MasterCard');
  });

  it(getInfoMessage('53', '16'), function() {
    expect(detectNetwork('5312345678901234')).to.equal('MasterCard');
  });


  // You can also use should instead of expect, which changes the style
  // slightly. It really doesn't matter which one you use - check out
  // http://chaijs.com/guide/styles/ for more info, but it's important
  // to be consistent (unlike in this file, where we use BOTH expect
  // and should, but that's just for learning), so once you've gotten
  // these tests to pass using should syntax, refactor your tests to
  // use either expect or should, but not both.
  //var should = chai.should();

  it(getInfoMessage('54', '16'), function() {
    expect(detectNetwork('5412345678901234')).to.equal('MasterCard');
  });

  it(getInfoMessage('55', '16'), function() {
    expect(detectNetwork('5512345678901234')).to.equal('MasterCard');
  });

});

describe('Discover', function() {
  // Tests without a function will be marked as "pending" and not run
  // Implement these tests (and others) and make them pass!
  var expect = chai.expect;

  it(getInfoMessage('6011', '16'), function() {
    expect(detectNetwork('6011123456789012')).to.equal('Discover');
  });
  it(getInfoMessage('6011', '19'), function() {
    expect(detectNetwork('6011123456789012345')).to.equal('Discover');
  });

  for (let prefix = 644; prefix <= 649; prefix++) {
    let cardLength16 = prefix + '1234567890123';
    let cardLength19 = prefix + '1234567890123456';
    it(getInfoMessage(prefix, '16'), function() {
      expect(detectNetwork(cardLength16)).to.equal('Discover');
    });
    it(getInfoMessage(prefix, '19'), function() {
      expect(detectNetwork(cardLength19)).to.equal('Discover');
    });
  }

  it(getInfoMessage('65', '16'), function() {
    expect(detectNetwork('6512345678901234')).to.equal('Discover');
  });
  it(getInfoMessage('65', '19'), function() {
    expect(detectNetwork('6512345678901234567')).to.equal('Discover');
  });

});

describe('Maestro', function() {
  // Write full test coverage for the Maestro card
  var assert = chai.assert;
  var failureMessage = 'Test Failed';

  for (let len = 12; len <= 19; len++) {
    it(getInfoMessage('5018', len), function() {
      assert(testCardSample('5018', len, 'Maestro'), failureMessage);
    });
    it(getInfoMessage('5020', len), function() {
      assert(testCardSample('5020', len, 'Maestro'), failureMessage);
    });
    it(getInfoMessage('5038', len), function() {
      assert(testCardSample('5038', len, 'Maestro'), failureMessage);
    });
    it(getInfoMessage('6304', len), function() {
      assert(testCardSample('6304', len, 'Maestro'), failureMessage);
    });
  }
});

describe('China UnionPay', function() {
  var assert = chai.assert;
  var failureMessage = 'Test Failed';

  for (let len = 16; len <= 19; len++) {
    for (let prefix = 622126; prefix <= 622925; prefix++) {
      it(getInfoMessage(prefix, len), function() {
        assert(testCardSample(prefix, len, 'China UnionPay'), failureMessage);
      });
    }
    for (let prefix = 624; prefix <= 626; prefix++) {
      it(getInfoMessage(prefix, len), function() {
        assert(testCardSample(prefix, len, 'China UnionPay'), failureMessage);
      });
    }
    for (let prefix = 6282; prefix <= 6288; prefix++) {
      it(getInfoMessage(prefix, len), function() {
        assert(testCardSample(prefix, len, 'China UnionPay'), failureMessage);
      });
    }
  }
});

describe('Switch', function() {
  var assert = chai.assert;
  var failureMessage = 'Test Failed';

  var cardLengths = [16, 18, 19];
  var cardPrefixes = [
    '4903', '4905', '4911', '4936',
    '564182', '633110', '6333', '6759'];

  for (let i = 0; i < cardLengths.length; i++) {
    for (let j = 0; j < cardPrefixes.length; j++){
      let len = cardLengths[i];
      let prefix = cardPrefixes[j];
      it(getInfoMessage(prefix, len), function() {
        assert(testCardSample(prefix, len, 'Switch'), failureMessage);
      });
    }
  }
});
