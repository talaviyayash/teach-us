// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// Types
import type { TablePaginationProps } from '@/types/tableTypes'

// Third Party Imports

const TablePaginationComponent = ({ pagination }: TablePaginationProps) => {
  if (!pagination) return null // Safeguard

  const { page, size, total, setPageIndex } = pagination

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`Showing ${total === 0 ? 0 : (page - 1) * size + 1} to ${Math.min(page * size, total)} of ${total} entries`}{' '}
      </Typography>

      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={Math.ceil(total / size)}
        page={page}
        onChange={(_, newPage) => setPageIndex(newPage)}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
