'use client'

import Grid from '@mui/material/Grid2'

import StudentTable from './StudentTable'
import SchoolCards from './SchoolCards'

const SchoolList = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SchoolCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <StudentTable />
      </Grid>
    </Grid>
  )
}

export default SchoolList
