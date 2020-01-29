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

* **Construction:** 
  - **Shape:** `( points : Array ) `
    points -- (optional) array of Vector2s.

    Creates a Shape from the points. The first point defines the offset, then successive points are added to the curves array as LineCurves.

    If no points are specified, an empty shape is created and the .currentPoint is set to the origin.

* **Properties:** 
  - **name:** `{Function} [callback]`  
    name deom

* **Methods:** 
  - **name:** `( matrix : Matrix4 ) : null`  
    name deom

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

* **Properties:** 
  - **name:** `{Function} [callback]`  
    name deom

* **Methods:** 
  - **name:** `( matrix : Matrix4 ) : null`  
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

