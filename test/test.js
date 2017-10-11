'use strict';

const assert = require('chai').assert;
const makeRoster = require('../rosterBots.js').makeRoster;
const makePlayers = require('../rosterBots.js').makePlayers;
const salaryCap = 175;
const playerMax = 100;
let stars=()=>{
  let min = Math.ceil(0);
  let max = Math.floor(16);
  return Math.floor(Math.random() * (max - min)) + min;
};

describe('makeRoster', ()=>{
  it('should be a function', ()=>{
    assert.isFunction(makeRoster, 'makeRoster is not a function');
  });
  it('should output an array', ()=>{
    assert.isArray(makeRoster(), 'makeRoster should return an array')
  });
  it('output should contain 15 player elements (uTAS)', ()=>{
    assert.lengthOf(makeRoster(), 15, "there should be 15 player elements")
  });
  it('output should contain players with unique uTAS', ()=>{
    let playerUTAS = makeRoster(stars());
    playerUTAS.sort().forEach((e,i,a)=>assert.notEqual(e, a[i-1], "uTAS must be unique"))
  });
  it(`sum of output should be below salary cap (${salaryCap})`, ()=>{
    let playerUTAS = makeRoster(stars());
    assert.isAtMost(playerUTAS.reduce((a,b)=>a+b), salaryCap, `total aggregate TAS cannot be greater than ${salaryCap}`)
  });
  it(`no single player uTAS can be greater than ${playerMax}`, ()=>{
    let playerUTAS = makeRoster(stars());
    playerUTAS.every(e=>assert.isAtMost(e, 100, `individual player uTAS cannot be greater than ${playerMax}`))
  });
});

describe('makePlayers', ()=>{
  it('should be a function', ()=>{
    assert.isFunction(makePlayers, 'makePlayer is not a function');
  });
  it('should output an array of objects', ()=>{
    let playerUTAS = makeRoster(stars());
    assert.isArray(makePlayers(playerUTAS), 'makePlayer should return an array');
    assert.isObject(makePlayers(playerUTAS)[stars], 'makePlayer should return an array of objects')
  });
  it('output should contain 15 player objects', ()=>{
    let playerUTAS = makeRoster(stars());
    assert.lengthOf(Object.keys(makePlayers(playerUTAS)), 15, "there should be 15 player objects")
  });
  it('output should contain players with unique names', ()=>{
    let playerUTAS = makeRoster(stars());
    makePlayers(playerUTAS).forEach((e,i,a)=>assert.notEqual(e.name, a[i-1].name, "player names must be unique"))
  });
  it('output should contain players with unique TAS', ()=>{
    let playerUTAS = makeRoster(stars());
    makePlayers(playerUTAS).forEach((e,i,a)=>assert.notEqual(e.TAS, a[i-1].TAS, "player TAS must be unique"))
  });
  it(`no single player TAS can be greater than ${playerMax}`, ()=>{
    let playerUTAS = makeRoster(stars());
    makePlayers(playerUTAS).every(e=>assert.isAtMost(e, 100, `individual player uTAS cannot be greater than ${playerMax}`))
  });
  it(`total players' aTAS should be below salary cap (${salaryCap})`, ()=>{
    let aTAS = 0;
    let playerUTAS = makeRoster(stars());
    makePlayers(playerUTAS).forEach(e=>aTAS += e.TAS);
    assert.isAtMost(aTAS, salaryCap, `total aggregate TAS cannot be greater than ${salaryCap}`)
  });
});