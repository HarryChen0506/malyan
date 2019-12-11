import Group from './Group'


export class Scene extends Group{
  constructor(...args) {
    super(...args)
  }
  // render(ctx) {
  //   console.log('scene render')
  //   for(let i =0; i< this.children.length; i++) {
  //     this.children[i] && this.children[i].render(ctx)
  //   }
  // }
}

export default Scene