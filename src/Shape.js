
import Vector from './Vector'
import Matrix from './Matrix'
import BaseObject from './BaseObject'
import { mix } from './utils/extend'
import { EventTarget, triggerEvent } from './events'
import _ from './utils/tool'

const defaultConfig = {
  fill: true,
  stroke: true,
  closed: false,
  fillStyle: '#fff',
  strokeStyle: '#000',
  lineWidth: 1,
  opacity: 1,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 0,
  lineCap: 'butt',
  lineJoin: 'miter',
  miterLimit: 10,
  lineDash: undefined,
  lineDashOffset: 0,
  penetrable: false,
  onBeforeRender: () => {},
  onAfterRender: () => {},
}

class Shape extends mix(BaseObject, EventTarget) {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    this.name = config.name
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
    // preset property
    Object.keys(defaultConfig).forEach(key => {
      this[key] = config[key]
    })
    // mouse
    this.isCurrentMouseIn = false // is mouse in shape currently
    this.isLastMouseIn = false // is mouse in shape last time
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

    if (this.stroke) {
      if (this.lineWidth) {
        ctx.lineWidth = this.lineWidth
      }
      if (this.lineDash) {
        ctx.setLineDash(this.lineDash)
      }
      if (this.miterLimit) {
        ctx.miterLimit = this.miterLimit
      }
      if (this.lineJoin) {
        ctx.lineJoin = this.lineJoin
      }
      if (this.lineCap) {
        ctx.lineCap = this.lineCap
      }
    }

    if (_.isNumber(this.opacity)) {
      ctx.globalAlpha = this.opacity
    }

    if (this.shadowColor !== defaultConfig.shadowColor) {
      ctx.shadowColor = this.shadowColor
      if (_.isNumber(this.shadowOffsetX)) {
        ctx.shadowOffsetX = this.shadowOffsetX
      }
      if (_.isNumber(this.shadowOffsetY)) {
        ctx.shadowOffsetY = this.shadowOffsetY
      }
      if (_.isNumber(this.shadowBlur)) {
        ctx.shadowBlur = this.shadowBlur
      }
    }
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
    if (_.isNumber(v)) {
      v = { x: v, y: v }
    }
    this._scale = new Vector({
      ...v,
      onChange: this.onChange.bind(this)
    })
    this.onChange()
  }
  calcFinalMatrix() {
    const matrices = [this.matrix]
    let parent = this.parent
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
  calcCanvasToPixelCoordinatePoint(targetPoint = [0, 0]) {
    if (!Array.isArray(targetPoint)) {
      console.error('calcCanvasToPixelCoordinatePoint params must be Array')
    }
    const inverted_matrix = Matrix.invert(this.calcFinalMatrix())
    const relativePos = Matrix.multiply(inverted_matrix, [targetPoint[0], targetPoint[1], 1])
    return relativePos
  }
  calcPixelToCanvasCoordinatePoint(targetPoint = [0, 0]) {
    if (!Array.isArray(targetPoint)) {
      console.error('calcPixelToCanvasCoordinatePoint params must be Array')
    }
    const matrix = this.calcFinalMatrix()
    return Matrix.multiply(matrix, [targetPoint[0], targetPoint[1], 1])
  }
  calcPixelToParentCoordinatePoint(targetPoint = [0, 0]) {
    if (!Array.isArray(targetPoint)) {
      console.error('calcPixelToParentCoordinatePoint params must be Array')
    }
    return Matrix.multiply(this.matrix.elements, [targetPoint[0], targetPoint[1], 1])
  }
  calcParentToPixelCoordinatePoint(targetPoint = [0, 0]) {
    if (!Array.isArray(targetPoint)) {
      console.error('calcPixelToParentCoordinatePoint params must be Array')
    }
    const inverted_matrix = Matrix.invert(this.matrix.elements)
    const relativePos = Matrix.multiply(inverted_matrix, [targetPoint[0], targetPoint[1], 1])
    return relativePos
  }
  static calcPixelToSpecificCoordinatePoint(targetPoint = [0, 0], matrix = new Matrix().identity().elements) {
    if (!Array.isArray(targetPoint)) {
      console.error('calcPixelToParentCoordinatePoint params must be Array')
    }
    return Matrix.multiply(matrix, [targetPoint[0], targetPoint[1], 1])
  }
  getVertices() {
    return []
  }
  getRoot() {
    let parent = this.parent
    while (parent && parent.parent) {
      parent = parent.parent
    }
    if (!parent) {
      console.error('scene has not root property', parent)
      return
    }
    return parent.root
  }
  on(type, callback) {
    this.addEventListener(type, callback)
  }
  fire(type, detail) {
    triggerEvent(this, type, detail)
  }
  off(type, callback) {
    this.removeEventListener(type, callback)
  }
}

export default Shape