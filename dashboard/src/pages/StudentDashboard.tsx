import StudentNavbar from "../components/StudentNavbar";
import { Grid, Typography, Divider, Card, CardContent, CardMedia, Button, Box } from "@mui/material";
import { useAppSelector } from '../hooks/hooks';
import { Link, useParams } from 'react-router-dom';
import Student from "../interfaces/Student";

const StudentDashboard = () => {
  const student = useAppSelector(state => state.auth_provider.currentUserData) as Student;
  const {id} = useParams()

  return (
    <div>
      <StudentNavbar />
      <Grid container spacing={2} sx={{ padding: '20px' }}>
      <Grid item xs={24} sm={24} md={24}>
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
                <Box sx={{ display: 'flex', alignItems: 'start', mt: 2, padding: '12px' }}>
                    <Typography variant="body1" style={{ marginRight: '12px' }}>
                      Program {student.program}
                    </Typography>
                    -
                    <Typography variant="body1" style={{ marginRight: '12px', marginLeft: '12px' }}>
                      Year {student.year}
                    </Typography>
                    -
                    <Typography variant="body1" style={{ marginLeft: '12px' }}>
                      Semester {student.semester}
                    </Typography>
                </Box>
                </CardContent>
            </Card>
        </Grid>

      <Grid item xs={24} sm={24}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                    Your Information
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
    </div>
  );
};

export default StudentDashboard;
