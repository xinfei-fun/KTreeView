import type { TreeNode, FlatNode } from '../core/types'

export function flattenTree(tree: TreeNode[]): FlatNode[] {
  const result: FlatNode[] = []

  const walk = (node: TreeNode, depth: number) => {
    result.push({
      ...node,
      depth
    })

    if (!node.collapsed && node.children) {
      node.children.forEach(child => walk(child, depth + 1))
    }
  }

  tree.forEach(root => walk(root, 0))
  return result
}
