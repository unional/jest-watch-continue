# jest-watch-continue

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Mentioned in Awesome Jest](https://awesome.re/mentioned-badge.svg)](https://github.com/jest-community/awesome-jest)

[![Build status][circleci-image]][circleci-url]
[![Codecov][codecov-image]][codecov-url]

[![Greenkeeper badge][green-keeper-image]][green-keeper-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

Run tests in continue mode.

In continue mode, all passed test suites will be skipped and only run the remaining test suites.
It helps you focus on what's getting everything to pass once.

This is especially useful if you are dealing with some fragile tests or systems.

While you may introduce regression along the way,
let's deal with them later.

It works great with `bail`.

Requires `jest@23+`.

## Usage

To use `jest-watch-continue`,
add it to the `watchPlugins` section of the Jest configuration:

```js
{
  "jest": {
    "watchPlugins": [
      "jest-watch-continue", // or
      ["jest-watch-continue", {
        "key": "n",
        "prompt": "start continue mode"
      }]
    ]
  }
}
```

In watch mode, press `n` to starts or ends continue mode.

```
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press n to start continue mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

[npm-image]: https://img.shields.io/npm/v/jest-watch-continue.svg?style=flat
[npm-url]: https://npmjs.org/package/jest-watch-continue
[downloads-image]: https://img.shields.io/npm/dm/jest-watch-continue.svg?style=flat
[downloads-url]: https://npmjs.org/package/jest-watch-continue
[circleci-image]: https://circleci.com/gh/unional/jest-watch-continue/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/jest-watch-continue/tree/master
[codecov-image]: https://codecov.io/gh/unional/jest-watch-continue/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/jest-watch-continue
[green-keeper-image]: https://badges.greenkeeper.io/unional/jest-watch-continue.svg
[green-keeper-url]: https://greenkeeper.io/
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
