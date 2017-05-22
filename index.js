'use strict';
const okmaybe = require('okmaybe');

module.exports = rectrl;

function rectrl(recurser, ...declareArgs) {
  return function (...userArgs) {
    let maybe = okmaybe();
    maybe.resume = recurser;
    recurser(maybe, ...declareArgs, ...userArgs);
    return maybe.promise;
  }
}
