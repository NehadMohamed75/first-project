import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem, ImageListItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Course from '../interfaces/Course';
import { showErrorNotification, showInfoNotification, showSuccessNotification } from '../utils/notifications';
import { createTeacher } from '../redux/features/TeacherReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import StaffNavbar from '../components/StaffNavbar';

const CreateTeacher = () => {
  const allCourses: Course[] = useAppSelector(state => state.course_provider.courses);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [numCourses, setNumCourses] = useState(1);
  const [image, setImage] = useState(null);
  const {id} = useParams()

  const [courses, setCourses] = useState<Array<{ course: string, semester: number, year: number, program: string }>>([{
    course: '',
    semester: 1,
    program: 'cs',
    year: 1
  }]);

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const newCourses = Array.from({ length: numCourses }, () => ({ course: '',program: 'cs' , semester: 1, year: 1 }));
    setCourses(newCourses);
  }, [numCourses]);

  const handleNumCoursesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num)) {
      setNumCourses(num);
    }
  };

  const handleCourseChange = (index: number, field: string, value: string | number) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const handleCreateTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(image == null){
        showInfoNotification('Upload image first')
        return
    }

    const coursesList = courses.map(c => c.course)
    
    const formData = new FormData()
    formData.append('name', name)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('courses', JSON.stringify(coursesList))
    formData.append('image', image)
    formData.append('created_by',id)

    await dispatch(createTeacher(formData))
    .then(unwrapResult)
    .then(() => {
        showSuccessNotification('Teacher created successfully')
        navigate(-1)
    }).catch((error: Error) => {
        showErrorNotification(error.message)
    })
  };

  const handleImageUploadChange = (event: Event) => {
    const image = event.target.files[0]
    setImage(image)
  }

  return (
    <>
      <StaffNavbar />
      <Container  sx={{ marginTop: '50px', marginBottom: '50px' }}>
        <Typography variant="h5" gutterBottom>
          Add Faculty Member
        </Typography>
        <form onSubmit={handleCreateTeacher}>
        <Container style={{
                margin: 0,
                padding: '8px',
                border: '2px solid #eee',
                borderRadius: '3px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '12px',
            }}>
               {
                image != null ? 
                (<ImageListItem>
                    <img 
                        src={URL.createObjectURL(image)}
                    />
                </ImageListItem> )
                :<p>No Uploaded Image</p>
               }
            </Container>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginRight: '10px', marginBottom: '12px' }}
            fullWidth
            size='small'
            required
          />
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginRight: '10px', marginBottom: '12px' }}
            fullWidth
            required
            size='small'
          />
          <TextField
            label="Password"
            variant="outlined"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginRight: '10px', marginBottom: '12px' }}
            fullWidth
            required
            size='small'
          />
          <TextField
            label="Number of Courses"
            type="number"
            variant="outlined"
            value={numCourses}
            onChange={handleNumCoursesChange}
            inputProps={{
              min: 1
            }}
            sx={{ marginRight: '10px', marginBottom: '12px' }}
            fullWidth
            size='small'
          />
          {courses.map((course, index) => (
            <Box key={index} sx={{ marginBottom: '20px' }}>
              <Typography variant="h6" align="left" gutterBottom>
                Course {index + 1}
              </Typography>
              <TextField
                select
                label="Program"
                variant="outlined"
                fullWidth
                value={course.program}
                onChange={(e) => handleCourseChange(index, 'program', e.target.value)}
                sx={{ marginBottom: '12px' }}
                size='small'
                required
              >
                {['cs','is','ai','bi'].map((program) => (
                  <MenuItem key={program} value={program}>{program}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Year"
                variant="outlined"
                fullWidth
                value={course.year}
                onChange={(e) => handleCourseChange(index, 'year', parseInt(e.target.value))}
                sx={{ marginBottom: '12px' }}
                size='small'
                required
              >
                {[1, 2, 3, 4].map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Semester"
                variant="outlined"
                fullWidth
                value={course.semester}
                onChange={(e) => handleCourseChange(index, 'semester', parseInt(e.target.value))}
                sx={{ marginBottom: '12px' }}
                size='small'
                required
              >
                {[1, 2].map((semester) => (
                  <MenuItem key={semester} value={semester}>{semester}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Course"
                variant="outlined"
                fullWidth
                value={course.course}
                onChange={(e) => handleCourseChange(index, 'course', e.target.value)}
                sx={{ marginBottom: '12px' }}
                size='small'
                required
              >
                {allCourses
                  .filter(c => c.year === course.year && c.semester === course.semester && c.program == course.program)
                  .map((c) => (
                    <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                  ))}
              </TextField>
            </Box>
          ))}
          <Button
            variant="contained"
            component="label"
            size="small"
            color="warning"
            fullWidth
            style={{
                marginBottom: '20px'
            }}
            >
            Upload Image
            <input
                type="file"
                hidden
                onChange={handleImageUploadChange}
            />
            </Button>
          <Button type="submit" variant="contained" color="primary" fullWidth size='small'>
            Add Faculty Member
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CreateTeacher;
