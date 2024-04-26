import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Divider, IconButton, Box } from "@mui/material";
import { Edit as EditIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Student from '../interfaces/Student';
import StaffNavbar from '../components/StaffNavbar';
import { useAppSelector } from "../hooks/hooks";
import { useParams } from "react-router-dom";

const ViewStudent = () => {
  const student: Student = useAppSelector(state => state.student_provider.currentStudent);
  const {id} = useParams()

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
                    <Button variant="contained" color="primary" startIcon={<EditIcon />} href={
                        `/staffs/${id}/students/${student._id}/update`
                    } size="small" fullWidth style={{ margin: '0px 12px' }}>
                    Edit Student
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

export default ViewStudent;
