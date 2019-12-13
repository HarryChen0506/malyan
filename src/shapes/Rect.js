import EventTarget from '../events/EventTarget'
import Shape from '../Shape'
import triggerEvent from '../events/triggerEvent'
import { mix } from '../utils/extend'

export class Rect extends mix(Shape, EventTarget) {
  constructor(options = {}) {
    super(options)
    const { name, x, y, width, height } = options
    this.name = name
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.rect(this.x, this.y, this.width, this.height)
    this.fill && ctx.fill()
    this.stroke && ctx.stroke()
    ctx.restore()
  }
  on(type, callback) {
    this.addEventListener(type, callback)
  }
  fire(type) {
    triggerEvent(this, type)
  }
}

export default Rect