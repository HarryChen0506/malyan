import { EVENTS, triggerEvent } from '../index'
import Matrix from '../../Matrix'
// import _ from '../../utils/tool'
// import math from '../../utils/math'

export default class MouseDispatchers {
  constructor({ element, root }) {
    this.element = element
    this.root = root
    this.target = null
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
        const isInPath = node.containPoint && node.containPoint(this.root.ctx, relativePos)
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
  mouseMove = (e) => {
    // console.log('MouseDispatchers mouseMove', e.detail.event.clientX)
    const mouse = e.detail.currentPoint.canvas
    // const canvas = math.pageToCanvas(this.element, e.detail.event.clientX, e.detail.event.clientY)
    let object = null
    this.root.tree.traverseDF_preOrder((node) => {
      if (node) {
        const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
        const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
        const isInPath = node.containPoint && node.containPoint(this.root.ctx, relativePos)
        if (isInPath) {
          object = node
          node.fire &&
            node.fire(EVENTS.MOUSE_MOVE, {
              ...e.detail,
              target: node
            })
        }
      }
    })
    // root event
    triggerEvent(this.element, EVENTS.OBJECT_MOUSE_MOVE, {
      ...e.detail,
      target: object
    })

    if (this.target) {
      this.target.fire(EVENTS.MOUSE_DRAG, {
        ...e.detail,
        target: this.target
      })
      this.target.fire(EVENTS.MOUSE_MOVE, {
        ...e.detail,
        target: this.target
      })
      triggerEvent(this.element, EVENTS.OBJECT_MOUSE_DRAG, {
        ...e.detail,
        target: this.target
      })
    }
  }
  mouseDown = (e) => {
    // console.log('mouseDown', e)
    const mouse = e.detail.startPoint.canvas
    let object = null
    this.root.tree.traverseDF_preOrder((node) => {
      if (node) {
        // console.log('node', node.name, node.calcFinalMatrix())
        const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
        const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
        const isInPath = node.containPoint && node.containPoint(this.root.ctx, relativePos)
        if (isInPath) {
          object = node
        }
      }
    })
    this.target = object
    triggerEvent(this.element, EVENTS.OBJECT_MOUSE_DOWN, {
      ...e.detail
    })
  }
  mouseUp = (e) => {
    triggerEvent(this.element, EVENTS.OBJECT_MOUSE_UP, {
      ...e.detail
    })
  }
  enable() {
    this.element.addEventListener(EVENTS.ROOT_CLICK_PRIVATE, this.mouseClick)
    this.element.addEventListener(EVENTS.ROOT_MOUSE_DOWN_PRIVATE, this.mouseDown)
    this.element.addEventListener(EVENTS.ROOT_MOUSE_MOVE_PRIVATE, this.mouseMove)
    this.element.addEventListener(EVENTS.ROOT_MOUSE_UP_PRIVATE, this.mouseUp)
  }
  disable() {
    this.element.removeEventListener(EVENTS.ROOT_CLICK_PRIVATE, this.mouseClick)
    this.element.removeEventListener(EVENTS.ROOT_MOUSE_DOWN_PRIVATE, this.mouseDown)
    this.element.removeEventListener(EVENTS.ROOT_MOUSE_MOVE_PRIVATE, this.mouseMove)
    this.element.removeEventListener(EVENTS.ROOT_MOUSE_UP_PRIVATE, this.mouseUp)
  }
}
