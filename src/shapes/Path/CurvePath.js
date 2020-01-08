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
        this.controls[0].x + this.offsetX,
        this.controls[0].y + this.offsetY, 
        this.end.x + this.offsetX, 
        this.end.y + this.offsetY)
    } else if (this.controls.length === 2) {
      ctx.bezierCurveTo(
        this.controls[0].x + this.offsetX, 
        this.controls[0].y + this.offsetY, 
        this.controls[1].x + this.offsetX, 
        this.controls[1].y + this.offsetY, 
        this.end.x + this.offsetX, 
        this.end.y + this.offsetY)
    }
  }
}

export default CurvePath