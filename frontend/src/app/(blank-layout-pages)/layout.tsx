// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

type Props = ChildrenType

const Layout = async (props: Props) => {
  const { children } = props

  // Vars
  const direction = 'ltr'
  const systemMode = await getSystemMode()

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>
        <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>{children}</div>
      </BlankLayout>
    </Providers>
  )
}

export default Layout
