/* eslint-disable */
import Shape from '../Shape'
import Vector from '../Vector'

export class Line extends Shape {
  constructor(options = {}) {
    super(options)
    const { start, end } = options
    this.start = start || new Vector({
      x: 0,
      y: 0,
    })
    this.end = end || new Vector({
      x: 20,
      y: 20,
    })
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.moveTo(this.start.x, this.start.y)
    ctx.lineTo(this.end.x, this.end.y)
    this.stroke && ctx.stroke()
    ctx.restore()
  }
}

export default Line