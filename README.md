# rectrl

[![build status](https://api.travis-ci.org/ecman/rectrl.png)](https://travis-ci.org/ecman/rectrl) [![codecov](https://codecov.io/gh/ecman/rectrl/branch/master/graph/badge.svg)](https://codecov.io/gh/ecman/rectrl) [![Code Climate](https://codeclimate.com/github/ecman/rectrl/badges/gpa.svg)](https://codeclimate.com/github/ecman/rectrl)

# DEPRECATED 

Provided functionality possible by this pattern:

```js
function myRecurser(arg) {
  return new Promise((resolve, reject) => {
    asyncCallback(arg, (result) => {
      if (result) resolve(result);
      else {
        let newArg;
        // Do stuff with newArg
        resolve(myRecursor(newArg));
      }
    });
  });
}
```
