import { EVENTS, triggerEvent } from '../index'
import Matrix from '../../Matrix'
// import _ from '../../utils/tool'
// import math from '../../utils/math'

export default class MouseDispatchers {
  constructor({ element, root }) {
    this.element = element
    this.root = root
    this.dragTarget = null
    this.enable()
  }
  mouseClick = (e) => {
    // console.log('MouseDispatchers click', this, e)
    // ROOT_CLICK
    const mouse = e.detail.startPoint.canvas
    let object = null
    this.root.tree.traverseDF_preOrder((node) => {
      if (node) {
        // console.log('node', node.name, node.calcFinalMatrix())
        const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
        const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
        const isInPath = node.containPoint && node.containPoint(this.root.cacheCtx, relativePos)
        if (isInPath) {
          object = node
          node.fire &&
            node.fire(EVENTS.CLICK, {
              ...e.detail,
              target: node
            })
        }
      }
    })
    // emit root click event
    triggerEvent(this.element, EVENTS.OBJECT_CLICK, {
      ...e.detail,
      target: object
    })
  }
  mouseDrag = (e) => {
    // console.log('MouseDispatchers mouseDrag', e.detail.event.clientX)
    if (this.dragTarget) {
      this.dragTarget.fire(EVENTS.MOUSE_DRAG, {
        ...e.detail,
        target: this.dragTarget
      })
      this.dragTarget.fire(EVENTS.MOUSE_MOVE, {
        ...e.detail,
        target: this.dragTarget
      })
      triggerEvent(this.element, EVENTS.OBJECT_MOUSE_DRAG, {
        ...e.detail,
        target: this.dragTarget
      })
    }
  }
  mouseMove = (e) => {
    const mouse = e.detail.currentPoint.canvas
    let object = null
    this.root.tree.traverseDF_preOrder((node) => {
      if (node) {
        const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
        const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
        const isInPath = node.containPoint && node.containPoint(this.root.cacheCtx, relativePos)
        if (isInPath) {
          object = node
          node.isCurrentMouseIn = true
          if (node.isLastMouseIn === false) {
            // mouseenter
            typeof node.fire === 'function' &&
              node.fire(EVENTS.MOUSE_ENTER, {
                ...e.detail,
                target: node
              })
            node.isLastMouseIn = true
          }
          typeof node.fire === 'function' &&
            node.fire(EVENTS.MOUSE_MOVE, {
              ...e.detail,
              target: node
            })
        } else {
          node.isCurrentMouseIn = false
          if (node.isLastMouseIn === true) {
            // mouseleave
            typeof node.fire === 'function' &&
              node.fire(EVENTS.MOUSE_LEAVE, {
                ...e.detail,
                target: node
              })
            node.isLastMouseIn = false
          }
        }
      }
    })
    // root event
    triggerEvent(this.element, EVENTS.OBJECT_MOUSE_MOVE, {
      ...e.detail,
      target: object
    })
  }
  mouseDown = (e) => {
    // console.log('mouseDown', e)
    const mouse = e.detail.startPoint.canvas
    this.root.tree.traverseDF_preOrder((node) => {
      if (node) {
        // console.log('node', node.name, node.calcFinalMatrix())
        const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
        const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
        const isInPath = node.containPoint && node.containPoint(this.root.cacheCtx, relativePos)
        if (isInPath) {
          this.dragTarget = node
        }
      }
    })
    triggerEvent(this.element, EVENTS.OBJECT_MOUSE_DOWN, {
      ...e.detail
    })
  }
  mouseUp = (e) => {
    this.dragTarget = null
    triggerEvent(this.element, EVENTS.OBJECT_MOUSE_UP, {
      ...e.detail
    })
  }
  enable() {
    this.element.addEventListener(EVENTS.ROOT_CLICK_PRIVATE, this.mouseClick)
    this.element.addEventListener(EVENTS.ROOT_MOUSE_DOWN_PRIVATE, this.mouseDown)
    this.element.addEventListener(EVENTS.ROOT_MOUSE_MOVE_PRIVATE, this.mouseMove)
    this.element.addEventListener(EVENTS.ROOT_MOUSE_DRAG_PRIVATE, this.mouseDrag)
    this.element.addEventListener(EVENTS.ROOT_MOUSE_UP_PRIVATE, this.mouseUp)
  }
  disable() {
    this.element.removeEventListener(EVENTS.ROOT_CLICK_PRIVATE, this.mouseClick)
    this.element.removeEventListener(EVENTS.ROOT_MOUSE_DOWN_PRIVATE, this.mouseDown)
    this.element.removeEventListener(EVENTS.ROOT_MOUSE_MOVE_PRIVATE, this.mouseMove)
    this.element.removeEventListener(EVENTS.ROOT_MOUSE_DRAG_PRIVATE, this.mouseDrag)
    this.element.removeEventListener(EVENTS.ROOT_MOUSE_UP_PRIVATE, this.mouseUp)
  }
}
