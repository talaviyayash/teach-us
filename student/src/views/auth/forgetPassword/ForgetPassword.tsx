'use client'

import React from 'react'

import { Button, Card, CardContent, Typography } from '@mui/material'

import DirectionalIcon from '@/components/DirectionalIcon'
import Link from '@/components/Link'
import CustomTextField from '@/@core/components/mui/TextField'
import Logo from '@/components/layout/shared/Logo'
import AuthIllustrationWrapper from '../AuthIllustrationWrapper'

const ForgetPassword = () => {
  return (
    <>
      <AuthIllustrationWrapper>
        <Card className='flex flex-col sm:is-[450px]'>
          <CardContent className='sm:!p-12'>
            <Link href='/' className='flex justify-center mbe-6'>
              <Logo />
            </Link>
            <div className='flex flex-col gap-1 mbe-6'>
              <Typography variant='h4'>Forgot Password 🔒</Typography>
              <Typography>Enter your email and we&#39;ll send you instructions to reset your password</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
              <CustomTextField autoFocus fullWidth label='Email' placeholder='Enter your email' />
              <Button fullWidth variant='contained' type='submit'>
                Send Reset Link
              </Button>
              <Typography className='flex justify-center items-center' color='primary.main'>
                <Link href='/signin' className='flex items-center gap-1.5'>
                  <DirectionalIcon
                    ltrIconClass='tabler-chevron-left'
                    rtlIconClass='tabler-chevron-right'
                    className='text-xl'
                  />
                  <span>Back to Signin</span>
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </>
  )
}

export default ForgetPassword
