import type { PaginationApiType } from './tableTypes'

export type SchoolType = {
  _id?: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface Pagination {
  page: number
  rows: number
  size: number
  total: number
}

export interface SchoolListResponse {
  school: SchoolType[]
  pagination: PaginationApiType
}
