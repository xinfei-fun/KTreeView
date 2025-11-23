export interface TreeNode {
  id: string | number
  label: string
  collapsed?: boolean
  children?: TreeNode[]
  [key: string]: any
}

export interface FlatNode extends TreeNode {
  depth: number
  parent?: TreeNode
}

export interface VirtualRange {
  start: number
  end: number
  padTop: number
  padBottom: number
}
