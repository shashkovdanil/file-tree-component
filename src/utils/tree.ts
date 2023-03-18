import { Node } from '../types'

export function getDirectoryNames(node: Node): string[] {
  if (node.kind === 'directory') {
    const names = [node.name]
    if (node.children) {
      node.children.forEach(child => {
        names.push(...getDirectoryNames(child))
      })
    }
    return names
  } else {
    return []
  }
}

export function findNodeByName(root: Node, name: string): Node | null {
  if (root.name === name) {
    return root
  }

  if (root.kind === 'directory' && root.children) {
    for (const child of root.children) {
      const node = findNodeByName(child, name)
      if (node) {
        return node
      }
    }
  }

  return null
}

export function findNodeParent(root: Node, nodeName: string): Node | null {
  if (root.kind === 'directory' && root.children) {
    for (const child of root.children) {
      if (child.name === nodeName) {
        return root
      }

      const node = findNodeParent(child, nodeName)

      if (node) {
        return node
      }
    }
  }

  return null
}
