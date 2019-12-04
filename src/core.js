import Scene from './Scene'

export class Malyan {
  constructor() {
    this.scene = new Scene()
  }
  add(object) {
    console.log('add')
    this.scene.add(object)
  }
  render() {
    console.log('render')
  }
}

export default Malyan