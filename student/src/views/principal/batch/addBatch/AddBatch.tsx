import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import { Button, Divider, Drawer, IconButton, Typography } from '@mui/material'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import useApiHook from '@/hooks/useApiHook'
import { addFlag } from '@/store/slice/appSlice'
import { toggleModal } from '@/store/slice/modalSlice'
import { getLoader, getModal } from '@/utils/reduxFunc'

interface FormValues {
  name: string
  description: string
}

const defaultValues = {
  name: '',
  description: ''
}

const AddBatch = () => {
  const addBatchModal = useSelector(getModal('addBatch'))
  const { div } = useParams()

  const dispatch = useDispatch()
  const { api } = useApiHook()
  const loader = useSelector(getLoader('addBatch'))

  const onClose = () => {
    dispatch(toggleModal({ name: 'addBatch' }))
    reset(defaultValues)
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const response = await api({
      method: 'POST',
      endPoint: `/batch`,
      data: { ...data, divId: div },
      loaderName: 'addBatch',
      needLoader: true,
      showToastMessage: true
    })

    if (response?.success) {
      dispatch(addFlag({ name: 'batchList', value: true }))
      onClose()
    }
  }

  useEffect(() => {
    if (addBatchModal)
      return () => {
        reset(defaultValues)
      }
  }, [addBatchModal])

  const handleReset = () => onClose()

  return (
    <>
      <Drawer
        open={addBatchModal}
        anchor='right'
        variant='temporary'
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Add Batch</Typography>
          <IconButton size='small' onClick={onClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            <Controller
              name='name'
              control={control}
              rules={{
                required: 'Name is required',
                minLength: { value: 2, message: 'Min 2 characters' }
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label='Name'
                  placeholder='Name'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name='description'
              control={control}
              rules={{
                required: 'Description is required',
                minLength: { value: 2, message: 'Min 2 characters' }
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label='Description'
                  placeholder='Description'
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit' disabled={loader}>
                Submit
              </Button>
              <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </>
  )
}

export default AddBatch
