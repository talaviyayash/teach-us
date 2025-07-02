import { useDispatch, useSelector } from 'react-redux'

import useApiHook from '@/hooks/useApiHook'
import ConfirmationDialog from '@/shared/ConfirmationDialog'
import { addData } from '@/store/slice/apiSlice'
import { addFlag } from '@/store/slice/appSlice'
import { toggleModal } from '@/store/slice/modalSlice'
import type { RootState } from '@/store/store'
import type { CourseType } from '@/types/courseTypes'
import { getData, getLoader, getModal } from '@/utils/reduxFunc'

const DeleteDiv = () => {
  const deleteDivModal = useSelector(getModal('deleteDiv'))
  const editDivData = useSelector<RootState, CourseType | undefined>(getData('deleteDiv'))
  const dispatch = useDispatch()
  const { api } = useApiHook()
  const loader = useSelector(getLoader('deleteDiv'))

  const onClose = () => {
    dispatch(toggleModal({ name: 'deleteDiv' }))
    dispatch(addData({ name: 'deleteDiv', data: undefined }))
  }

  const onSubmit = async () => {
    const response = await api({
      method: 'PUT',
      endPoint: `/batch/${editDivData?._id}`,
      loaderName: 'deleteDiv',
      needLoader: true,
      showToastMessage: true
    })

    if (response?.success) {
      dispatch(addFlag({ name: 'divList', value: true }))
      onClose()
    }
  }

  return (
    <>
      <ConfirmationDialog
        btn='Yes, Delete div.'
        description='This changes will not be revertible.'
        open={deleteDivModal}
        onClose={onClose}
        onSuccess={onSubmit}
        isLoading={loader}
      />
    </>
  )
}

export default DeleteDiv
