import { useEffect } from 'react';
import { Box, Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Button, Avatar } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon, Add as AddIcon, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStaffs, deleteStaff, setCurrentStaff } from '../redux/features/StaffReducer';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import StaffNavbar from '../components/StaffNavbar';
import { showErrorNotification } from '../utils/notifications';
import Staff from '../interfaces/Staff';

const Staffs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    dispatch(getAllStaffs())
  }, [dispatch]);

  const { staffs, loading, error } = useAppSelector(state => state.staff_provider);

  const handleDeleteStaff = (id: string) => {
    dispatch(deleteStaff(id))
      .unwrap()
      .then(() => {
        // Show success notification or any other action after successful deletion
      })
      .catch((error: Error) => {
        showErrorNotification(error.message);
      });
  };

  const handleEditStaff = (staff: Staff) => {
    dispatch(setCurrentStaff(staff))
    navigate(`/staffs/${id}/staffs/${staff._id}/update`)
  }

  return (
    <>
      <StaffNavbar />
      <Container style={{ marginTop: '12px' }}>
        <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="h1">
          Administrative Employees
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 'auto' }}
            onClick={() => navigate(`/staffs/${id}/staffs/create`)}
          >
            Add Administrative Employee
          </Button>
        </Box>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography>Error: {error}</Typography>}
        <TableContainer component={Paper} elevation={3}>
          <Table size='small'>
            <TableHead>
              <TableRow selected>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffs.map((staff) => (
                <TableRow key={staff._id}>
                  <TableCell align="center">
                    <Avatar src={staff.image} sx={{ width: 40, height: 40 }}/>
                  </TableCell>
                  <TableCell align="center">{staff.name}</TableCell>
                  <TableCell align="center">{staff.username}</TableCell>
                  <TableCell align="center">
                    {
                        staff.role == 'normal' && 
                        (
                            <>
                                <IconButton color="primary" onClick={() => handleEditStaff(staff)}>
                                <EditIcon />
                                </IconButton>

                                <IconButton color="error" onClick={() => handleDeleteStaff(staff._id)}>
                                <DeleteIcon />
                                </IconButton>
                            </>
                        )
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Staffs;
