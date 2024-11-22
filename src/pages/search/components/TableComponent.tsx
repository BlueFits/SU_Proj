import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { program } from '../../../services/modules/programs/programs.slice';
import { CircularProgress } from '@mui/material';
import { EmptyComponent } from '../../../components/EmptyData/EmptyData';

interface Column {
  id: 'programName' | 'schoolName' | 'location' | 'length' | 'tutionValue' | 'entranceGrade';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'programName',
    label: 'name',
    minWidth: 100
  },
  {
    id: 'schoolName',
    label: 'School',
    minWidth: 100
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 100,
  },
  {
    id: 'length',
    label: 'Length',
    minWidth: 100,
    // align: 'right',
  },
  {
    id: 'tutionValue',
    label: 'Tuition',
    minWidth: 100,
  },
  {
    id: 'entranceGrade',
    label: 'Grade',
    minWidth: 100,
  },
];

const rowsPerPageOption = [10, 25, 50, 100];

const minHeightTable = 600;

const TableComponent: React.FC<{ programs: program[], isFetching: boolean }> = ({ programs, isFetching }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOption[0]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    // <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <div className='h-full w-full relative flex flex-col justify-between'>
      <div className='relative w-full h-full'>
        <TableContainer
          sx={{
            // flex: 1,
            // overflow: 'auto',
            height: "100%",
            position: "absolute",
          }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching ?
                <TableRow sx={{ border: "none" }}>
                  <TableCell sx={{ height: minHeightTable }} colSpan={5}>
                    <div className={`flex justify-center items-center`}>
                      <CircularProgress />
                    </div>
                  </TableCell>
                </TableRow>
                :
                programs.length > 0 ? programs && programs.length > 0 && programs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={`KeyForRow:${index}`}>
                        {columns.map((column, index) => {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row[column.id]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                  :
                  <TableRow sx={{ border: "none" }}>
                    <TableCell sx={{ height: minHeightTable }} colSpan={5}>
                      <div className="flex justify-center items-center py-10">
                        <EmptyComponent />
                      </div>
                    </TableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        sx={{
          // flex: 1,
          // width: "100%",
          margin: 0, // Remove unwanted margin
          padding: 0, // Remove unwanted padding
          overflow: 'hidden', // Contain it within the boundaries
        }}
        rowsPerPageOptions={rowsPerPageOption}
        component="div"
        count={programs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
    // </Paper>
  );
}

export default TableComponent;