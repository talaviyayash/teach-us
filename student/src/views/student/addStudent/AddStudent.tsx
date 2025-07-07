import { useEffect, useState } from 'react'

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
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import CustomChip from '@/@core/components/mui/Chip'

interface FormValues {
  name: string
  description: string
}

const defaultValues = {
  name: '',
  description: ''
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const AddStudent = () => {
  const addBatchModal = useSelector(getModal('addBatch'))
  const { div } = useParams()

  const dispatch = useDispatch()
  const { api } = useApiHook()
  const loader = useSelector(getLoader('addBatch'))

  const onClose = () => {
    dispatch(toggleModal({ name: 'addBatch' }))
    reset(defaultValues)
  }

  const [emails, setEmails] = useState<string[]>([])

  const handleChange = (event: any, value: string[]) => {
    // Remove duplicates and trim whitespace
    const uniqueEmails = Array.from(new Set(value.map(v => v.trim())))

    // Optional: filter only valid emails
    const validEmails = uniqueEmails.filter(email => isValidEmail(email))

    setEmails(validEmails)
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
          <Typography variant='h5'>Add Student</Typography>
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
            <CustomAutocomplete
              multiple
              freeSolo
              options={[]}
              value={emails}
              onChange={handleChange}
              filterSelectedOptions
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <CustomChip variant='outlined' label={option} {...getTagProps({ index })} key={option} />
                ))
              }
              renderInput={params => (
                <CustomTextField
                  {...params}
                  variant='outlined'
                  label='Enter user emails'
                  placeholder={`Type and press Enter`}
                  multiline
                  minRows={3} // increase height
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      alignItems: 'flex-start', // make text start at top
                      paddingTop: '12px',
                      paddingBottom: '12px'
                    }
                  }}
                  InputLabelProps={{
                    shrink: true // makes sure label stays in place
                  }}
                  helperText={'Type and press Enter'}
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

export default AddStudent
