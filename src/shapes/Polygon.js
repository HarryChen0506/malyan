import Path from './Path'
export class Polygon extends Path {
  constructor(options = {}) {
    super(options)
    let { name, closed, points = [] } = options
    this.name = name
    this.closed = closed !== undefined ? closed : true
    const formatedPoints = Polygon.formatPolyPoints(points)
    this.paths = Path.createPaths(formatedPoints)
  }
  static formatPolyPoints = (points = []) => {
    const elements = []
    points.forEach((v, index) => {
      let element
      if (index === 0) {
        element = {
          type: 'line',
          id: index,
          start: v,
        }
      } else if (index === 1) {
        if (elements[0]) {
          elements[0].end = v
        }
      } else {
        element = {
          type: 'line',
          id: index,
          end: v,
        }
      }
      element && elements.push(element)
    })
    return elements
  }
  updatePaths(points = []) {
    const formatedPoints = Polygon.formatPolyPoints(points)
    this.paths = Path.createPaths(formatedPoints)
  }
}

export default Polygon