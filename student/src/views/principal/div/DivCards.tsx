'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Library Imports
import { useSelector } from 'react-redux'

// Type Imports
import type { ThemeColor } from '@/@core/types'
import type { RootState } from '@/store/store'

// Utils
import { getApiData } from '@/utils/reduxFunc'

// Component Imports
import HorizontalWithSubtitle from './Card'

// Types
type UserDataType = {
  title: string
  stats: string
  avatarIcon: string
  avatarColor?: ThemeColor
  trend: string
}

type UserStatusType = {
  total_users: number
  active: number
  locked: number
  suspended: number
}

const DivCards = () => {
  const userStats = useSelector<RootState, UserStatusType | undefined>(state => getApiData('userStats')(state))

  const data: UserDataType[] = [
    {
      title: 'Total Users',
      stats: String(userStats?.total_users ?? 0),
      avatarIcon: 'tabler-users',
      avatarColor: 'primary',
      trend: 'positive'
    },
    {
      title: 'Active Users',
      stats: String(userStats?.active ?? 0),
      avatarIcon: 'tabler-user-check',
      avatarColor: 'success',
      trend: 'positive'
    },
    {
      title: 'Locked Users',
      stats: String(userStats?.locked ?? 0),
      avatarIcon: 'tabler-user-off',
      avatarColor: 'warning',
      trend: 'negative'
    },
    {
      title: 'Suspended Users',
      stats: String(userStats?.suspended ?? 0),
      avatarIcon: 'tabler-user-x',
      avatarColor: 'error',
      trend: 'negative'
    }
  ]

  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default DivCards
