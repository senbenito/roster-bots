let triangle = (n) => {
  return (n * n + n) / 2;
};

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

let makePlayers = (uTAS) => {

};

module.exports = {
  makeRoster,
  makePlayer
};
