'use strict';
const okmaybe = require('okmaybe');

module.exports = rectrl;

/**
 * Get a recursive function that returns a Promise
 * 
 * @param {function) recurser   - recursive function that accepts a maybe
 * @param {any} ...declareArgs  - 0 or more delcare-time arguments for the 
 *                                recurser. These come before caller arguments.
 * 
 * The recurser should accept a "maybe" as the first argument:
 *
 *    { resume, resolve, reject }
 *     
 *    resume:   reference to the recursive function
 *    resolve:  the promise resolve function
 *    reject:   the promise reject function
 * 
 * Additional parameters to the recurser will come after any
 * declare-time specified arguments:
 *
 *      const myfunc = rectrl((maybe, declareArg1, callerArg1) => {
 *           ... 
 *      }, declareArg1);
 *
 *      myfunc(...callerArgs).then(...)
 *
 * @return {function} accepting 0 or more caller arguments
 */
function rectrl(recurser, ...declareArgs) {
  return function (...userArgs) {
    let maybe = okmaybe();
    maybe.resume = recurser;
    recurser(maybe, ...declareArgs, ...userArgs);
    return maybe.promise;
  }
}
