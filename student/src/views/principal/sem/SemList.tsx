'use client'

import Grid from '@mui/material/Grid2'

import SemCards from './SemCards'
import SemTable from './SemTable'

const SemList = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SemCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SemTable />
      </Grid>
    </Grid>
  )
}

export default SemList
