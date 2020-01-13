import BaseCommandPath from './BaseCommandPath'
import Vector from '../../Vector'

export class LinePath extends BaseCommandPath{
  constructor(options = {}) {
    super(options)
    const { start, end } = options
    LinePath.validateParams(options)
    if (start) {
      this.start = start
    }
    this.end = end || new Vector({
      x: 0,
      y: 0,
    })
  }
  static validateParams(options = {}) {
    const { end } = options
    if (!end || end.x === undefined || end.y === undefined) {
      console.error('LinePath `end` props must be not null in Path.createPaths function')
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
    ctx.lineTo(this.end.x, this.end.y)
  }
}

export default LinePath