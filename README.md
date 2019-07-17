# jest-watch-roll

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][circleci-image]][circleci-url]
[![Codecov][codecov-image]][codecov-url]

[![Greenkeeper badge][green-keeper-image]][green-keeper-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

Keep the ball rolling.
It will automatically skip previously passed test suites until everything are passed.

Combining with `bail` and `fail`,
it can help you focus on what's matter until you get one pass on everything.

While you may introduce regression along the way,
let's deal with them later.

Requires `jest@23+`.

## Usage

To use `jest-watch-roll`,
add it to the `watchPlugins` section of the Jest configuration:

```js
{
  "jest": {
    "watchPlugins": [
      "jest-watch-roll", // or
      ["jest-watch-roll", { "key": "o", "prompt": "enter test rolling mode." }]
    ]
  }
}
```

In watch mode, press `o` to enter or exit the roll mode.

```
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press o to enter test rolling mode.
 › Press Enter to trigger a test run.
```


[npm-image]: https://img.shields.io/npm/v/jest-watch-roll.svg?style=flat
[npm-url]: https://npmjs.org/package/jest-watch-roll
[downloads-image]: https://img.shields.io/npm/dm/jest-watch-roll.svg?style=flat
[downloads-url]: https://npmjs.org/package/jest-watch-roll
[circleci-image]: https://circleci.com/gh/unional/jest-watch-roll/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/jest-watch-roll/tree/master
[codecov-image]: https://codecov.io/gh/unional/jest-watch-roll/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/jest-watch-roll
[green-keeper-image]:
https://badges.greenkeeper.io/unional/jest-watch-roll.svg
[green-keeper-url]:https://greenkeeper.io/
[semantic-release-image]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
