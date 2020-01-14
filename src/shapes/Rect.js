import Shape from '../Shape'
import math from '../utils/math'

const defaultConfig = {
  center: true
}
export class Rect extends Shape {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    const { x, y, width, height, center } = config
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
    if (center) {
      this.center()
    }
  }
  render(ctx) {
    this.onBeforeRender && this.onBeforeRender(ctx)
    // render
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.rect(this.x, this.y, this.width, this.height)
    this.fill && ctx.fill()
    this.stroke && ctx.stroke()
    ctx.restore()
    // afterRender
    this.onAfterRender && this.onAfterRender(ctx)
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    // ctx.save()
    // ctx.beginPath()
    // ctx.rect(this.x, this.y, this.width, this.height)
    // ctx.restore()
    const path = new Path2D()
    path.rect(this.x, this.y, this.width, this.height)
    if (ctx.isPointInPath(path, point.x, point.y)) {
      return true
    }
    return false
  }
  getBoundingClientRect() {
    const pixelVertices = this.getVertices()
    const parentVertices = pixelVertices.map(v => {
      const point = this.calcPixelToParentCoordinatePoint(v)
      return [point.x, point.y]
    })
    const { left, right, top, bottom } = math.calcPointsRect(parentVertices)
    const res = {
      left,
      right,
      top,
      bottom,
      width: right - left,
      height: bottom - top
    }
    return res
  }
  getVertices() {
    return [
      [this.x, this.y],
      [this.x + this.width, this.y],
      [this.x + this.width, this.y + this.height],
      [this.x, this.y + this.height]
    ]
  }
  center() {
    this.translation.x = - this.width * 0.5
    this.translation.y = - this.height * 0.5
  }
}

export default Rect