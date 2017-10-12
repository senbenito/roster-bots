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
