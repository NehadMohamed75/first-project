import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Avatar, Divider, Button, List, ListItem, ListItemText, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { deleteTeacher } from '../redux/features/TeacherReducer';
import StaffNavbar from '../components/StaffNavbar';
import { showErrorNotification } from '../utils/notifications';

const ViewTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Retrieve teacher data from Redux store
  const teacher = useAppSelector(state => state.teacher_provider.currentTeacher);

  // Confirmation dialog state
  const [openDialog, setOpenDialog] = useState(false);

  // Function to handle opening the confirmation dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle deleting a teacher
  const handleDeleteTeacher = () => {
    dispatch(deleteTeacher(teacher._id))
      .then(() => {
        // Redirect to the list of teachers after successful deletion
        navigate(-1);
      })
      .catch((error) => {
        showErrorNotification(error.message);
      });
  };

  return (
    <>
      <StaffNavbar />
      <Container style={{ marginTop: '50px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }} component={Paper} padding={2} elevation={3}>
          <img src={teacher.image} width={100} height={100} alt={teacher.name} />
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {teacher.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {teacher.username}
            </Typography>
          </Box>
        </Box>
        <List>
          {teacher.courses.map(course => (
            <ListItem key={course._id} disablePadding>
              <ListItemText
                primary={course.name}
                secondary={`Code: ${course.code}, Semester: ${course.semester}, Year: ${course.year}, Program: ${course.program}`}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          fullWidth
          size='small'
        >
          Delete Faculty Member
        </Button>
        {/* Confirmation dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this Faculty Member?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteTeacher} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ViewTeacher;
