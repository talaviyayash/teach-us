'use client'

import Grid from '@mui/material/Grid2'

import UserListCards from './CourseCards'
import UserListTable from './CourseTable'

const CourseList = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <UserListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <UserListTable />
      </Grid>
    </Grid>
  )
}

export default CourseList
