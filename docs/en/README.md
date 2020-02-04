
Malyan
========

[![NPM package][npm]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][build-status]][build-status-url]
[![Coverage Status][coverage-status]][coverage-status-url]
[![MIT License][license-image]][license-url]

### JavaScript Canvas 2D library ###

 Malyan is a lightweight canvas 2D library that makes it easy to work with HTML5 canvas element.

 Benefit from **interactive object model**，Malyan allows you to easily create simple geometrical shapes like rectangles, circles and other polygons or more complex shapes made up of many paths in `<canvas>` HTML element. It also allows you to manipulate the size, position and rotation of these objects. It’s also possible to change some of the attributes of these objects such as their color, opacity, etc.

 Malyan also provides an extensive event system, starting from low-level "mouse" events (click, mousedrag, mouseEnter, etc) to high-level objects ones (object:mousemove, object:mousedrag).

 [Home](https://harrychen0506.github.io/malyan/) • 
 [Examples](https://harrychen0506.github.io/malyan/examples/) • 
 [Documentation](https://harrychen0506.github.io/malyan/docs/en/) • 
 [中文文档](https://harrychen0506.github.io/malyan/docs/cn/) • 
 [Help](https://github.com/HarryChen0506/malyan/issues?labels=question)


### Development ###

* Dev build

You will have to clone directly from GitHub and build `malyan` yourself if you want to use the latest dev build.

``` bash
git clone https://github.com/HarryChen0506/malyan.git
cd malyan
npm install
npm run build
```

* Update docs

``` 
npm run docs
```

### Change log ###

[Change Log](https://github.com/HarryChen0506/malyan/blob/master/CHANGELOG.md)

### License ###

[MIT](https://github.com/HarryChen0506/malyan/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/malyan.svg
[npm-url]: https://www.npmjs.com/package/malyan
[npm-downloads-image]: http://img.shields.io/npm/dm/malyan.svg?style=flat
[build-status]: https://www.travis-ci.org/HarryChen0506/malyan.svg?branch=master
[build-status-url]: https://www.travis-ci.org/HarryChen0506/malyan
[coverage-status]: https://coveralls.io/repos/github/HarryChen0506/malyan/badge.svg?branch=master
[coverage-status-url]: https://coveralls.io/github/HarryChen0506/malyan?branch=master
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://github.com/HarryChen0506/malyan/blob/master/LICENSE