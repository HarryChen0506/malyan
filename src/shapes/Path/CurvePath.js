import Vector from '../../Vector'

export class CurvePath {
  constructor(options = {}) {
    const { name, id, start, end, controls } = options
    this.name = name
    this.id = id
    this.start = start || end || new Vector({
      x: 0,
      y: 0,
    })
    this.end = end || new Vector({
      x: 0,
      y: 0,
    })
    if (!Array.isArray(controls)) {
      console.error('Curve controls must be a array')
    }
    this.controls = controls || []
    this.offsetX = 0
    this.offsetY = 0
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
  setOffset(x, y) {
    if (x !== undefined) {
      this.offsetX = x
    }
    if (y !== undefined) {
      this.offsetY = y
    }
  }
}

export default CurvePath