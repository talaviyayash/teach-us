import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponent from './TablePaginationComponent'
import type { DataTableProps } from '@/types/tableTypes'

const DataTable = <T extends object>({
  description,
  tableData,
  pagination,
  allFunction,
  isLoading
}: DataTableProps<T>) => {
  return (
    <>
      <div className='overflow-x-auto'>
        <Table className={tableStyles.table}>
          <TableHead>
            <TableRow>
              {description?.map(({ HeaderCell, headerName }, index) => (
                <TableCell key={index}>{HeaderCell ? <HeaderCell {...{ allFunction }} /> : headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={100} align='center'>
                  <CircularProgress color='primary' size={32} />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {tableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={description?.length || 1} align='center'>
                      {'No data available'}
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {tableData?.map((row, index) => (
                      <TableRow key={index}>
                        {description?.map(({ key, Cell }, ind) => (
                          <TableCell key={`${index}-${ind}`}>
                            {Cell ? <Cell {...{ row, index, allFunction }} /> : String(row?.[key as keyof T] ?? '')}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && !isLoading && <TablePaginationComponent pagination={pagination} />}
    </>
  )
}

export default DataTable
