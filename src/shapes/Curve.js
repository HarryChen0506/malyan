/* eslint-disable */
import Shape from '../Shape'
import Vector from '../Vector'

export class Curve extends Shape {
  constructor(options = {}) {
    super(options)
    const { start, end, controls } = options
    this.start = start || new Vector({
      x: 0,
      y: 0,
    })
    this.end = end || new Vector({
      x: 20,
      y: 20,
    })
    if (!Array.isArray(controls)) {
      console.error('Curve controls must be a array')
    }
    this.controls = controls || []
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.moveTo(this.start.x, this.start.y)
    if (this.controls.length === 1) {
      ctx.quadraticCurveTo(this.controls[0].x, this.controls[0].y, this.end.x, this.end.y)
    } else if (this.controls.length === 2) {
      ctx.bezierCurveTo(this.controls[0].x, this.controls[0].y, this.controls[1].x, this.controls[1].y,this.end.x, this.end.y)
    }
    if (this.closed) {
      ctx.closePath()
    }
    this.stroke && ctx.stroke()
    this.fill && ctx.fill()
    ctx.restore()
  }
}

export default Curve