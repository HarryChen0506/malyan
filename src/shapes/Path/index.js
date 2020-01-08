import Shape from '../../Shape'
import Vector from '../../Vector'
import CurvePath from './CurvePath'
import LinePath from './LinePath'
import math from '../../utils/math'

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
  center() {
    const { width, height, left, top } = this.getBoundingClientRect()
    const originPoint = this.calcPixelToParentCoordinatePoint([0, 0])
    this.translation.x = originPoint.x - (left + 0.5 * width)
    this.translation.y = originPoint.y - (top + 0.5 * height)
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