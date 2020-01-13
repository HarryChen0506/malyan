import Shape from '../Shape'
// import _ from '../utils/tool'

const defaultConfig = {
  text: '',
  x: 0,
  y: 0,
  maxWidth: undefined,
  fillText: true,
  strokeText: false,
  fillStyle: '#000',
  font: '10px sans-serif',
  textAlign: 'start',
  textBaseline: 'alphabetic',
  direction: 'ltr',
}

export class Text extends Shape {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    const { name } = config
    this.name = name
    Object.keys(defaultConfig).forEach(key => {
      this[key] = config[key]
    })
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    this.setCtxProps && this.setCtxProps(ctx)
    this.setTextCtxProps && this.setTextCtxProps(ctx)
    if (this.maxWidth) {
      this.fillText && ctx.fillText(this.text, this.x, this.y, this.maxWidth)
      this.strokeText && ctx.strokeText(this.text, this.x, this.y, this.maxWidth)
    } else {
      this.fillText && ctx.fillText(this.text, this.x, this.y)
      this.strokeText && ctx.strokeText(this.text, this.x, this.y)
    }
    ctx.restore()
  }
  setTextCtxProps(ctx) {
    if (this.font) {
      ctx.font = this.font
    }
    if (this.textAlign) {
      ctx.textAlign = this.textAlign
    }
    if (this.textBaseline) {
      ctx.textBaseline = this.textBaseline
    }
    if (this.direction) {
      ctx.direction = this.direction
    }
  }
  containPoint() {
    return false
  }

}

export default Text