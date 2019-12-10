import Group from './Group'


export class Scene extends Group{
  constructor(...args) {
    super(...args)
  }
  render() {
    console.log('Scene')
  }
}

export default Scene