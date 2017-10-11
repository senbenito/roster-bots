'use strict';

const assert = require('chai').assert;
const makeRoster = require('../rosterBots.js').makeRoster;
const makePlayer = require('../rosterBots.js').makePlayer;

describe('makeRoster', ()=>{
  it('should be a function', ()=>{
    assert.isFunction(makeRoster, 'makeRoster is not a function');
  });
  it('should output an array', ()=>{
    assert.isArray(makeRoster(), 'makeRoster should return an array')
  });
  it('should contain 15 players', ()=>{
    assert.lengthOf(makeRoster(), 15, "there should be 15 player 'keys'")
  });
  it('should contain players with unique uTAS', ()=>{
    let playerUTAS = makeRoster().sort();
    playerUTAS.forEach((e,i,a) => assert.notEqual(e, a[i-1], "uTAS must be unique"))
  });
});

describe('makePlayer', ()=>{
  it('should be a function', ()=>{
    assert.isFunction(makePlayer, 'makePlayer is not a function');
  });
});
