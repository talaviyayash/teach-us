'use client'
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import useApiHook from '@/hooks/useApiHook'
import { addProfile } from '@/store/slice/appSlice'
import Loader from '@/shared/Loader'

type SessionProps = {
  children: React.ReactNode
}

const Session = ({ children }: SessionProps) => {
  const { api } = useApiHook()
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await api({
        endPoint: '/user/session'
      })

      setLoader(false)

      if (response?.success) {
        dispatch(addProfile(response?.data?.user))
      } else {
      }
    }

    getUserInfo()
  }, [])

  return <>{loader ? <Loader /> : children}</>
}

export default Session
