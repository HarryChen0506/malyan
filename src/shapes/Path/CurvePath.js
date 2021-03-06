import BaseCommandPath from './BaseCommandPath'
import Vector from '../../Vector'

export class CurvePath extends BaseCommandPath {
  constructor(options = {}) {
    super(options)
    CurvePath.validateParams(options)
    const { start, end, controls } = options
    this.controls = controls || []
    if (start) {
      this.start = start
    }
    this.end = end || new Vector({
      x: 0,
      y: 0,
    })
  }
  static validateParams(options = {}) {
    const { end, controls } = options
    if (!end || end.x === undefined || end.y === undefined) {
      console.warn('CurvePath `end` props must be not null in Path.createElements function')
      return false
    }
    if (!Array.isArray(controls)) {
      console.warn('CurvePath `controls` props must be a array')
      return false
    }
    return true
  }
  moveTo(ctx) {
    ctx.moveTo(this.start.x, this.start.y)
  }
  render(ctx) {
    if (this.start) {
      this.moveTo(ctx)
    }
    if (this.controls.length === 1) {
      ctx.quadraticCurveTo(
        this.controls[0].x,
        this.controls[0].y, 
        this.end.x, 
        this.end.y)
    } else if (this.controls.length === 2) {
      ctx.bezierCurveTo(
        this.controls[0].x, 
        this.controls[0].y, 
        this.controls[1].x, 
        this.controls[1].y, 
        this.end.x, 
        this.end.y)
    }
  }
  clone() {
    const instance = super.clone()
    if (this.start) {
      instance.start = this.start.clone()
    }
    instance.end = this.end.clone()
    instance.controls = this.controls.map(v => v.clone())
    return instance
  }
}

export default CurvePath