import { Container, Typography, Grid, Card, CardContent, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import StudentNavbar from '../components/StudentNavbar';
import { useAppSelector } from '../hooks/hooks';
import Student from '../interfaces/Student';
import Degree from '../interfaces/Degree';

const StudentDegrees = () => {
  // Retrieve student data from Redux store
  const student: Student = useAppSelector(state => state.auth_provider.currentUserData) as Student;
  const degrees: Degree[] = student.semesters_degrees;

  // Function to group degrees by year and semester
  const groupDegreesByYearSemester = () => {
    const groupedDegrees: Degree[][][] = [];
    degrees.forEach(degree => {
      const { year, semester } = degree;
      if (!groupedDegrees[year]) {
        groupedDegrees[year] = [];
      }
      if (!groupedDegrees[year][semester]) {
        groupedDegrees[year][semester] = [];
      }
      groupedDegrees[year][semester].push(degree);
    });
    return groupedDegrees;
  };

  // Group degrees by year and semester
  const groupedDegrees = groupDegreesByYearSemester();

  return (
    <>
      <StudentNavbar />
      <Container sx={{ marginTop: '20px' }}>
        {groupedDegrees.map((yearDegrees, year) => (
          <Grid container key={year}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Year {year}
              </Typography>
            </Grid>
            {yearDegrees.map((semesterDegrees, semester) => (
              <Grid item xs={12} key={`${year}-${semester}`}>
                <Typography variant="subtitle1" gutterBottom>
                  Semester {semester}
                </Typography>
                {semesterDegrees.map(degree => (
                  <Card key={degree._id} sx={{ marginBottom: '20px' }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Course: {degree.course}
                      </Typography>
                      <TableContainer component={Paper} elevation={3}>
                        <Table size='small'>
                          <TableHead>
                            <TableRow selected>
                              <TableCell>Exam</TableCell>
                              <TableCell>Mark</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.entries(degree.marks).map(([exam, { name,value }]) => (
                              <TableRow key={exam}>
                                <TableCell>{name}</TableCell>
                                <TableCell>{value ?? '-'}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            ))}
          </Grid>
        ))}
      </Container>
    </>
  );
};

export default StudentDegrees;
