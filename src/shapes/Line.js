/* eslint-disable */
export class Line {
  constructor(options = {}) {
    const { x1, y1, x2, y2 } = options
    this.rotation = 0
    this.translation = { x: 0, y: 0 }
    this.scale = 1
    this.matrix = []
    this.color = '#000'
    this.lineWidth = 1;
  }
  draw() {
    console.log('line')
  }
}

export default Line