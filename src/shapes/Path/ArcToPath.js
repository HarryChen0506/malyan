import BaseCommandPath from './BaseCommandPath'

export class ArcToPath extends BaseCommandPath {
  constructor(options = {}) {
    super(options)
    const { start, controls, radius } = options
    ArcToPath.validateParams(options)
    this.controls = controls || []
    this.radius = radius
    if (start) {
      this.start = start
    }
  }
  static validateParams(options = {}) {
    const { controls } = options
    if (!Array.isArray(controls)) {
      console.error('ArcToPath `controls` props must be a array')
      return false
    }
    if (controls.length !== 2) {
      console.error('ArcToPath `controls` props array length must be 2')
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
    ctx.arcTo(
      this.controls[0].x,
      this.controls[0].y,
      this.controls[1].x,
      this.controls[1].y,
      this.radius
    )
  }
}

export default ArcToPath