import { useEffect } from 'react'

import { Button, Divider, Drawer, IconButton, Typography } from '@mui/material'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import useApiHook from '@/hooks/useApiHook'
import { addData } from '@/store/slice/apiSlice'
import { addFlag } from '@/store/slice/appSlice'
import { toggleModal } from '@/store/slice/modalSlice'
import type { RootState } from '@/store/store'
import type { CourseType } from '@/types/courseTypes'
import { getData, getLoader, getModal } from '@/utils/reduxFunc'

interface FormValues {
  name: string
  description: string
}

const defaultValues = {
  name: '',
  description: ''
}

const EditDiv = () => {
  const editCourseModal = useSelector(getModal('editDiv'))
  const editDivData = useSelector<RootState, CourseType | undefined>(getData('editDiv'))
  const dispatch = useDispatch()
  const { api } = useApiHook()
  const loader = useSelector(getLoader('editDiv'))

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onChange'
  })

  const onClose = () => {
    dispatch(toggleModal({ name: 'editDiv' }))
    dispatch(addData({ name: 'editDiv', data: undefined }))
    reset(defaultValues)
  }

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const response = await api({
      method: 'PUT',
      endPoint: `/batch/${editDivData?._id}`,
      data,
      loaderName: 'editDiv',
      needLoader: true,
      showToastMessage: true
    })

    if (response?.success) {
      dispatch(addFlag({ name: 'divList', value: true }))
      onClose()
    }
  }

  const handleReset = () => onClose()

  useEffect(() => {
    if (editDivData) {
      reset({
        name: editDivData?.name,
        description: editDivData?.description
      })
    }
  }, [editDivData])

  return (
    <>
      <Drawer
        open={editCourseModal}
        anchor='right'
        variant='temporary'
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Edit Batch</Typography>
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
                Save
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

export default EditDiv
