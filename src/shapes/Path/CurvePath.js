import BaseCommandPath from './BaseCommandPath'

export class CurvePath extends BaseCommandPath {
  constructor(options = {}) {
    super(options)
    const { controls } = options
    if (!Array.isArray(controls)) {
      console.error('Curve controls must be a array')
    }
    this.controls = controls || []
  }
  render(ctx) {
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
}

export default CurvePath