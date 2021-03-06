# Shannon Rivers' Roster Bots algorithm
Given the [assignment specifications](./Assignment.md) from Blue Star Sports, following is an outline of my Roster Bots algorithm implementation:

## "obligatory final product first picture."
[![Roster Bots by Shannon Rivers](/images/roster-bots.jpg)](http://htmlpreview.github.io/?https://github.com/senbenito/roster-bots/blob/master/index.html)

### Understanding the Question:
We need to create an algorithm that will create a robot `Player` consisting of four attributes:
  1. `.name`: _unique_, alphanumeric (i.e. 'ABC1234')
  1. `.speed`: 0-100
  3. `.strength`: 0-100
  4. `.agility`: 0-100
  5. Total Attribute Score (`.TAS` = Sp + St + Ag): <= 100

These players will make up a `Roster` that:
  1. contains 15 `Player`s
  2. all _unique_ `Player.TAS`
  3. `Roster` aggregate `TAS` <= 175
  4. can be sorted using any sorting algorithm

### Devising a Plan
Thinking about this `Roster`, it seems like we could have a spectrum of talent running
  - from a relatively balanced team where each of the 15 `Player`s receives an equal share of the total `Roster` points (175)
  - to a 'star-player' team where a few of the `Player`s receive a majority of the points with the remainder essentially 'filling out the `Roster`'

##### Owner's Choice!
>We'll create a `makeRoster(starNumber)` function that takes an integer allowing the Owner to concentrate points on a specified number of players (1 ... 15)

Which brings us to our `Player`s... each will have a share of the aggregate Total Attribute Score (`aTAS`), designated by the Owner pardigm (`starNumber`), to determine its unique Total Attribute Score (`uTAS`), so we'll use that algorithmically generated `uTAS` to portion out the `speed`, `strength` and `agility` attribute scores.

And, since the `uTAS` is by definition unique, we can use this number as a portion of the `Player.name` ensuring the `Player.name` is unique - _BOOM_!

##### Polymorphism at Play
>We can reuse the same `makePlayer()` function that takes an argument `uTAS` generated by the `makeRoster()` function that itself can be reused by supplying a different `starNumber` argument to determine the `Roster` attribute points distribution paradigm.

### Code a Solution
It seems like we have a good understanding of the task at hand as well as how we'll approach building our `Roster` of `Player`s so let's outline these functions we'll need:
1. `makeRoster(starNumber)`:
  + Input (**integer**): `starNumber` determines attribute point concentration
  + Output (**array**): fifteen _unique_ `uTAS` variables
  + Approach:
    1. subtract `starNumber` from 15 = `bench`
    2. use accumulator pattern: **object.uTAS = 0-`bench-1` points**;
    3. divide remaining points across `starNumber`:  **object.uTAS = math.Floor(remaining points / starNumber)**
2. `makePlayers(uTAS)`:
  + Input (**array**): `uTAS` array determines the total attribute points to use for each `Player` as well as the `Player.name`
  + Output (**array**): fifteen `Player` objects consisting of:
    + `name` = `ABC` + `uTAS`
    + `speed` = `uTAS` - `getRandomInt()`
    + `strength` = `uTAS` - `getRandomInt()`
    + `agility` = `uTAS` - (`speed` + `strength`)
  + Approach:
    1. `name` = `ABC` + `uTAS`
    2. `speed` = `uTAS` - `getRandomInt()`
    3. `strength` = `uTAS` - `getRandomInt()`
    4. `agility` = `uTAS` - (`speed` + `strength`)
```javascript
let getRandomInt = (max) => {
  let min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
```

### Check Your Work!
We can write some tests to ensure our code does the trick as we go; I like [`chai`](http://chaijs.com/):
```javascript
const assert = require('chai').assert;
const makeRoster = require('../rosterBots.js').makeRoster;
const makePlayers = require('../rosterBots.js').makePlayers;

assert.isFunction(makeRoster, 'makeRoster is a function');
assert.isFunction(makePlayers, 'makePlayers is a function');
  ...
```
Tests are written with the [`chai`](http://chaijs.com/) Assertion Library because we can easily get very specific with expressions and because I like supplying more error-context with messages: `assert(expression, message)`.

In order to test as many cases as possible, I created a random-number-generator function, `stars()`, in the testing file that is called to supply arguments for the `makeRoster()` function. Since `stars()` is invoked at each new `it` instantiation, we can test multiple possibilities.

In addition, rules that may change over the course of the seasons are variables (e.g. `salaryCap` & `playerMax`), allowing us to easily update tests for the latest legue policy.

### Extra features...
Code should be as flexible and reusable as possible, for these reasons I added in some features to the Roster Bot algorithm that will allow a measure of versatility for changing legaue rules and owner preferences:
+ [as above](#check-your-work), `test.js` contains two variables to accommodate league changes:
  + `salaryCap`, currently set to **175**
  +  `playerMax`, currently set to **100**
+ `makeRoster` takes an optional argument, [`starNumber`](#owner's-choice!), that allows an owner to concentrate atttribute points on a specified number of players
+ `makeRoster` also can adjust to new legue policy with an optional `salaryCap` argument
+ `makePlayers` takes an optional argument string, `'teamName'`, which allows a user to specify a string of choice to be included in all `Player.name` values.
+ `makePlayers` also allows a user to specifiy an optional bubble-sorting method string:
  + `'maxTAS'`: this argument, the default, orders the `makePlayers()` output array in descending order by `Player.TAS`
  + `'maxSpeed'`: this argument orders the `makePlayers()` output array in descending order by `Player.speed`
  + `'maxStrength'`: this argument orders the `makePlayers()` output array in descending order by `Player.strength`
  + `'maxAgility'`: this argument orders the `makePlayers()` output array in descending order by `Player.agility`
