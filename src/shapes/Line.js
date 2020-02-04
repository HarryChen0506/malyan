/* eslint-disable */
import Shape from '../Shape'
import Vector from '../Vector'

export class Line extends Shape {
  constructor(options = {}) {
    super(options)
    const { start, end } = options
    this.start = start ? Vector.formatPointIntoVector(start) : new Vector({ x: 0, y: 0 })
    this.end = end ? Vector.formatPointIntoVector(end) : new Vector({ x: 20, y: 20 })
  }
  render(ctx) {
    this.onBeforeRender && this.onBeforeRender(ctx)
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.moveTo(this.start.x, this.start.y)
    ctx.lineTo(this.end.x, this.end.y)
    this.stroke && ctx.stroke()
    ctx.restore()
    this.onAfterRender && this.onAfterRender(ctx)
  }
  clone() {
    const instance = super.clone()
    instance.start = this.start.clone()
    instance.end = this.end.clone()
    return instance
  }
}

export default Line