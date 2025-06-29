import React from 'react'

import Session from '@/components/Session'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Session>{children}</Session>
    </>
  )
}

export default Layout
