import React from 'react'

import ReduxWrapper from '@/store/ReduxWrapper'
import type { ChildrenType } from '@/@core/types'

type Props = ChildrenType

const ClientWrapper = ({ children }: Props) => {
  return (
    <>
      <ReduxWrapper>{children}</ReduxWrapper>
    </>
  )
}

export default ClientWrapper
