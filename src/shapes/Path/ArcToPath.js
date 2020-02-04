import BaseCommandPath from './BaseCommandPath'

export class ArcToPath extends BaseCommandPath {
  constructor(options = {}) {
    super(options)
    ArcToPath.validateParams(options)
    const { start, controls, radius } = options
    this.controls = controls || []
    this.radius = radius
    if (start) {
      this.start = start
    }
  }
  static validateParams(options = {}) {
    const { controls } = options
    if (!Array.isArray(controls)) {
      console.warn('ArcToPath `controls` props must be a array')
      return false
    }
    if (controls.length !== 2) {
      console.warn('ArcToPath `controls` props array length must be 2')
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
  clone() {
    const instance = super.clone()
    if (this.start) {
      instance.start = this.start.clone()
    }
    instance.radius = this.radius
    instance.controls = this.controls.map(v => v.clone())
    return instance
  }
}

export default ArcToPath