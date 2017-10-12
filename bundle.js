(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const makeRoster = require('./rosterBots.js').makeRoster;
const makePlayers = require('./rosterBots.js').makePlayers;

$(document).ready(() => {
  $('#team').hide();
  $('#submit').on('click', event => {
    event.preventDefault();
    let starNumber = $('#starNumber').val();
    let teamName = $('#teamName').val();
    let sorting = $('#sorting').val();
    let team = makePlayers(makeRoster(starNumber), teamName, sorting);
    team.forEach((player, index) => {
        let tableRow = $(`#${index}`);
        tableRow.append("<td/>");
        index < 10 ? tableRow.append("<td>Yes!</td>") : tableRow.append("<td>Not today...");
        Object.values(player).forEach(e => {
          let tableData = $("<td>");
          tableData.html(e);
          tableData.appendTo(tableRow);
        });
    });
    $('#team').show();
  });
});

},{"./rosterBots.js":2}],2:[function(require,module,exports){
let triangle = (n) => {
  return (n * n + n) / 2;
};

let getRandomInt = (max) => {
  let min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

let bubbleSort = (arr, key) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j - 1][`${key}`] < arr[j][`${key}`]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
};

let makeRoster = (starNumber, salaryCap) => {
  let results = [];

  if (!starNumber || starNumber < 1 && starNumber > 15) starNumber = 14;
  if (starNumber % 3 === 0) starNumber = 6;
  if (!salaryCap) salaryCap = 175;

  let bench = 15 - starNumber;
  let starPoints;

  for (let i = 0; i < bench; i++) {
    results.push(i);
  }
  results.length === 0 ? starPoints = salaryCap : starPoints = salaryCap - results.reduce((a, b) => a + b);

  while (starNumber > 0) {
    results.push(Math.ceil(starPoints / starNumber));
    results.sort();
    results.forEach((ele, ind, arr) => {
      if (arr[ind - 1] == ele) results[ind] += 1;
    });

    starPoints = salaryCap - results.reduce((a, b) => a + b);
    starNumber -= 1;
  }
  return results;
};

let makePlayers = (uTAS, teamName, sorting) => {
  if (!teamName) teamName = "BSS";
  if (!sorting) sorting = "byTAS";
  class Player {
    constructor(TAS, teamName) {
      this.name = teamName + TAS;
      this.TAS = TAS;
      this.speed = this.TAS - getRandomInt(TAS);
      this.strength = this.TAS - this.speed - getRandomInt(this.TAS - this.speed);
      this.agility = this.TAS - this.speed - this.strength;
    }
  }
  let team = uTAS.map(e => new Player(e, teamName));
  switch (sorting) {
    case "maxTAS":
    default:
      return bubbleSort(team, 'TAS');
    case "maxSpeed":
      return bubbleSort(team, 'speed');
    case "maxStrength":
      return bubbleSort(team, 'strength');
    case "maxAgility":
      return bubbleSort(team, 'agility');
  }
};

module.exports = {
  makeRoster,
  makePlayers
};
},{}]},{},[1]);
