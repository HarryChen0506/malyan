malyan
========

[![NPM package][npm]][npm-url]

#### JavaScript Canvas 2D library ####

 **Malyan** is a lightweight canvas 2D library that makes it easy to work with HTML5 canvas element.

 Benefit from **interactive object model**，Malyan allows you to easily create simple geometrical shapes like rectangles, circles and other polygons or more complex shapes made up of many paths in `<canvas>` HTML element. It also allows you to manipulate the size, position and rotation of these objects. It’s also possible to change some of the attributes of these objects such as their color, opacity, etc.

 **Malyan** also provides an extensive event system, starting from low-level "mouse" events (click, mousedrag, mouseEnter, etc) to high-level objects ones (object:mousemove, object:mousedrag).

 [Home](https://malyanjs.github.io/) • 
 [Examples](https://malyanjs.github.io/examples/) • 
 [Documentation](https://malyanjs.github.io/docs/en/) • 
 [中文文档](https://malyanjs.github.io/docs/cn/) • 
 [Help](https://github.com/HarryChen0506/malyan/issues?labels=question)

### Usage ###

This code creates a scene, and it adds the rect to the scene.

```javascript
import * as Malyan from 'malyan'

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
rect.translation = { x: 100, y: 100 }
canvas.add(rect)

function animateLoop() {
  canvas.render()
  requestAnimationFrame(animateLoop)
}
animateLoop()

```
### development ###
- update docs
```
  $ npm run docs
```

[npm]: https://img.shields.io/npm/v/malyan.svg
[npm-url]: https://www.npmjs.com/package/malyan
