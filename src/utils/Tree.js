export class Tree {
  constructor(node) {
    if (!node) {
      console.error('Tree root node cannot be empty')
    }
    this._root = node
  }
  // 深度优先遍历-先序
  traverseDF_preOrder = (callback) => {
    function recurse(currentNode) {
      callback(currentNode)
      if (!Array.isArray(currentNode.children)) {
        return
      }
      for (var i = 0, length = currentNode.children.length; i < length; i++) {
        recurse(currentNode.children[i])
      }
    }
    recurse(this._root)
  }
}

export default Tree