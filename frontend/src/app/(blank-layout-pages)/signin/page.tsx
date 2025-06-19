// Next Imports
import type { Metadata } from 'next'

import SignIn from '@/views/auth/signin/SignIn'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In to your account'
}

const SignInPage = async () => {
  return <SignIn />
}

export default SignInPage
