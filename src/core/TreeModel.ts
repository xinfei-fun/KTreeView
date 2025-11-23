import type { TreeNode, FlatNode } from './types'
import { flattenTree } from '../utils/flatten'

export class TreeModel {
  tree: TreeNode[]

  constructor(tree: TreeNode[]) {
    this.tree = tree
  }

  toggle(node: TreeNode) {
    node.collapsed = !node.collapsed
  }

  buildVisible(): FlatNode[] {
    return flattenTree(this.tree)
  }
}
