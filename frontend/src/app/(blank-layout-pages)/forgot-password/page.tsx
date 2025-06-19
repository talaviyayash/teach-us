// Next Imports
import type { Metadata } from 'next'

import ForgetPassword from '@/views/auth/forgetPassword/ForgetPassword'

export const metadata: Metadata = {
  title: 'Forget Password',
  description: 'Forget Password of your account'
}

const SignInPage = async () => {
  return <ForgetPassword />
}

export default SignInPage
