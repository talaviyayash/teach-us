'use client'

import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material'

import { useSelector } from 'react-redux'

import AuthIllustrationWrapper from '../AuthIllustrationWrapper'
import Link from '@/components/Link'
import Logo from '@/components/layout/shared/Logo'
import CustomTextField from '@/@core/components/mui/TextField'
import themeConfig from '@/configs/themeConfig'
import useApiHook from '@/hooks/useApiHook'
import { getLoader } from '@/utils/reduxFunc'

interface FormData {
  email: string
  password: string
}

const SignIn = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const loader = useSelector(getLoader('signin'))

  const { api } = useApiHook()
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    const response = await api({
      endPoint: '/auth/signin',
      method: 'POST',
      data,
      needLoader: true,
      loaderName: 'signin',
      showToastMessage: true
    })

    if (response?.success) router?.push('/home')
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
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography>Please sign-in to your account and start the adventure</Typography>
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
              <Controller
                name='password'
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Password'
                    placeholder='············'
                    type={isPasswordShown ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    id='outlined-adornment-password'
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                  />
                )}
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary.main' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit' disabled={loader}>
                Sign In
              </Button>
              <Divider className='gap-2 text-textPrimary'>or</Divider>
              <div className='flex justify-center items-center gap-1.5'>
                <IconButton className='text-facebook' size='small'>
                  <i className='tabler-brand-facebook-filled' />
                </IconButton>
                <IconButton className='text-twitter' size='small'>
                  <i className='tabler-brand-twitter-filled' />
                </IconButton>
                <IconButton className='text-textPrimary' size='small'>
                  <i className='tabler-brand-github-filled' />
                </IconButton>
                <IconButton className='text-error' size='small'>
                  <i className='tabler-brand-google-filled' />
                </IconButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </>
  )
}

export default SignIn
