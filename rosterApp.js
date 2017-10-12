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
