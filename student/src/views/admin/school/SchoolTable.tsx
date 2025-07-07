'use client'

// MUI Components
import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, CardHeader, IconButton, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import dayjs from 'dayjs'

import CustomTextField from '@/@core/components/mui/TextField'
import type { ThemeColor } from '@/@core/types'
import { toggleModal } from '@/store/slice/modalSlice'
import type { RootState } from '@/store/store'
import { getApiData, getFlag, getLoader } from '@/utils/reduxFunc'

import useApiHook from '@/hooks/useApiHook'
import DataTable from '@/shared/DataTable'
import { addData } from '@/store/slice/apiSlice'
import { addFlag } from '@/store/slice/appSlice'
import { addPayloadData } from '@/store/slice/dataSlice'
import type { SchoolListResponse, SchoolType } from '@/types/schoolTypes'
import type { DescriptionItem } from '@/types/tableTypes'
import AddSchool from './addSchool/AddSchool'
import EditSchool from './editSchool/EditSchool'

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

const description: DescriptionItem<SchoolType>[] = [
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

  // {
  //   headerName: 'SCHOOL',
  //   Cell: ({ row }) => (
  //     <Typography className='capitalize' color='text.primary truncate max-w-[180px]'>
  //       {String(!!row?.isActive)}
  //     </Typography>
  //   )
  // },
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

const SchoolTable = () => {
  const dispatch = useDispatch()
  const { api } = useApiHook()
  const router = useRouter()

  const { pagination, school: schoolList } =
    useSelector<RootState, SchoolListResponse | undefined>(getApiData('schoolList')) || {}

  const refetchCourse = useSelector<RootState, boolean | undefined>(getFlag('schoolList'))
  const loader = useSelector(getLoader('schoolList'))

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
      endPoint: `/school`,
      needLoader: true,
      loaderName: 'schoolList',
      params: {
        page: page,
        search: filter?.search || undefined
      }
    })

    if (response?.success) {
      dispatch(
        addData({
          name: 'schoolList',
          data: response?.data
        })
      )
    } else {
      dispatch(addData({ name: 'schoolList', data: {} }))
    }
  }

  const onAddCourseClick = () => dispatch(toggleModal({ name: 'addSchool' }))

  const onEdit = (row: SchoolType) => {
    dispatch(toggleModal({ name: 'editSchool' }))
    dispatch(addPayloadData({ name: 'editSchool', data: row }))
  }

  const onView = (row: SchoolType) => router.push(`/school/${row?._id}/course`)

  useEffect(() => {
    const timeId = setTimeout(() => {
      getData(1)
    }, 300)

    return () => clearTimeout(timeId)
  }, [filter])

  useEffect(() => {
    if (refetchCourse) {
      dispatch(addFlag({ name: 'schoolList', value: false }))
      getData(1)
    }
  }, [refetchCourse])

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
              Add New School
            </Button>
          </div>
        </div>

        <DataTable
          description={description}
          tableData={schoolList || []}
          pagination={pagination ? { ...pagination, setPageIndex: value => getData(value) } : undefined}
          isLoading={loader}
          allFunction={{
            onEdit,
            onView
          }}
        />
      </Card>
      <AddSchool />
      <EditSchool />
    </>
  )
}

export default SchoolTable
