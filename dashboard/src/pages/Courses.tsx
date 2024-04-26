import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Box, IconButton, Button, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteCourse, getAllCourses, setCurrentCourse } from '../redux/features/CourseReducer';
import Course from '../interfaces/Course';
import { ArrowBack, Edit, Delete } from '@mui/icons-material'; // Import necessary icons
import { Link, useNavigate, useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import StaffNavbar from '../components/StaffNavbar';

const Courses = () => {
  const dispatch = useAppDispatch();
  const courses: Course[] = useAppSelector(state => state.course_provider.courses);
  const {id} = useParams()

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const navigate = useNavigate()


  const handleEditCourse = (course: Course) => {
    dispatch(setCurrentCourse(course))
    navigate(`/staffs/${id}/courses/${course._id}/update`)
  };

  // Function to handle delete course action
  const handleDeleteCourse = async () => {
    setOpenDialog(false)
    await dispatch(deleteCourse(selectedCourse._id))
    .then(unwrapResult)
    .then(() => {
        showSuccessNotification('Course deleted successfully')
    }).catch((error: Error) => {
        showErrorNotification(error.message)
    })
  };

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (course: Course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <StaffNavbar />
      <Container style={{ marginTop: '12px' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" align="center">
                    All Courses
                </Typography>
            </div>

            <Button variant='contained' size='small' component={Link}  to={`/staffs/${id}/courses/create`}>
                Add Course
            </Button>
        </div>
        <Box sx={{ width: '100%' }}>
          <TableContainer component={Paper} elevation={3}>
            <Table size='small'>
              <TableHead>
                <TableRow selected>
                  <TableCell align="center"><Typography variant="subtitle1">Name</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle1">Code</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle1">Year</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle1">Program</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle1">Semester</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle1">Created At</Typography></TableCell>
                  <TableCell align="center"><Typography variant="subtitle1">Actions</Typography></TableCell> {/* Action column */}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : courses
                ).map((course) => (
                  <TableRow key={course._id}>
                    <TableCell align="center">{course.name}</TableCell>
                    <TableCell align="center">{course.code}</TableCell>
                    <TableCell align="center">{course.year}</TableCell>
                    <TableCell align="center">{course.program}</TableCell>
                    <TableCell align="center">{course.semester}</TableCell>
                    <TableCell align="center">{course.created_at}</TableCell>
                    <TableCell align="center"> {/* Action buttons */}
                      <IconButton onClick={() => handleEditCourse(course)} color='primary'>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDialog(course)} color='error'>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={courses.length}
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
          <Typography variant="body1">Are you sure you want to delete this course?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleDeleteCourse} color="primary" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Courses;
