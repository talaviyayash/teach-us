'use client'

import Grid from '@mui/material/Grid2'

import SchoolCards from './SchoolCards'
import SchoolTable from './SchoolTable'

const SchoolList = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SchoolCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SchoolTable />
      </Grid>
    </Grid>
  )
}

export default SchoolList
