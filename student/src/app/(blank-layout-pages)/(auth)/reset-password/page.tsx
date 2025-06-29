import type { Metadata } from 'next'

import ResetPassword from '@/views/auth/resetPassword/ResetPassword'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset Password'
}

const ResetPasswordPage = async () => {
  return <ResetPassword />
}

export default ResetPasswordPage
