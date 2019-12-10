import Scene from './Scene'
import Tree from './utils/Tree'
/* eslint-disable */
export class Malyan {
  constructor(options = {}) {
    this.ctx = null
    this.scene = new Scene({name: 'root_group'})
    this.tree = new Tree(this.scene)
    this.init(options)
    this.initRatio()
  }
  init(options = {}) {
    let {id, context, dom} = options
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
      console.warn('canvas context is null')
    }
  }
  initRatio() {
    const context = this.ctx
    const canvas = this.ctx.canvas
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    context.scale(ratio, ratio)
  }
  add(object) {
    this.scene.add(object)
  }
  render() {
    this.tree.traverseDF_preOrder((node) => {
      if (node) {
        node.render && node.render(this.ctx)
        // console.log('node', node.name)
      }
    })
  }
}
export default Malyan