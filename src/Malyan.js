import Scene from './Scene'
import Tree from './utils/Tree'
import { EventManager } from './events/index'
// import Matrix from './Matrix'
// import _ from './utils/tool'
/* eslint-disable */

export class Malyan {
  static defaultConfig = {
    id: undefined,
    dom: undefined,
    ratio: 1,
    autoRatio: true,
    width: 300,
    height: 150,
    autoClear: true,
    background: undefined
  }
  constructor(options = {}) {
    this.ctx = null
    this.cacheCtx = this.createCanvas()
    this.config = { ...Malyan.defaultConfig, ...options }
    this.scene = new Scene({ name: 'root_group', root: this })
    this.tree = new Tree(this.scene)
    this.init(this.config)
  }
  init(options = {}) {
    this.initParams(options)
    this.initCtx(options)
    this.initRatio(options)
    this.initSize(options)
    this.initStyle(options)
    this.initEventManager()
  }
  initParams(options = {}) {
    const { width, height, ratio, autoClear, background } = options
    this.width = width
    this.height = height
    this.ratio = ratio
    this.autoClear = autoClear
    this.background = background
  }
  initCtx(options = {}) {
    let { id, context, dom } = options
    if (context) {
      this.ctx = context
    } else if (dom) {
      context = dom.getContext('2d')
      this.ctx = context
    } else if (id) {
      dom = document.querySelector('#' + id)
      context = dom.getContext('2d')
      this.ctx = context
    }
    if (!this.ctx) {
      console.warn('canvas context cannot be null')
    }
  }
  initStyle() {
    if (this.background) {
      this.ctx.canvas.style.background = this.background
    }
  }
  initSize(options = {}) {
    const { width, height } = options
    this.setSize(width, height)
  }
  getSize() {
    return {
      width: this.width,
      height: this.height
    }
  }
  setSize(width, height) {
    const canvas = this.ctx.canvas
    if (width !== undefined) {
      this.width = width
    }
    if (height !== undefined) {
      this.height = height
    }
    canvas.style.width = this.width + 'px'
    canvas.style.height = this.height + 'px'
    canvas.width = this.width * this.ratio
    canvas.height = this.height * this.ratio
    this.ctx.scale(this.ratio, this.ratio)
  }
  initRatio(options = {}) {
    const context = this.ctx
    let { ratio, autoRatio } = options
    if (autoRatio) {
      var devicePixelRatio = window.devicePixelRatio || 1
      var backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1
      ratio = devicePixelRatio / backingStoreRatio
    }
    this.ratio = ratio
  }
  getPixelRatio() {
    return this.ratio
  }
  createCanvas() {
    const dom = document.createElement('canvas')
    const context = dom.getContext('2d')
    return context
  }
  add(...args) {
    this.scene.add(...args)
  }
  render() {
    this.scene.render(this.ctx, {
      autoClear: this.autoClear
    })
  }
  forEach(callback) {
    this.tree.traverseDFByPreOrder((node) => {
      typeof callback === 'function' && callback(node)
    })
  }
  initEventManager() {
    if (!this.ctx) {
      return
    }
    this.eventManager = new EventManager({
      element: this.ctx.canvas,
      root: this
    })
  }
  on(eventType, callback) {
    this.eventManager.on(eventType, callback)
  }
  off(eventType, callback) {
    this.eventManager.off(eventType, callback)
  }
}
export default Malyan