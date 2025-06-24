'use client'

import React from 'react'

import { Button, Card, CardContent, Typography } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'

import { useSelector } from 'react-redux'

import DirectionalIcon from '@/components/DirectionalIcon'
import Link from '@/components/Link'
import CustomTextField from '@/@core/components/mui/TextField'
import Logo from '@/components/layout/shared/Logo'
import AuthIllustrationWrapper from '../AuthIllustrationWrapper'
import useApiHook from '@/hooks/useApiHook'
import { getLoader } from '@/utils/reduxFunc'

interface FormData {
  email: string
}

const ForgetPassword = () => {
  const { api } = useApiHook()
  const loader = useSelector(getLoader('forgetPassword'))

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    const response = await api({
      endPoint: '/auth/forget-password',
      method: 'POST',
      data,
      needLoader: true,
      loaderName: 'forgetPassword',
      showToastMessage: true
    })

    if (response?.success) {
      reset({
        email: ''
      })
    }

    console.log('response', response)
  }

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
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
              <Controller
                name='email'
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email'
                  }
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    autoFocus
                    fullWidth
                    label='Email'
                    placeholder='Enter your email'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Button fullWidth variant='contained' type='submit' disabled={loader}>
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
