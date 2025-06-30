'use client'

import Grid from '@mui/material/Grid2'

import DivCards from './DivCards'
import DivTable from './DivTable'

const DivList = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <DivCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <DivTable />
      </Grid>
    </Grid>
  )
}

export default DivList
