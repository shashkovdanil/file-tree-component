export type Node =
  | {
      name: string
      kind: 'directory'
      children?: Node[]
    }
  | {
      name: string
      kind: 'file'
      size: string
      modified: string
    }
