'use client'

import Grid from '@mui/material/Grid2'

import SemCards from './BatchCards'
import BatchTable from './BatchTable'

const BatchList = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SemCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <BatchTable />
      </Grid>
    </Grid>
  )
}

export default BatchList
