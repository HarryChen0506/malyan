/* eslint-disable */
import Shape from '../../Shape'
import Vector from '../../Vector'
import CurvePath from './CurvePath'
import LinePath from './LinePath'

export class Path extends Shape {
  constructor(options = {}) {
    super(options)
    const { name, paths } = options
    this.name = name
    this.paths = paths || []
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    // begin draw path
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    const firstPath = this.paths[0]
    if (firstPath) {
      ctx.moveTo(firstPath.start.x, firstPath.start.y)
    }
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].render(ctx)
    }
    if (this.closed) {
      ctx.closePath()
    }
    this.stroke && ctx.stroke()
    this.fill && ctx.fill()
    ctx.restore()
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    ctx.save()
    ctx.beginPath()
    const firstPath = this.paths[0]
    if (firstPath) {
      ctx.moveTo(firstPath.start.x, firstPath.start.y)
    }
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].render(ctx)
    }
    if (this.closed) {
      ctx.closePath()
    }
    ctx.restore()
    if (ctx.isPointInPath(point.x, point.y)) {
      return true
    }
    return false
  }
}
Path.Curve = CurvePath
Path.Line = LinePath

export default Path