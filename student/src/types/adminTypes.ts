import type { PaginationApiType } from './tableTypes'
import type { User } from './userTypes'

export interface Pagination {
  page: number
  rows: number
  size: number
  total: number
}

export interface AdminListResponse {
  admin: User[]
  pagination: PaginationApiType
}
