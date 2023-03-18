import React, {
  useState,
  type MouseEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa'
import format from 'date-fns/format'
import cn from 'classnames'
import { useDragAndDrop } from './hooks/useDragAndDrop'
import { Node } from './types'

interface Props {
  tree: Node
  data: Node
  updateData: Dispatch<SetStateAction<Node>>
  opened: string[]
  setOpened: Dispatch<SetStateAction<string[]>>
}

const TreeView: React.FC<Props> = ({
  data,
  updateData,
  tree,
  opened,
  setOpened,
}) => {
  const [selected, setSelected] = useState(false)

  const dndProps = useDragAndDrop({
    tree,
    updateTree: updateData,
    targetNode: data,
    onDropCallback: () => {
      if (!opened.includes(data.name)) {
        setOpened([...opened, data.name])
      }
    },
  })

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    if (e.ctrlKey) setSelected(!selected)
    else {
      setOpened(opened =>
        opened.includes(data.name)
          ? opened.filter(name => name !== data.name)
          : [...opened, data.name],
      )
    }
  }

  const open = opened.includes(data.name)

  const FolderIcon = open ? FaFolderOpen : FaFolder

  return (
    <div>
      <button
        {...dndProps}
        onClick={handleClick}
        className={cn('flex items-center gap-1', {
          'bg-purple-400': selected,
        })}
      >
        {data.kind === 'directory' ? <FolderIcon /> : <FaFile />}
        {data.name}
        {data.kind === 'file' && (
          <span className="text-gray-500">
            {format(new Date(data.modified), 'M/dd/yyyy h:mm a')}
          </span>
        )}
        {data.kind === 'file' && (
          <span className="text-gray-500">{data.size}</span>
        )}
      </button>
      {data.kind === 'directory' && open && data.children && (
        <div className="pl-4">
          {data.children.map(child => (
            <TreeView
              key={child.name}
              data={child}
              tree={tree}
              updateData={updateData}
              opened={opened}
              setOpened={setOpened}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeView
