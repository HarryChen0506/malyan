
import Vector from './Vector'
import Matrix from './Matrix'
const defaultConfig = {
  fill: true,
  stroke: true,
  fillStyle: '#fff',
  strokeStyle: '#000',
  lineWidth: 1
}
class Shape {
  constructor(options = {}) {
    const config = { ...defaultConfig, ...options }
    const { fill, stroke, fillStyle, strokeStyle, lineWidth } = config
    this.matrix = new Matrix().identity()
    this._translation = new Vector({
      x: 0,
      y: 0,
      onChange: this.onChange.bind(this)
    })
    this._scale = new Vector({
      x: 1,
      y: 1,
      onChange: this.onChange.bind(this)
    })
    this._rotation = 0
    this.fill = fill
    this.stroke = stroke
    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth
  }
  onChange() {
    this.matrix
      .identity()
      .translate(this.translation.x, this.translation.y)
      .scale(this.scale.x, this.scale.y)
      .rotate(this.rotation)
    // console.log('onChange transform', transform.toString())
  }
  setCtxProps(ctx) {
    ctx.fillStyle = this.fillStyle
    ctx.strokeStyle = this.strokeStyle
    ctx.lineWidth = this.lineWidth
  }
  get translation() {
    return this._translation
  }
  set translation(v = {}) {
    this._translation = new Vector({
      ...v,
      onChange: this.onChange.bind(this)
    })
    this.onChange()
  }
  get rotation() {
    return this._rotation
  }
  set rotation(v) {
    this._rotation = v
    this.onChange()
  }
  get scale() {
    return this._scale
  }
  set scale(v = { x: 1, y: 1 }) {
    this._scale = new Vector({
      ...v,
      onChange: this.onChange.bind(this)
    })
    this.onChange()
  }
}

export default Shape