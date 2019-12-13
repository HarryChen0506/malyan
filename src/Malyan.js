import Scene from './Scene'
import Tree from './utils/Tree'
import Matrix from './Matrix'
import _ from './utils/tool'
/* eslint-disable */

export class Malyan {
  constructor(options = {}) {
    this.ctx = null
    this.scene = new Scene({ name: 'root_group' })
    this.tree = new Tree(this.scene)
    this.init(options)
  }
  init(options = {}) {
    this.initCtx(options)
    this.initSize(options)
    this.bindEvents()
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
  initRatio() {
    // const context = this.ctx
    // const canvas = this.ctx.canvas
    // var devicePixelRatio = window.devicePixelRatio || 1;
    // var backingStoreRatio = context.webkitBackingStorePixelRatio ||
    //                     context.mozBackingStorePixelRatio ||
    //                     context.msBackingStorePixelRatio ||
    //                     context.oBackingStorePixelRatio ||
    //                     context.backingStorePixelRatio || 1;
    // var ratio = devicePixelRatio / backingStoreRatio;
    // canvas.width = canvas.width * ratio;
    // canvas.height = canvas.height * ratio;
    // context.scale(ratio, ratio)
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
  bindEvents() {
    if (!this.ctx) {
      return
    }
    this.ctx.canvas.addEventListener('click', (e) => {
      // console.log('event', e)
      const mouse =  _.getEventPosition(e, this.ctx.canvas)
      console.log('mouse', mouse)
      this.tree.traverseDF_preOrder((node) => {
        if (node) {
          // console.log('node', node.name, node.calcFinalMatrix())
          const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
          const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
          console.log('relativePos', relativePos)
          const isInPath = node.containPoint &&  node.containPoint(this.ctx, relativePos)
          console.log('isInPath', isInPath)
        }
      })
    }, false)
  }
}
export default Malyan