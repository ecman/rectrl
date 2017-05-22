'use strict';
const rectrl = require('../');
const assert = require('assert');
const DELAY = 0.5;

function asyncAdder(num1, num2, callback) {
  if (typeof(num1) !== 'number' ||
      typeof(num2) !== 'number') {
    let err = new TypeError('Parameters must be numbers');
    setTimeout(() => callback(err, 0), 1000 * DELAY);
    return;
  }

  let total = num1 + num2;
  setTimeout(() => callback(null, total), 1000 * DELAY);
}

const recursiveAsyncAdderCaller = rectrl(
  (maybe, nums, index = 0, total = 0) => {

  if (index === nums.length) {
    console.log(`resolving total: ${total}`);
    maybe.resolve(total);
  } else {
    let num = nums[index];
    console.log(`Adding ${num} to total ${total}`);
    asyncAdder(num, total, (err, newTotal) => {
      if (err) {
        maybe.reject(err);
      } 
      else {
        maybe.resume(maybe, nums, index + 1, newTotal);
      }
    });
  }

});

recursiveAsyncAdderCaller([1, 2, 3, 4, 5])
  .then((sumTotal) => assert
    .strictEqual(sumTotal, 15, 
      `sumTotal should be 15 not ${sumTotal}`))
  .catch((err) => assert
    .fail(err, 15, `Got rejection: ${err.message}`))
      
recursiveAsyncAdderCaller([1, 2, 3, 4, '5'])
  .then((sumTotal) => assert
    .fail(sumTotal, 0, 'Rejections should not resolve'))
  .catch((err) => assert
    .ok(err));
