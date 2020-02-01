Malyan
========

[![NPM package][npm]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][build-status]][build-status-url]
[![MIT License][license-image]][license-url]

### JavaScript Canvas 2D library ###

 Malyan is a lightweight canvas 2D library that makes it easy to work with HTML5 canvas element.

 Benefit from **interactive object model**，Malyan allows you to easily create simple geometrical shapes like rectangles, circles and other polygons or more complex shapes made up of many paths in `<canvas>` HTML element. It also allows you to manipulate the size, position and rotation of these objects. It’s also possible to change some of the attributes of these objects such as their color, opacity, etc.

 Malyan also provides an extensive event system, starting from low-level "mouse" events (click, mousedrag, mouseEnter, etc) to high-level objects ones (object:mousemove, object:mousedrag).

 [Home](https://malyanjs.github.io/) • 
 [Examples](https://malyanjs.github.io/examples/) • 
 [Documentation](https://malyanjs.github.io/docs/en/) • 
 [中文文档](https://malyanjs.github.io/docs/cn/) • 
 [Help](https://github.com/HarryChen0506/malyan/issues?labels=question)

### Usage ###

  + Download the latest [minified library](https://github.com/HarryChen0506/malyan/releases) and include it in your html.

``` html
  // Direct Download
  <script src="js/malyan.min.js"></script>
```

  + [Unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM.

``` html
    // CDN
    <script src="https://unpkg.com/malyan"></script>
    // or use a specific version/tag via URLs
    <script src="https://unpkg.com/malyan@0.0.3/dist/malyan.min.js"></script>
```

  + Install with NPM

``` bash
    npm install malyan --save
```

### Example ###

Here is a HTML boilerplate for rendering a rectangle in malyan:

``` html
<!DOCTYPE html>
<html>

<body>
    <canvas id="canvas"></canvas>
    <script src="https://unpkg.com/malyan"></script>
    <script>
        var canvas = new Malyan({
            id: 'canvas',
            width: 500,
            height: 500,
        })

        var rect = new Malyan.Rect({
            name: 'rect',
            x: 0,
            y: 0,
            width: 60,
            height: 80,
            fillStyle: 'rgba(64, 196, 255, 0.2)',
            strokeStyle: '#40c4ff',
            lineWidth: 2,
        })
        rect.translation = {
            x: 100,
            y: 100
        }
        rect.on('mousedrag', function(e) {
            rect.translation = {
                x: rect.translation.x + e.detail.deltaPoint.canvas.x,
                y: rect.translation.y + e.detail.deltaPoint.canvas.y
            }
        })
        canvas.add(rect)

        function animateLoop() {
            canvas.render()
            requestAnimationFrame(animateLoop)
        }
        animateLoop()
    </script>
</body>

</html>
```

### Complex Examples ###

[more examples](https://malyanjs.github.io/examples/)

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
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

