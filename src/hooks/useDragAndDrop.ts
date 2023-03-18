import { useCallback } from 'react'
import type { Dispatch, SetStateAction, DragEvent } from 'react'
import { Node } from '../types'
import { findNodeParent, findNodeByName } from '../utils/tree'

interface Args {
  tree: Node
  updateTree: Dispatch<SetStateAction<Node>>
  targetNode: Node
  onDropCallback: () => void
}

export function useDragAndDrop({
  tree,
  updateTree,
  targetNode,
  onDropCallback,
}: Args) {
  const onDrop = useCallback(
    (e: DragEvent) => {
      const node = JSON.parse(e.dataTransfer.getData('text')) as Node

      const copy = { ...tree }

      const parent = findNodeParent(copy, node.name)
      const target = findNodeByName(copy, targetNode.name)

      if (target && target.kind === 'directory' && target.children) {
        target.children = [...target.children, node]
      }

      if (parent && parent.kind === 'directory' && parent.children) {
        parent.children = parent.children.filter(
          child => child.name !== node.name,
        )
      }

      updateTree(copy)

      onDropCallback()
    },
    [tree, updateTree, targetNode, onDropCallback],
  )

  return {
    draggable: true,
    onDrop,
    onDragStart: (e: DragEvent) => {
      e.dataTransfer.setData('text', JSON.stringify(targetNode))
    },
    onDragOver: (e: DragEvent) => {
      if (targetNode.kind === 'directory') e.preventDefault()
    },
  }
}
