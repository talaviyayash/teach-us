'use client'
import React from 'react'

import { styled } from '@mui/material/styles'

import { CircularProgress, Stack } from '@mui/material'

const StyledLoader = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: `${theme.palette.primary.light}B3`,
  opacity: 0.7,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 99
}))

const Loader = () => {
  return (
    <StyledLoader>
      <CircularProgress />
    </StyledLoader>
  )
}

export default Loader
