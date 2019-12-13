
import Vector from './Vector'
import Matrix from './Matrix'
const defaultConfig = {
  fill: true,
  stroke: true,
  close: false,
  fillStyle: '#fff',
  strokeStyle: '#000',
  lineWidth: 1
}
class Shape {
  constructor(options = {}) {
    const config = { ...defaultConfig, ...options }
    const { fill, stroke, close, fillStyle, strokeStyle, lineWidth } = config
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
    this.close = close
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
    if (typeof this.fillStyle === 'function') {
      ctx.fillStyle = this.fillStyle(ctx)
    } else {
      ctx.fillStyle = this.fillStyle
    }
    if (typeof this.strokeStyle === 'function') {
      ctx.strokeStyle = this.strokeStyle(ctx)
    } else {
      ctx.strokeStyle = this.strokeStyle
    }
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
  calcFinalMatrix() {
    const matrices = [this.matrix]
    var parent = this.parent
    while (parent) {
      matrices.unshift(parent.matrix)
      parent = parent.parent
    }
    let finalMatrix = matrices[0].elements
    for (let i = 1; i < matrices.length; i++) {
      finalMatrix = Matrix.multiply(finalMatrix, matrices[i].elements)
    }
    // console.log('clacFinalMatrix', matrices, finalMatrix)
    return finalMatrix
  }
}

export default Shape