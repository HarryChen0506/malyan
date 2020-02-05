---
title: API
type: api
---

### Malyan
* **Construction:** `( params : Object ) `  
  Create a new instance of Malyan where `params` is a object with several optional parameters listed below.
  The constructor also accepts no parameters at all.
  - **id:** `String | undefined` the id of the canvas HTML tag. Optional; defaults to `undefined`.
  - **dom:** `HTMLElement` the HTML element of the canvas. Optional; defaults to `undefined`.
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

### Group
* **Extends:** [Shape](#shape)

* **Construction:** `( params : Object ) `  
  Create a new instance of Group.

* **Members:** 
  the same as `Shape`

* **Methods:** 
  - **render:** `(): null`  
  render the children of this group.

### Shape
* **Extends:** [BaseObject](#baseobject) && [EventTarget](#eventtarget)

* **Construction:** `( params : Object ) `  
  Create a new instance of Group where `params` is a object with several optional parameters listed below.
  The constructor also accepts no parameters at all.
  - **fill:** `Boolean` Defines whether fill the shape. Optional; defaults to `true`.
  - **stroke:** `Boolean` Defines whether stroke the shape. Optional; defaults to `true`.
  - **closed:** `Boolean` Defines whether close the path of shape. Optional; defaults to `false`.
  - **fillStyle:** `String` The fillStyle property specifies the color, gradient, or pattern to use inside shapes. Optional; defaults to `#fff`.
  - **strokeStyle:** `String` The strokeStyle property specifies the color, gradient, or pattern to use for the strokes (outlines) around shapes. Optional; defaults to `#000`.
  - **lineWidth:** `Number` The lineWidth property sets the thickness of lines. Optional; defaults to `1`.
  - **opacity:** `Number` The opacity property specifies the alpha (transparency) value that is applied to shapes and images before they are drawn onto the canvas. Optional; defaults to `1`.
  - **shadowColor:** `String` The shadowColor property specifies the color of shadows. Optional; defaults to `rgba(0, 0, 0, 0)`.
  - **shadowOffsetX:** `Number` The shadowOffsetX property specifies the distance that shadows will be offset horizontally. Optional; defaults to `0`.
  - **shadowOffsetY:** `Number` The shadowOffsetX property specifies the distance that shadows will be offset vertically. Optional; defaults to `0`.
  - **shadowBlur:** `Number` The shadowBlur property specifies the amount of blur applied to shadows. Optional; defaults to `0`.
  - **lineCap:** `String` The lineCap `("butt" || "round" || "square")` property determines the shape used to draw the end points of lines. Optional; defaults to `butt`.
  - **lineJoin:** `String` The lineJoin `("bevel" || "round" || "miter")` property determines the shape used to join two line segments where they meet. Optional; defaults to `miter`.
  - **miterLimit:** `Number` The miterLimit property sets the miter limit ratio. Optional; defaults to `10`.
  - **lineDash:** `Array | undefined` Used as arguments of the setLineDash() method of the Canvas 2D API. Sets the line dash pattern used when stroking lines. It uses an array of values that specify alternating lengths of lines and gaps which describe the pattern. Optional; defaults to `undefined`.
  - **lineDashOffset:** `Number` The lineDashOffset property sets the line dash offset. Optional; defaults to `0`.
  - **penetrable:** `Boolean` Defines whether target has effect when event occured. like `pointer-events: none` in css. Optional; defaults to `false`.
  - **onBeforeRender:** `Function` hook execute before render.  Optional; defaults to ` () => {}`.
  - **onAfterRender:** `Function` hook execute after render.  Optional; defaults to ` () => {}`.

* **Members:** 
  - **fill:** `Boolean` the same as above
  - **stroke:** `Boolean` the same as above
  - **closed:** `Boolean` the same as above
  - **fillStyle:** `String` the same as above
  - **strokeStyle:** `String` the same as above
  - **lineWidth:** `Number` the same as above
  - **opacity:** `Number` the same as above
  - **shadowColor:** `String` the same as above
  - **shadowOffsetX:** `Number` the same as above
  - **shadowOffsetY:** `Number` the same as above
  - **shadowBlur:** `Number` the same as above
  - **lineCap:** `String` the same as above
  - **lineJoin:** `String` the same as above
  - **miterLimit:** `Number` the same as above
  - **lineDash:** `Array | undefined` the same as above
  - **lineDashOffset:** `Number` the same as above
  - **penetrable:** `Boolean` the same as above
  - **onBeforeRender:** `Function` the same as above
  - **onAfterRender:** `Function` the same as above
  - **matrix:** `Matrix` a new instance of [Matrix](#matrix), calculated by `_translation && _rotation && _scale`
  - **_translation:** `Vector` a new instance of [Vector](#vector), determines the distance of translation
  - **_scale:** `Vector` a new instance of [Vector](#vector), determines the amount of scale
  - **_rotation:** `Number` determines the amount of rotation

* **Methods:** 
  - **calcFinalMatrix:** `(): Matrix`  
    return this shape final matrix.
  - **calcCanvasToPixelCoordinatePoint:** `(targetPoint：[Number, Number]): relativePos:[Number, Number]`  
    converts a point in the canvas coordinate system to the pixel coordinate system
  - **calcPixelToCanvasCoordinatePoint:** `(targetPoint：[Number, Number]): relativePos:[Number, Number]`  
    converts a point in the pixel coordinate system to the canvas coordinate system
  - **calcPixelToParentCoordinatePoint:** `(targetPoint：[Number, Number]): relativePos:[Number, Number]`  
    converts a point in the pixel coordinate system to the parent object coordinate system
  - **calcParentToPixelCoordinatePoint:** `(targetPoint：[Number, Number]): relativePos:[Number, Number]`  
    converts a point in the parent object coordinate system to the pixel coordinate system
  - **getRoot:** `(): Malyan`  
    return a Malyan instance (new Scene().root).
  - **on:** `(type: String, callback: Function): null`  
    add event listener
  - **dispatch:** `(type: String, detail: Object): null`  
    trigger event
  - **off:** `(type: String, callback: Function): null`  
    remove event listener

### Vector

* **Construction:** `( params : Object ) `  
  Create a new instance of Vector.
  - **x:** `Number` the amount of x-axis. Optional; defaults to `0`.
  - **y:** `Number` the amount of y-axis.  Optional; defaults to `0`.
  - **onChange:** `Function` callback excute when x or y changed. Optional; defaults to `undefined`.

* **Members:** 
  - **x:** `Number` the same as above
  - **y:** `Number` the same as above
  - **onChange:** `Function` the same as above

* **Methods:** 
  - **set:** `(x: Number, y: Number): null`  
    set the value of x and y
  - **static formatPointIntoVector:** `(point: Array | Obeject): Vector`  
    return a Vector instance from a point ( `[0, 0]` or `{x: 0, y: 0}`).

### BaseObject
* **Construction:** `() ` 

* **Members:** 
  - **uuid:** `String` unique identifier
  - **children:** `Array` 
  - **parent:** `Object`

* **Methods:** 
  - **add:** `(object: Object, ...): null`
    add one or many shapes to the instance. Objects can be added as arguments, new BaseObject().add(o1, o2, oN), or as an array depicted above.
  - **remove:** `(object: Object, ...): null`
     remove one or many shapes to the instance. Objects can be added as arguments, new BaseObject().remove(o1, o2, oN), or as an array depicted above.

### EventTarget
* **Construction:** `() ` 

* **Members:** 
  - **listeners:** `Object`

* **Methods:** 
  - **addEventListener:** `(type: String, callback: Function): null`  
    add event listener
  - **dispatchEvent:** `(type: String, event: CustomEvent): null`  
    trigger event
  - **removeEventListener:** `(type: String, callback: Function): null`  
    remove event listener

---
### shapes
#### Rect
* **Extends:** [Shape](#shape)
* **Construction:** `( params : Object ) `  
  Create a new instance of Vector.
  - **x:** `Number` the x-axis value of left-top vertex. Optional; defaults to `0`.
  - **y:** `Number` the y-axis value of left-top vertex.  Optional; defaults to `0`.
  - **width:** `Number` the width of rect. Optional; defaults to `0`.
  - **height:** `Number` the height of rect. Optional; defaults to `0`.
  - **center:** `Boolean` Defines whether the position of rect is in the center. Optional; defaults to `true`.

* **Members:** 
  - **x:** `Number` the same as above
  - **y:** `Number` the same as above
  - **width:** `Number` the same as above
  - **height:** `Number` the same as above
  - **center:** `Boolean` the same as above

* **Methods:** 
  - **render:** `(ctx: CanvasRenderContext): null`  
    render rect.
  - **containPoint:** `(ctx: CanvasRenderContext, point: {x: Number, y: Number}): Boolean`  
    whether a point is inside of this rect.
  - **getBoundingClientRect:** `(): Object`  
    return this rect bounding client params. (width, height, top, bottom, left, right)
  - **getVertices:** `(): Object`  
    return this rect vertices. `[[0,0], [1,1],...]`
  - **setCenter:** `(): null`  
    let this rect position to be in center.