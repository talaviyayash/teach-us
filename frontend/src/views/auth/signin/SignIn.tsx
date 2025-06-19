'use client'

import React, { useState } from 'react'

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

import AuthIllustrationWrapper from '../AuthIllustrationWrapper'
import Link from '@/components/Link'
import Logo from '@/components/layout/shared/Logo'
import CustomTextField from '@/@core/components/mui/TextField'
import themeConfig from '@/configs/themeConfig'

const SignIn = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

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
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
              <CustomTextField
                autoFocus
                fullWidth
                label='Email or Username'
                placeholder='Enter your email or username'
              />
              <CustomTextField
                fullWidth
                label='Password'
                placeholder='············'
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary.main' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Login
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
