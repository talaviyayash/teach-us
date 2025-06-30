import type { PaginationApiType } from './tableTypes'

export type DivType = {
  _id: string
  name: string
  description: string
  school: string
  course: string
  createdAt: string
  updatedAt: string
}

export interface DivListResponse {
  div: DivType[]
  pagination: PaginationApiType
}
