---
title: API
type: api
---

### demo

* **Type:** `Array<string> | Object` 

* **Arguments:**
  + `{Function} [callback]` 
  + `{Object} [context]` 

* **Returns:** the set value.

* **Restriction:** 

  Only accepts `Function` when used in a component definition.

* **Details:**

  Only works in development mode.

  Provide an alternative render output when the default render function encounters an error. The error will be passed to renderError as the second argument. This is particularly useful when used together with hot-reload.

* **Example:**

  

``` 
  console.log(123)
  ```

* **See also:** [Props]()

### Shape

This is the base class for creating all drawable shapes in two.js. Unless specified methods return their instance of Two. Path for the purpose of chaining.

* **Construction:** 

  var two = new Two(params); 
  Create a new instance of Two where params is a JavaScript object with several optional parameters listed below:
    - `{Function} [callback]` 
    - `{Object} [context]` 

    ```
    fill: true,
    stroke: true,
    closed: false,
    fillStyle: '#fff',
    strokeStyle: '#000',
    lineWidth: 1,
    opacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    lineDash: undefined,
    lineDashOffset: 0,
    penetrable: false,
    onBeforeRender: () => {},
    onAfterRender: () => {},
    ```

* **Props:** 
  - **name:** `{Function} [callback]` 
    name deom

## shapes

### Rect

### silent

* **Type:** `boolean` 

* **Default:** `false` 

* **Usage:**

  

``` js
  Vue.config.silent = true
```

  Suppress all Vue logs and warnings.

### circle

* Type: 

  {Function} (createElement: () => VNode) => VNode

* Parameters
  + {string} event
  + {Function} callback

* Details

Only works in development mode.

Provide an alternative render output when the default render function encounters an error. The error will be passed to renderError as the second argument. This is particularly useful when used together with hot-reload.

* Example

``` 
console.log(123)
```

