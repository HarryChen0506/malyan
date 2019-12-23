/* eslint-disable */
import Shape from '../Shape'

export class Line extends Shape {
  constructor(options = {}) {
    super(options)
    const { name, x1, y1, x2, y2 } = options
    this.name = name
    this.x1 = x1 || 0
    this.y1 = y1 || 0
    this.x2 = x2 || 20
    this.y2 = y2 || 20
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    this.stroke && ctx.stroke()
    ctx.restore()
  }
}

export default Line