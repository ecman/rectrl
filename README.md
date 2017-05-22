# rectrl

[![build status](https://api.travis-ci.org/ecman/rectrl.png)](https://travis-ci.org/ecman/rectrl) [![codecov](https://codecov.io/gh/ecman/rectrl/branch/master/graph/badge.svg)](https://codecov.io/gh/ecman/rectrl) [![Code Climate](https://codeclimate.com/github/ecman/rectrl/badges/gpa.svg)](https://codeclimate.com/github/ecman/rectrl)

Create a recursive function that returns a Promise.

Intended for recursive functions making asynchronous calls.

# Usage

```js
const rectrl = require('rectrl');

function asyncAdder(num1, num2, callback) {
  if (typeof(num1) !== 'number' ||
      typeof(num2) !== 'number') {
    let err = new TypeError('Parameters must be numbers');
    setTimeout(() => callback(err, 0), 1000);
    return;
  }

  let total = num1 + num2;
  setTimeout(() => callback(null, total), 1000);
}

const asyncAdderCaller = rectrl(
  (maybe, nums, index = 0, total = 0) => {

  if (index === nums.length) {
    console.log(`resolving total: ${total}`);
    maybe.resolve(total);

  } else {
    let num = nums[index];
    console.log(`Adding ${num} to total ${total}`);
    asyncAdder(num, total, (err, newTotal) => {
      if (err) {
        rmaybe.reject(err);
      } 
      else {
        maybe.resume(maybe, nums, index + 1, newTotal);
      }
    });
  }

});

let numbers = [1, 2, 3, 4, 5];
asyncAdderCaller(numbers)
  .then((total) => console.log(`Total = ${total}`));
```

Output:

```text
adding 1 to running total 0
adding 2 to running total 1
adding 3 to running total 3
adding 4 to running total 6
adding 5 to running total 10
resolving total: 15
Total = 15
```      

Catch example:

```js
// following asyncAdder() and asyncAdderCaller () 
// from above

let numbers = [1, 2, 3, 4, "5"];
asyncAdderCaller(numbers)
  .then((total) => console.log(`Total = ${total}`))
  .catch((err) => console.log(`Error: ${err.message}`));
```

Catch output:

```text
adding 1 to total 0
adding 2 to total 1
adding 3 to total 3
adding 4 to total 6
adding 5 to total 10
Error: Parameters must be numbers
```
