---
title: API
type: api
---

### Malyan

* **Construction:** `( params : Object ) `  
  Create a new instance of Malyan where `params` is a object with several optional parameters listed below.
  The constructor also accepts no parameters at all.
  - **id:** `String | undefined` the id of the canvas html tag. Optional; defaults to `undefined`.
  - **dom:** `HTML Element` the HTML element of the canvas. Optional; defaults to `undefined`.
  - **width:** `Number` the width of the canvas . Optional; defaults to `300`.
  - **height:** `Number` the height of the canvas . Optional; defaults to `150`.
  - **ratio:** `Number` the pixel ratio of the canvas. Optional; defaults to `1`.
  - **autoRatio:** `Boolean` if autoRatio is `true`, the value of ratio will be computed by devicePixelRatio. Optional; defaults to `true`.
  - **autoClear:** `Boolean` Defines whether the renderer should automatically clear its output before rendering a frame. Optional; defaults to `true`.
  - **background:** `String | undefined` the property of canvas style. Optional; defaults to `undefined`.

* **Members:** 
  - **id:** `Number` the same as above
  - **dom:** `Number` the same as above
  - **width:** `Number` the same as above
  - **height:** `Number` the same as above
  - **ratio:** `Number` the same as above
  - **autoClear:** `Boolean` the same as above
  - **background:** `String | undefined` the same as above
  - **ctx:** `Object`  canvas context
  - **config:** `Object` construction arguments (width, height, ratio, autoRatio, autoClear, background...)
  - **scene:** `Object`  a new instance of [Scene](#Scene)
  - **tree:** `Object`  a new instance of [Tree](#Tree)
  - **eventManager:** `Object`  a new instance of [EventManager](#EventManager)
  
* **Methods:** 
  - **getSize:** `(): {width: Number, height: Number}`  
    return width and height of canvas.
  - **setSize:** `(width: Number, height: Number): null`  
    set width and height of canvas.
  - **getPixelRatio:** `(): Number`  
    return current device pixel ratio used.
  - **add:** `(object: Object, ...): null`
    add one or many shapes / groups to the instance. Objects can be added as arguments, new Malyan().add(o1, o2, oN), or as an array depicted above.  
  - **render:** `(): null`  
    render a scene.
  - **forEach:** `(callback: Function): null`  
    traverse objects Deep First by the way of preOrder.
* **Example:**

  ``` 
  var canvas = new Malyan({
    id: 'canvas',
    width: 500,
    height: 500,
    background: '#fff
  })
  ```

### Scene
* **Extends:** [Group](#group)

* **Construction:** `( params : Object ) `  
  Create a new instance of Scene.
  - **root:** `Malyan` the instance of Malyan.

* **Members:** 
  - **root:** `Malyan` the same as above

* **Methods:** 
  - **render:** `(): null`  
  render objects.

* **Example:**

  ``` 
  this.scene = new Scene({ name: 'root_group', root: this })
  ```

