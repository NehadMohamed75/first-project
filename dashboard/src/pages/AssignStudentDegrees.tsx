import { useState } from 'react';
import { Container, Grid, Typography, IconButton, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Student from '../interfaces/Student';
import { ArrowBack, Clear as ClearIcon, Edit } from '@mui/icons-material';
import TeacherNavbar from '../components/TeacherNavbar';
import Degree from '../interfaces/Degree';
import { updateStudentDegree } from '../redux/features/TeacherReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import Mark from '../interfaces/Mark';

const AssignStudentDegree = () => {
  const [query] = useSearchParams()
  const {id} = useParams()
  const course = query.get('course')
 

  const navigate = useNavigate();
  const student: Student = useAppSelector(state => state.teacher_provider.currentControlledStudent);
  const studentDegree: Degree = student.semesters_degrees.filter(sd => {
    return sd.course == course
  })[0]
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMark, setSelectedMark] = useState<Mark>(null);
  const [selectedDegree, setSelectedDegree] = useState<Degree>(null);
  const dispatch = useAppDispatch()


  const handleEditClick = (studentDegree: Degree,mark: any) => {
    setSelectedMark(mark);
    setSelectedDegree(studentDegree)
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMark(null);
  };

  const handleUpdateMark = async () => {
    setOpenDialog(false);
    await dispatch(updateStudentDegree({
        student_id: student._id,
        teacher_id: id,
        degree_id: selectedDegree._id,
        data: {
            value: 20,
            course: course,
            mark: selectedMark
        }
    })).then(unwrapResult)
    .then(() => {
        showSuccessNotification('Degree updated successfully')
    }).catch((error: Error) => {
        showErrorNotification(error.message)
    })
  };

  return (
    <>
      <TeacherNavbar />
      <Container sx={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="primary" onClick={() => navigate(-1)}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5">{student.full_name} Degrees in {course}</Typography>
            </Box>
            <div>
                <Card>
                  <CardContent>
                    <TableContainer component={Paper} elevation={3}>
                      <Table>
                        <TableHead>
                          <TableRow selected>
                            <TableCell align="center">Mark Name</TableCell>
                            <TableCell align="center">Value</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(studentDegree.marks).map((mark, index) => (
                            <TableRow key={index}>
                              <TableCell align="center">{studentDegree.marks[mark]['name']}</TableCell>
                              <TableCell align="center">{studentDegree.marks[mark]['value'] !== null ? studentDegree.marks[mark]['value'] : '-'}</TableCell>
                              <TableCell align="center">
                                <IconButton size="small" color="primary" onClick={() => handleEditClick(studentDegree,studentDegree.marks[mark])}>
                                  <Edit />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <ClearIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </div>
          </Grid>
        </Grid>
      </Container>
      {/* Dialog for entering marks */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Mark</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="mark"
            size='small'
            label="Mark"
            type="number"
            fullWidth
            value={selectedMark}
            onChange={(e) => setSelectedMark(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateMark} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssignStudentDegree;
