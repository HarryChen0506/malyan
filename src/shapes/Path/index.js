/* eslint-disable */
import Shape from '../../Shape'
import Vector from '../../Vector'
import CurvePath from './CurvePath'
import LinePath from './LinePath'

const defaultConfig = {
  center: false
}
export class Path extends Shape {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    const { name, paths, center } = config
    this.name = name
    this.paths = paths || []
    this.offsetX = 0
    this.offsetY = 0
    if (center) {
      this.center()
    }
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    // begin draw path
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    const firstPath = this.paths[0]
    if (firstPath) {
      ctx.moveTo(firstPath.start.x + this.offsetX, firstPath.start.y + this.offsetY)
    }
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].render(ctx)
    }
    if (this.closed) {
      ctx.closePath()
    }
    this.stroke && ctx.stroke()
    this.fill && ctx.fill()
    ctx.restore()
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    ctx.save()
    ctx.beginPath()
    const firstPath = this.paths[0]
    if (firstPath) {
      ctx.moveTo(firstPath.start.x + this.offsetX, firstPath.start.y + this.offsetY)
    }
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].render(ctx)
    }
    if (this.closed) {
      ctx.closePath()
    }
    ctx.restore()
    if (ctx.isPointInPath(point.x, point.y)) {
      return true
    }
    return false
  }
  center() {
    // this.offsetX = - this.width * 0.5
    // this.offsetY = - this.height * 0.5
    this.offsetX = -30
    this.offsetY = -40
    this.paths.forEach(v => {
      v.setOffset(this.offsetX, this.offsetY)
    })
  }
  static PATH_TYPE = {
    LINE: 'line',
    CURVE: 'curve'
  }
  static createPaths = (elements = []) => {
    let paths = []
    const formatPoint = function (point) {
      if (Array.isArray(point)) {
        return new Vector({
          x: point[0],
          y: point[1]
        })
      }
      return new Vector(point)
    }
    elements.forEach(v => {
      let element = {}
      let params = {
        id: v.id
      }
      if (!v.end) {
        console.error('element `end` props must be not null in Path.createPaths function')
        return
      }
      if (v.type === Path.PATH_TYPE.LINE) {
        if (v.start) {
          params.start = formatPoint(v.start)
        }
        params.end = formatPoint(v.end)
        element = new Path.Line(params)
      } else if (v.type === Path.PATH_TYPE.CURVE) {
        let controls = []
        if (Array.isArray(v.controls)) {
          controls = v.controls.map(k => {
            return formatPoint(k)
          })
        }
        if (v.start) {
          params.start = formatPoint(v.start)
        }
        params.end = formatPoint(v.end)
        params.controls = controls
        element = new Path.Curve(params)
      }

      element && paths.push(element)
    })
    return paths
  }
}
Path.Curve = CurvePath
Path.Line = LinePath

export default Path