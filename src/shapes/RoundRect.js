import Path from './Path'
export class RoundRect extends Path {
  constructor(options = {}) {
    super(options)
    let { name, x = 0, y = 0, width = 0, height = 0, radius = 0 } = options
    this.name = name
    // create paths
    this.paths = Path.createPaths([
      {
        type: 'curve',
        id: '0',
        start: [x, y + radius],
        end: [x + radius, y],
        controls: [[x, y]]
      },
      {
        type: 'line',
        id: '1',
        end: [x + width - radius, y]
      },
      {
        type: 'curve',
        id: '2',
        end: [x + width, y + radius],
        controls: [[x + width, y]]
      },
      {
        type: 'line',
        id: '3',
        end: [x + width, y + height - radius]
      },
      {
        type: 'curve',
        id: '4',
        end: [x + width - radius, y + height],
        controls: [[x + width, y + height]]
      },
      {
        type: 'line',
        id: '5',
        end: [x + radius, y + height]
      },
      {
        type: 'curve',
        id: '6',
        end: [x, y + height - radius],
        controls: [[x, y + height]]
      },
      {
        type: 'line',
        id: '7',
        end: [x, y + radius]
      },
    ])
  }
}

export default RoundRect