export interface SchoolPermission {
  _id: string
  schoolId: string
  permission: 'owner' | 'admin' | 'teacher' | 'viewer'
}

export interface User {
  _id: string
  name: string
  email: string
  batchHistory: any[] // Use specific type if known
  isGoogleLogin: boolean
  resetPasswordToken: string | null
  resetPasswordExpires: string | null
  isActive: boolean
  school: SchoolPermission[]
  createdAt: string
  updatedAt: string
  __v: number
  role: 'principal' | 'teacher' | 'admin'
  currentSchool: string
}
