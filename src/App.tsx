import { useState, useMemo } from 'react'
import FileTree from './FileTree'
import { data as initial } from './data'
import { Node } from './types'
import { getDirectoryNames } from './utils/tree'

export function App() {
  const [data, setData] = useState<Node>(initial)
  const [opened, setOpened] = useState<string[]>([])

  const directoryNames = useMemo(() => getDirectoryNames(data), [data])

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            setOpened(directoryNames)
          }}
        >
          Expand All
        </button>
        <button
          onClick={() => {
            setOpened([])
          }}
        >
          Collapse All
        </button>
      </div>
      <FileTree
        tree={data}
        data={data}
        opened={opened}
        setOpened={setOpened}
        updateData={setData}
      />
    </>
  )
}
