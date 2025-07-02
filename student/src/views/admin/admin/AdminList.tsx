'use client'

import Grid from '@mui/material/Grid2'

import AdminCards from './AdminCards'
import AdminTable from './AdminTable'

const AdminList = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <AdminCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <AdminTable />
      </Grid>
    </Grid>
  )
}

export default AdminList
