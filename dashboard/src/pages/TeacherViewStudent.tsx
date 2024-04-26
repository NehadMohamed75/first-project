import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Divider, IconButton, Box } from "@mui/material";
import { Edit as EditIcon, ArrowBack as ArrowBackIcon, WorkspacePremiumOutlined } from '@mui/icons-material';
import Student from '../interfaces/Student';
import StaffNavbar from '../components/StaffNavbar';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { setCurrentControlledStudent } from "../redux/features/TeacherReducer";

const TeacherViewStudent = () => {
  const student: Student = useAppSelector(state => state.teacher_provider.currentControlledStudent);
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [query] = useSearchParams()
  const course = query.get('course')

  const navigateToSetDegrees = () => {
    dispatch(setCurrentControlledStudent(student))
    navigate(`/teachers/${id}/students/${student._id}/degrees?course=${course}`);
  }

  return (
    <>
      <StaffNavbar />
      <Container sx={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 4 }}>
                <CardMedia
                component="img"
                height="auto"
                image={student.image}
                alt={student.full_name}
                sx={{ width: '100%', maxHeight: 300 }}
                />
                <CardContent style={{ width: '100%', padding: '12px' }}>
                <Typography variant="h6" align="center" gutterBottom>
                    {student.full_name}
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mt: 2, padding: '12px' }}>
                    <Typography variant="body1">
                    <strong>Program</strong> {student.program}
                    </Typography>
                    <Typography variant="body1">
                    <strong>Year</strong> {student.year}
                    </Typography>
                    <Typography variant="body1">
                    <strong>Semester</strong> {student.semester}
                    </Typography>
                </Box>
                <Divider sx={{ mt: 2, mb: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        size="small" 
                        style={{ marginRight: '6px', marginLeft: '6px' }}
                        startIcon={<WorkspacePremiumOutlined />}
                        onClick={navigateToSetDegrees}
                    >
                        Set Degrees
                    </Button>
                </Box>
                </CardContent>
            </Card>
        </Grid>


          <Grid item xs={12} sm={8}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                    Student Details
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>National ID</strong>
                    </Typography>
                    <Typography variant="body2">
                      {student.national_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Academic Number</strong>
                    </Typography>
                    <Typography variant="body2">
                      {student.academic_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Birth Date</strong>
                    </Typography>
                    <Typography variant="body2">
                      {student.birth_date}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Address</strong>
                    </Typography>
                    <Typography variant="body2">
                      {student.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Phone Number</strong>
                    </Typography>
                    <Typography variant="body2">
                      {student.phone_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Email</strong>
                    </Typography>
                    <Typography variant="body2">
                      {student.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Created At</strong>
                    </Typography>
                    <Typography variant="body2">
                      {student.created_at}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          
        </Grid>
      </Container>
    </>
  );
};

export default TeacherViewStudent;
