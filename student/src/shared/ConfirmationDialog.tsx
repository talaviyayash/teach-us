import type { ReactNode } from 'react'

import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'

type ConfirmationDialogProps = {
  label?: string
  description?: string | ReactNode
  btn?: string
  open?: boolean | undefined
  onClose?: () => unknown
  onSuccess?: () => unknown
  isLoading?: boolean | undefined
}

const ConfirmationDialog = ({
  label = 'Are you sure?',
  description = '',
  btn = '',
  open,
  onClose,
  onSuccess,
  isLoading
}: ConfirmationDialogProps) => {
  return (
    <Dialog fullWidth maxWidth='xs' open={!!open} onClose={onClose}>
      <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        <i className='tabler-alert-circle text-[88px] mbe-6 text-warning' />
        <Typography variant='h4'>{label}</Typography>
        <Typography color='text.primary'>{description}</Typography>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' onClick={onSuccess} disabled={isLoading}>
          {btn}
        </Button>
        <Button variant='tonal' color='secondary' onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
