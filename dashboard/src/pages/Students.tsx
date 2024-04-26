import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Box, TablePagination, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from "@mui/material";
import Student from '../interfaces/Student';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteStudent, getAllStudents, setCurrentStudent } from '../redux/features/StudentReducer';
import { Edit } from '@mui/icons-material';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import StaffNavbar from '../components/StaffNavbar';

const Students = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const {id} = useParams()

  const dispatch = useAppDispatch()
  const students: Array<Student> = useAppSelector(state => state.student_provider.students)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllStudents())
  }, [dispatch])

  const handleOpenDialog = (student: Student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = async () => {
    await dispatch(deleteStudent(
      selectedStudent._id
    )).then(unwrapResult)
    .then(() => {
      showSuccessNotification('Student deleted successfully')
    }).catch((error: Error) => {
      showErrorNotification(error.message)
    })

    handleCloseDialog();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigateToViewStudent = (student: Student) => {
    dispatch(setCurrentStudent(student))
    navigate(`/staffs/${id}/students/${student._id}`)
  }

  const navigateToUpdateStudent = (student: Student) => {
    dispatch(setCurrentStudent(student))
    navigate(`/staffs/${id}/students/${student._id}/update`)
  }

  return (
    <>
      <StaffNavbar />
      <Container style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h5">All Students</Typography>
          <Button variant="contained" color="primary" size='small' component={Link} to={`/staffs/${id}/students/create`}>Add Student</Button>
        </div>
        <Box sx={{ width: '100%' }}>
          <TableContainer component={Paper} elevation={3}>
            <Table size='small'>
              <TableHead>
                <TableRow selected>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Image</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Academic Number</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">National ID</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Year</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Semester</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Created At</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : students
                ).map((student) => (
                  <TableRow key={student._id}>
                    <TableCell align="center">
                      <Avatar alt={student.full_name} src={student.image}/>
                    </TableCell>
                    <TableCell align="center">{student.full_name}</TableCell>
                    <TableCell align="center">{student.academic_number}</TableCell>
                    <TableCell align="center">{student.national_id}</TableCell>
                    <TableCell align="center">{student.year}</TableCell>
                    <TableCell align="center">{student.semester}</TableCell>
                    <TableCell align="center">{student.created_at}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        aria-label="view student"
                        onClick={() => navigateToViewStudent(student)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="update student"
                        onClick={() => navigateToUpdateStudent(student)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete student"
                        onClick={() => handleOpenDialog(student)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Container>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this student?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleDeleteStudent} color="primary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Students;
