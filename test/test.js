'use strict';

const assert = require('chai').assert;
const makeRoster = require('../rosterBots.js').makeRoster;
const makePlayer = require('../rosterBots.js').makePlayer;
let getRandomInt=(min, max)=>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

describe('makeRoster', ()=>{
  it('should be a function', ()=>{
    assert.isFunction(makeRoster, 'makeRoster is not a function');
  });
  it('should output an array', ()=>{
    assert.isArray(makeRoster(), 'makeRoster should return an array')
  });
  it('should contain 15 player uTAS', ()=>{
    assert.lengthOf(makeRoster(), 15, "there should be 15 player uTAS")
  });
  it('should contain players with unique uTAS', ()=>{
    let stars = getRandomInt(0,16);
    let playerUTAS = makeRoster(stars).sort();
    playerUTAS.forEach((e,i,a) => assert.notEqual(e, a[i-1], "uTAS must be unique"))
  });
});

describe('makePlayer', ()=>{
  it('should be a function', ()=>{
    assert.isFunction(makePlayer, 'makePlayer is not a function');
  });
});
