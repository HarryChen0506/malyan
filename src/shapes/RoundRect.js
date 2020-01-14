import Path from './Path'
export class RoundRect extends Path {
  constructor(options = {}) {
    super(options)
    let { x = 0, y = 0, width = 0, height = 0, radius = 0 } = options
    // create paths
    this.paths = Path.createElements([
      {
        type: 'arcTo',
        id: '0',
        start: [x, y + radius],
        controls: [[x, y], [x + radius, y]],
        radius,
      },
      {
        type: 'line',
        id: '1',
        end: [x + width - radius, y]
      },
      {
        type: 'arcTo',
        id: '2',
        controls: [[x + width, y], [x + width, y + radius]],
        radius,
      },
      {
        type: 'line',
        id: '3',
        end: [x + width, y + height - radius]
      },
      {
        type: 'arcTo',
        id: '4',
        controls: [ [x + width, y + height], [x + width - radius, y + height]],
        radius,
      },
      {
        type: 'line',
        id: '5',
        end: [x + radius, y + height]
      },
      {
        type: 'arcTo',
        id: '6',
        controls: [[x, y + height], [x, y + height - radius]],
        radius,
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