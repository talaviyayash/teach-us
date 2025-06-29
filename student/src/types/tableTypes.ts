export type PaginationTypes = {
  page: number
  size: number
  total: number
  setPageIndex: (pageIndex: number) => void
}

export type TablePaginationProps = {
  pagination: PaginationTypes
}

export type AnyFunction = (...args: any[]) => any

export type AllFunction = {
  [key: string]: AnyFunction
}

export type HeaderCellComponent = React.ComponentType<{ allFunction?: AllFunction }>

export type CellComponent<T> = React.ComponentType<{
  row: T
  index: number
  allFunction?: AllFunction
}>

export type DescriptionItem<T> = {
  key?: keyof T // optional if Cell is provided
  headerName?: string
  HeaderCell?: HeaderCellComponent
  Cell?: CellComponent<T>
}

export type DataTableProps<T extends object> = {
  description: DescriptionItem<T>[]
  tableData: T[]
  pagination?: PaginationTypes
  hidePagination?: boolean
  allFunction?: AllFunction
  isLoading?: boolean
}

export type PaginationApiType = {
  page: number
  size: number
  total: number
}
