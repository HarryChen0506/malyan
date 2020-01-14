import Shape from '../Shape'

const defaultConfig = {
  image: null,
  sx: null,
  sy: null,
  sWidth: null,
  sHeight: null,
  x: 0,
  y: 0,
  width: null,
  height: null,
}

export class Image extends Shape {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    Object.keys(defaultConfig).forEach(key => {
      this[key] = config[key]
    })
  }
  render(ctx) {
    this.onBeforeRender && this.onBeforeRender(ctx)
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    if (['width', 'height'].some((v) => this[v] === null)) {
      ctx.drawImage(this.image, this.x, this.y)
    } else {
      if (['sx', 'sy', 'sWidth', 'sHeight'].every((v) => this[v] !== null)) {
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height)
      } else {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      }
    }
    ctx.restore()
    this.onAfterRender && this.onAfterRender(ctx)
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    // ctx.save()
    // ctx.beginPath()
    // ctx.rect(this.x, this.y, this.width, this.height)
    // ctx.restore()
    const path = new Path2D()
    path.rect(this.x, this.y, this.width, this.height)
    if (ctx.isPointInPath(path, point.x, point.y)) {
      return true
    }
    return false
  }
  static load(url, callback) {
    const global = window || global
    var img = new global.Image()
    img.src = url
    if (img.complete) {
      callback(img)
    } else {
      img.onload = function () {
        callback(img)
      }
    }
  }
}

export default Image