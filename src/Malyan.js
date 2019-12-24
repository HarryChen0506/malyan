import Scene from './Scene'
import Tree from './utils/Tree'
import { EventManager } from './events/index'
// import Matrix from './Matrix'
// import _ from './utils/tool'
/* eslint-disable */

export class Malyan {
  static defaultConfig = {
    ratio: 1,
    autoRatio: true
  }
  constructor(options = {}) {
    this.ctx = null
    this.cacheCtx = this.createCanvas()
    this.config = {...Malyan.defaultConfig, ...options}
    this.scene = new Scene({ name: 'root_group', root: this })
    this.tree = new Tree(this.scene)
    this.init(this.config)
  }
  init(options = {}) {
    this.initCtx(options)
    this.initSize(options)
    this.initRatio(options)
    this.initEventManager()
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
  initSize(options = {}) {
    const { width, height } = options
    const canvas = this.ctx.canvas
    canvas.width = width || 300
    canvas.height = height || 150
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
  }
  initRatio(options = {}) {
    const context = this.ctx
    const canvas = this.ctx.canvas
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
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    context.scale(ratio, ratio)
  }
  createCanvas() {
    const dom = document.createElement('canvas')
    const context = dom.getContext('2d')
    return context
  }
  add(object) {
    this.scene.add(object)
  }
  render() {
    this.scene.render(this.ctx)
  }
  traverse() {
    this.tree.traverseDF_preOrder((node) => {
      if (node) {
        console.log('node', node.name)
      }
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