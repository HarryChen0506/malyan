import Shape from '../Shape'
import math from '../utils/math'

const defaultConfig = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  center: true
}
export class Rect extends Shape {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    Object.keys(defaultConfig).forEach(key => {
      this[key] = config[key]
    })
    if (this.center) {
      this.setCenter()
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
  setCenter() {
    this.translation.x = - this.width * 0.5
    this.translation.y = - this.height * 0.5
  }
  clone({ deep = true } = {}) {
    const instance = super.clone({ deep })
    Object.keys(defaultConfig).forEach(key => {
      instance[key] = this[key]
    })
    return instance
  }
}

export default Rect