import type { PaginationApiType } from './tableTypes'

export type CourseType = {
  _id?: string
  name: string
  description?: string
  school: string
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  page: number
  rows: number
  size: number
  total: number
}

export interface CourseListResponse {
  courses: CourseType[]
  pagination: PaginationApiType
}
