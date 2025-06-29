import type { PaginationApiType } from './tableTypes'

export type SemType = {
  _id: string
  name: string
  description: string
  school: string
  course: string
  createdAt: string
  updatedAt: string
}

export interface SemListResponse {
  sem: SemType[]
  pagination: PaginationApiType
}
