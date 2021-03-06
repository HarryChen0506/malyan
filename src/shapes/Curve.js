/* eslint-disable */
import Shape from '../Shape'
import Vector from '../Vector'

export class Curve extends Shape {
  constructor(options = {}) {
    super(options)
    const { start, end, controls = [] } = options
    this.start = start ? Vector.formatPointIntoVector(start) : new Vector({ x: 0, y: 0 })
    this.end = end ? Vector.formatPointIntoVector(end) : new Vector({ x: 20, y: 20 })
    if (!Array.isArray(controls)) {
      console.error('Curve controls must be a array')
      this.controls = []
    } else {
      this.controls = controls.map(v => Vector.formatPointIntoVector(v))
    }
  }
  render(ctx) {
    this.onBeforeRender && this.onBeforeRender(ctx)
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.moveTo(this.start.x, this.start.y)
    if (this.controls.length === 1) {
      ctx.quadraticCurveTo(this.controls[0].x, this.controls[0].y, this.end.x, this.end.y)
    } else if (this.controls.length === 2) {
      ctx.bezierCurveTo(this.controls[0].x, this.controls[0].y, this.controls[1].x, this.controls[1].y, this.end.x, this.end.y)
    }
    if (this.closed) {
      ctx.closePath()
    }
    this.stroke && ctx.stroke()
    this.fill && ctx.fill()
    ctx.restore()
    this.onAfterRender && this.onAfterRender(ctx)
  }
  clone({ deep = true } = {}) {
    const instance = super.clone({ deep })
    instance.start = this.start.clone()
    instance.end = this.end.clone()
    instance.controls = this.controls.map(v => v.clone())
    return instance
  }
}

export default Curve