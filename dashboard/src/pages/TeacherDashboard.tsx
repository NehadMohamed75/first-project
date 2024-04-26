import React, { useEffect, useState } from 'react';
import TeacherNavbar from '../components/TeacherNavbar';
import { Container, Tab, Tabs, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, IconButton, Avatar } from '@mui/material';
import Student from '../interfaces/Student';
import Teacher from '../interfaces/Teacher';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getAllStudents } from '../redux/features/StudentReducer';
import Course from '../interfaces/Course';
import { Quiz, Visibility } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentControlledStudent } from '../redux/features/TeacherReducer';


const TeacherDashboard = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const teacher: Teacher = useAppSelector(state => state.auth_provider.currentUserData) as Teacher 
  const students: Student[] = useAppSelector(state => state.student_provider.students)
  const dispatch = useAppDispatch()
  const [selectedCourse,setSelectedCourse] = useState<Course>(teacher.courses[0])
  const {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllStudents());

    console.log(students);
    
  }, [dispatch]);

  
  
  const handleChangeTab = (event: React.ChangeEvent<{}>, newIndex: number) => {
    console.log('i chanded');
    
    setSelectedTabIndex(newIndex);
    const _selectedCourse = teacher.courses[newIndex];
    if (_selectedCourse) {
      setSelectedCourse(_selectedCourse);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const handleViewStudentDetails = (student: Student) => {
    dispatch(setCurrentControlledStudent(student))
    navigate(`/teachers/${id}/students/${student._id}?course=${selectedCourse.code}`);
  };

  const handleNavigateToStudentDegrees = (student: Student) => {
    dispatch(setCurrentControlledStudent(student))
    navigate(`/teachers/${id}/students/${student._id}/degrees?course=${selectedCourse.code}`);
  };
  
  const filteredStudents = students.filter(student => {
    // Assuming each student has an array of course IDs they are enrolled in
    return student.semester == selectedCourse.semester && student.year == selectedCourse.year;
  });
  return (
    <>
      <TeacherNavbar />
      <Container sx={{ marginTop: '50px' }} >
        <Tabs
          value={selectedTabIndex}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          style={{
            marginBottom: '12px'
          }}
          aria-label="scrollable auto tabs example"
        >
          {teacher.courses.map((course, index) => (
            <Tab key={index} label={course.name} value={index}/>
          ))}
        </Tabs>
        <TableContainer component={Paper} elevation={3}>
          <Table size='small'>
            <TableHead>
              <TableRow selected hover>
                <TableCell align='center'>Image</TableCell>
                <TableCell align='center'>Student Name</TableCell>
                <TableCell align='center'>Program</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => (
                  <TableRow key={index}>
                    <TableCell align='center'>
                      <Avatar alt={student.full_name} src={student.image}/>
                    </TableCell>
                    <TableCell align='center'>{student.full_name}</TableCell>
                    <TableCell align='center'>{student.program}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        color="primary"
                        onClick={() => handleNavigateToStudentDegrees(student)}
                      >
                        <Quiz />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewStudentDetails(student)}
                      >
                        <Visibility />
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
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
};

export default TeacherDashboard;
