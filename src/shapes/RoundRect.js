import Path from './Path'
import Vector from '../Vector'
export class RoundRect extends Path {
  constructor(options = {}) {
    super(options)
    let { name, x = 0, y = 0, width = 0, height = 0, radius = 0 } = options
    this.name = name
    this.paths = [
      new Path.Curve({
        start: new Vector({ x: x, y: y + radius }),
        end: new Vector({ x: x + radius, y: y }),
        controls: [new Vector({ x: x, y: y })],
      }),
      new Path.Line({
        end: new Vector({ x: x + width - radius, y: y }),
      }),
      new Path.Curve({
        start: new Vector({ x: x + width - radius, y: y }),
        end: new Vector({ x: x + width, y: y + radius }),
        controls: [new Vector({ x: x + width, y: y })],
      }),
      new Path.Line({
        end: new Vector({ x: x + width, y: y + height - radius }),
      }),
      new Path.Curve({
        start: new Vector({ x: x + width, y: y + height - radius }),
        end: new Vector({ x: x + width - radius, y: y + height }),
        controls: [new Vector({ x: x + width, y: y + height })],
      }),
      new Path.Line({
        end: new Vector({ x: x + radius, y: y + height }),
      }),
      new Path.Curve({
        start: new Vector({ x: x + radius, y: y + height }),
        end: new Vector({ x: x, y: y + height - radius }),
        controls: [new Vector({ x: x, y: y + height })],
      }),
      new Path.Line({
        end: new Vector({ x: x, y: y + radius }),
      }),
    ]
  }
}

export default RoundRect