let triangle = (n) => {
  return (n * n + n) / 2;
};

let getRandomInt = (max) => {
  let min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let makeRoster = (starNumber, max) => {
  let results = [];

  if (!starNumber || starNumber < 1 && starNumber > 15) starNumber = 14;
  if (starNumber % 3 === 0) starNumber = 6;
  if (!max) max = 175;

  let bench = 15 - starNumber;
  let starPoints;

  for (let i = 0; i < bench; i++) {
    results.push(i);
  }
  results.length === 0 ? starPoints = max : starPoints = max - results.reduce((a, b) => a + b);

  while (starNumber > 0) {
    results.push(Math.ceil(starPoints / starNumber));
    results.sort();
    results.forEach((ele,ind,arr)=> {
      if (arr[ind - 1] == ele) results[ind] += 1;
    });

    starPoints = max - results.reduce((a, b) => a + b);
    starNumber -= 1;
  }
  return results;
};

let makePlayers = (uTAS, teamName) => {
  if (!teamName) teamName = "BSS";
  class Player {
    constructor(TAS, teamName){
      this.name = teamName + TAS;
      this.TAS = TAS;
      this.speed = this.TAS - getRandomInt(TAS);
      this.strength = this.TAS - this.speed - getRandomInt(this.TAS - this.speed);
      this.agility = this.TAS - this.speed - this.strength;
    }
  }
  let team = uTAS.map(e=> new Player(e,teamName));
  return team;
};

module.exports = {
  makeRoster,
  makePlayers
};
