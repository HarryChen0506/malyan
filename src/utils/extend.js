// 拷贝属性 target为子类 source为继承类
export function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    // name, constructor, prototype之外属性就是实例属性
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      // 返回某个对象属性的描述对象（ descriptor ）。 参数(对象, 属性)
      let desc = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, desc)
    }
  }
}

export function mix(...mixins) {
  class Mix {
    constructor(...args) {
      for (let _class of mixins) {
        copyProperties(this, new _class(...args)) // 拷贝实例属性
      }
    }
  }
  for (let mixin of mixins) {
    copyProperties(Mix, mixin) // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型属性
  }
  return Mix
}

export default {
  copyProperties,
  mix
}