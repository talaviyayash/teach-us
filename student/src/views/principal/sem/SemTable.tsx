'use client'

// MUI Components
import { useCallback, useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { Button, Card, CardHeader, IconButton, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import dayjs from 'dayjs'

import CustomTextField from '@/@core/components/mui/TextField'
import type { ThemeColor } from '@/@core/types'
import { toggleModal } from '@/store/slice/modalSlice'
import type { RootState } from '@/store/store'
import { getApiData, getFlag, getLoader, getUserInfo } from '@/utils/reduxFunc'

import useApiHook from '@/hooks/useApiHook'
import DataTable from '@/shared/DataTable'
import { addData } from '@/store/slice/apiSlice'
import { addFlag } from '@/store/slice/appSlice'
import { addPayloadData } from '@/store/slice/dataSlice'
import type { SemListResponse, SemType } from '@/types/semTypes'
import type { DescriptionItem } from '@/types/tableTypes'
import type { User } from '@/types/userTypes'
import AddSem from './addSem/AddSem'
import EditCourse from './editCourse/EditCourse'

export type UsersType = {
  id: number
  role: string
  email: string
  status: string
  avatar: string
  company: string
  country: string
  contact: string
  fullName: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor
  billing: string
}

// type UserRoleType = {
//   [key: string]: { icon: string; color: string }
// }

// type UserStatusType = {
//   [key: string]: ThemeColor
// }

// const userStatusObj: UserStatusType = {
//   active: 'success',
//   pending: 'warning',
//   inactive: 'secondary'
// }

// const statusOptions = [
//   { label: 'Active', value: 'active' },
//   { label: 'Locked', value: 'locked' },
//   { label: 'Suspended', value: 'suspended' }
// ]

const description: DescriptionItem<SemType>[] = [
  {
    headerName: 'Name',
    Cell: ({ row }) => (
      <Typography color='text.primary' className='font-medium'>
        {row.name}
      </Typography>
    )
  },
  {
    headerName: 'DESCRIPTION',
    Cell: ({ row }) => <Typography>{row.description}</Typography>
  },
  {
    headerName: 'SCHOOL',
    Cell: ({ row }) => (
      <Typography className='capitalize' color='text.primary truncate max-w-[180px]'>
        {row?.school}
      </Typography>
    )
  },
  {
    headerName: 'UPDATED AT',
    Cell: ({ row }) => <Typography>{dayjs(row.updatedAt).format('DD MMM YYYY, h:mm A') ?? '-'}</Typography>
  },

  {
    headerName: 'ACTION',
    Cell: ({ row, allFunction }) => {
      const { onEdit, onView } = allFunction || {}

      return (
        <div className='flex items-center'>
          <IconButton onClick={() => onView(row)}>
            <i className='tabler-eye text-textSecondary' />
          </IconButton>
          <IconButton onClick={() => onEdit(row)}>
            <i className='tabler-edit text-textSecondary' />
          </IconButton>
        </div>
      )
    }
  }
]

const SemTable = () => {
  const dispatch = useDispatch()
  const { api } = useApiHook()
  const { course } = useParams()
  const router = useRouter()

  const { pagination, sem: semList } = useSelector<RootState, SemListResponse | undefined>(getApiData('semList')) || {}

  const refetchSem = useSelector<RootState, boolean | undefined>(getFlag('semList'))
  const loader = useSelector(getLoader('semList'))

  const userInfo = useSelector<RootState, User>(getUserInfo())

  const [filter, setFilter] = useState({
    search: '',
    status: ''
  })

  const onChangeFilter = useCallback(
    ({ name, value }: { name: string; value: string | number }) => setFilter(prev => ({ ...prev, [name]: value })),
    []
  )

  const getData = async (page: number) => {
    const response = await api({
      endPoint: `school/${userInfo?.currentSchool}/course/${course}/sem`,
      needLoader: true,
      loaderName: 'semList',
      params: {
        page: page,
        search: filter?.search || undefined
      }
    })

    if (response?.success) {
      dispatch(
        addData({
          name: 'semList',
          data: response?.data
        })
      )
    } else {
      dispatch(addData({ name: 'semList', data: {} }))
    }
  }

  const onView = (row: SemType) => router.push(`/principal/course/${row?.school}/sem/${row?._id}/batch`)

  const onAddCourseClick = () => dispatch(toggleModal({ name: 'addSem' }))

  const onEdit = (row: SemType) => {
    dispatch(toggleModal({ name: 'editSem' }))
    dispatch(addPayloadData({ name: 'editSem', data: row }))
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      getData(1)
    }, 300)

    return () => clearTimeout(timeId)
  }, [filter])

  useEffect(() => {
    if (refetchSem) {
      dispatch(addFlag({ name: 'semList', value: false }))
      getData(1)
    }
  }, [refetchSem])

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <div className='flex justify-end flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <CustomTextField
              value={filter?.search ?? ''}
              onChange={e => onChangeFilter({ name: 'search', value: e.target.value })}
              placeholder='Search User'
              className='max-sm:is-full'
            />
            {/* <CustomTextField
              select
              value={filter.status ?? ''}
              placeholder='status'
              onChange={e => onChangeFilter({ name: 'status', value: e.target.value })}
              className='max-sm:w-full sm:w-[130px]'
              SelectProps={{
                displayEmpty: true,
                renderValue: selected => {
                  const statusOptions = [
                    { label: 'View All', value: '' },
                    { label: 'Active', value: 'active' },
                    { label: 'Locked', value: 'Locked' },
                    { label: 'Suspended', value: 'suspended' }
                  ]

                  const selectedOption = statusOptions.find(option => option.value === selected)

                  return selectedOption ? selectedOption.label : 'View All'
                }
              }}
            >
              <MenuItem value=''>View All</MenuItem>
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='locked'>Locked</MenuItem>
              <MenuItem value='suspended'>Suspended</MenuItem>
            </CustomTextField> */}

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              className='max-sm:is-full'
              onClick={onAddCourseClick}
            >
              Add New Sem
            </Button>
          </div>
        </div>

        <DataTable
          description={description}
          tableData={semList || []}
          pagination={pagination ? { ...pagination, setPageIndex: value => getData(value) } : undefined}
          isLoading={loader}
          allFunction={{
            onEdit,
            onView
          }}
        />
      </Card>
      <AddSem />
      <EditCourse />
    </>
  )
}

export default SemTable
