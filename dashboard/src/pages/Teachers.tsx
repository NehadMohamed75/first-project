import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Box, TablePagination, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteTeacher, getAllTeachers, setCurrentTeacher } from '../redux/features/TeacherReducer';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import Teacher from '../interfaces/Teacher';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import StaffNavbar from '../components/StaffNavbar';

const Teachers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useAppDispatch();
  const {id} = useParams()

  const teachers: Array<Teacher> = useAppSelector(state => state.teacher_provider.teachers);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigateToViewTeacher = (teacher: Teacher) => {
    dispatch(setCurrentTeacher(teacher));
    navigate(`/staffs/${id}/teachers/${teacher._id}`);
  };

  const navigateToUpdateTeacher = (teacher: Teacher) => {
    dispatch(setCurrentTeacher(teacher));
    navigate(`/staffs/${id}/teachers/${teacher._id}/update`);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleOpenDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTeacher(null);
  };

  const handleDeleteTeacher = async () => {
    await dispatch(deleteTeacher(
      selectedTeacher._id
    )).then(unwrapResult)
    .then(() => {
      showSuccessNotification('Student deleted successfully')
    }).catch((error: Error) => {
      showErrorNotification(error.message)
    })

    handleCloseDialog();
  };

  return (
    <>
      <StaffNavbar />
      <Container style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h6">All Faculty Members</Typography>
          <Button variant="contained" color="primary" size='small' component={Link} to={`/staffs/${id}/teachers/create`}>Add Faculty Member</Button>
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
                    <Typography variant="subtitle1">Username</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Courses</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? teachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : teachers
                ).map((teacher) => (
                  <TableRow key={teacher._id}>
                    <TableCell align="center">
                      <Avatar alt={teacher.name} src={teacher.image}/>
                    </TableCell>
                    <TableCell align="center">{teacher.name}</TableCell>
                    <TableCell align="center">{teacher.username}</TableCell>
                    <TableCell align="center">
                      {teacher.courses.map(course => course.code).join(', ')}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        aria-label="view teacher"
                        onClick={() => navigateToViewTeacher(teacher)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="update teacher"
                        onClick={() => navigateToUpdateTeacher(teacher)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete teacher"
                        onClick={() => handleOpenDialog(teacher)}
                      >
                        <Delete />
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
            count={teachers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Container>

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
          <Button onClick={handleDeleteTeacher} color="primary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Teachers;
