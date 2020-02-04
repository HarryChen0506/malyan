import Shape from '../../Shape'
import Vector from '../../Vector'
import CurvePath from './CurvePath'
import LinePath from './LinePath'
import ArcPath from './ArcPath'
import ArcToPath from './ArcToPath'
import math from '../../utils/math'

const defaultConfig = {
  center: false,
  paths: []
}
export class Path extends Shape {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    Object.keys(defaultConfig).forEach(key => {
      this[key] = config[key]
    })
    if (this.center) {
      this.setCenter()
    }
  }
  render(ctx) {
    this.onBeforeRender && this.onBeforeRender(ctx)
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    // begin draw path
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    const firstPath = this.paths[0]
    if (firstPath) {
      firstPath.moveTo(ctx)
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
    this.onAfterRender && this.onAfterRender(ctx)
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    ctx.save()
    ctx.beginPath()
    const firstPath = this.paths[0]
    if (firstPath) {
      firstPath.moveTo(ctx)
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
  getVertices() {
    const vertices = []
    this.paths.forEach(v => {
      if (v.start) {
        vertices.push([v.start.x, v.start.y])
      }
      if (v.end) {
        vertices.push([v.end.x, v.end.y])
      }
      if (v.controls && v.controls.length > 0) {
        v.controls.forEach(k => {
          vertices.push([k.x, k.y])
        })
      }
    })
    return vertices
  }
  getBoundingClientRect() {
    const pixelVertices = this.getVertices()
    const parentVertices = pixelVertices.map(v => {
      const point = this.calcPixelToParentCoordinatePoint(v)
      return [point.x, point.y]
    })
    const { left, right, top, bottom } = math.calcPointsRect(parentVertices)
    const res = {
      left,
      right,
      top,
      bottom,
      width: right - left,
      height: bottom - top
    }
    return res
  }
  setCenter() {
    const { width, height, left, top } = this.getBoundingClientRect()
    const originPoint = this.calcPixelToParentCoordinatePoint([0, 0])
    this.translation.x = originPoint.x - (left + 0.5 * width)
    this.translation.y = originPoint.y - (top + 0.5 * height)
  }
  clone({ deep = true } = {}) {
    const instance = super.clone({deep})
    Object.keys(defaultConfig).forEach(key => {
      instance[key] = this[key]
    })
    instance.paths = this.paths.map(v => v.clone())
    return instance
  }
  static PATH_TYPE = {
    LINE: 'line',
    CURVE: 'curve',
    ARC: 'arc',
    ARC_TO: 'arcTo',
  }
  static createElements = (elements = []) => {
    let paths = []
    elements.forEach(v => {
      let element = null
      let params = {
        id: v.id
      }
      // line path
      if (v.type === Path.PATH_TYPE.LINE) {
        if (v.start) {
          params.start = Vector.formatPointIntoVector(v.start)
        }
        if (v.end) {
          params.end = Vector.formatPointIntoVector(v.end)
        }
        if (Path.Line.validateParams(params)) {
          element = new Path.Line(params)
        }
      }
      // curve path
      if (v.type === Path.PATH_TYPE.CURVE) {
        if (Array.isArray(v.controls)) {
          const controls = v.controls.map(k => {
            return Vector.formatPointIntoVector(k)
          })
          params.controls = controls
        }
        if (v.start) {
          params.start = Vector.formatPointIntoVector(v.start)
        }
        if (v.end) {
          params.end = Vector.formatPointIntoVector(v.end)
        }
        if (Path.Curve.validateParams(params)) {
          element = new Path.Curve(params)
        }
      }
      // arcTo path
      if (v.type === Path.PATH_TYPE.ARC_TO) {
        if (Array.isArray(v.controls)) {
          const controls = v.controls.map(k => {
            return Vector.formatPointIntoVector(k)
          })
          params.controls = controls
        }
        if (v.start) {
          params.start = Vector.formatPointIntoVector(v.start)
        }
        params.radius = v.radius
        if (Path.ArcTo.validateParams(params)) {
          element = new Path.ArcTo(params)
        }
      }
      // arc path
      if (v.type === Path.PATH_TYPE.ARC) {
        if (v.start) {
          params.start = Vector.formatPointIntoVector(v.start)
        }
        params.x = v.x
        params.y = v.y
        params.radius = v.radius
        params.startAngle = v.startAngle
        params.endAngle = v.endAngle
        params.anticlockwise = v.anticlockwise
        if (Path.Arc.validateParams(params)) {
          element = new Path.Arc(params)
        }
      }
      element && paths.push(element)
    })

    return paths
  }
}
Path.Curve = CurvePath
Path.Line = LinePath
Path.Arc = ArcPath
Path.ArcTo = ArcToPath

export default Path