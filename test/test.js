'use strict';

const assert = require('chai').assert;
const makeRoster = require('../rosterBots.js').makeRoster;
const makePlayer = require('../rosterBots.js').makePlayer;

describe('makeRoster', function() {
  it('should be a function', ()=>{
    assert.typeOf(makeRoster, 'function', 'makeRoster is a function');
  });
});

describe('makePlayer', function() {
  it('should be a function', ()=>{
    assert.typeOf(makePlayer, 'function', 'makePlayer is a function');
  });
});
