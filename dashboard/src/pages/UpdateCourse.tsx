import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { updateCourse } from '../redux/features/CourseReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import StaffNavbar from '../components/StaffNavbar';

const UpdateCourse = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Retrieve the current course from Redux store
  const currentCourse = useAppSelector(state => state.course_provider.currentCourse);

  // Local state to manage form fields
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [year, setYear] = useState(1);
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState(1);

  // Fetch the course data on component mount
  useEffect(() => {
    if(currentCourse != null){
      setName(currentCourse.name);
        setCode(currentCourse.code);
        setYear(currentCourse.year);
        setProgram(currentCourse.program);
        setSemester(currentCourse.semester);
    }
  }, [currentCourse]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateCourse({
      id: id,
      data: {
        name: name,
        code: code,
        year: year as 1 | 2 | 3 | 4,
        semester: semester as 1 | 2,
        program: program as 'cs' | 'is' | 'ai' | 'bi'
      }
    })).then(unwrapResult)
      .then(() => {
        showSuccessNotification("Course successfully updated");
        navigate(-1);
      }).catch((error: Error) => {
        showErrorNotification(error.message);
      });
  };

  return (
    <>
      <StaffNavbar />
      <Container style={{ marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
          Update Course
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Course Name"
            variant="outlined"
            size='small'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '20px' }}
            required
          />
          <TextField
            label="Course Code"
            variant="outlined"
            size='small'
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ marginBottom: '20px' }}
            required
          />
          <TextField
            select
            label="Program"
            variant="outlined"
            size='small'
            fullWidth
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            style={{ marginBottom: '20px' }}
            required
          >
            {['cs', 'is', 'ai', 'bi'].map((program) => (
              <MenuItem key={program} value={program}>
                {program}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Year"
            variant="outlined"
            size='small'
            fullWidth
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{ marginBottom: '20px' }}
            required
          >
            {[1, 2, 3, 4].map((year) => (
              <MenuItem key={year} value={year}>
                Year {year}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Semester"
            variant="outlined"
            size='small'
            fullWidth
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            style={{ marginBottom: '20px' }}
            required
          >
            {[1, 2].map((semester) => (
              <MenuItem key={semester} value={semester}>
                Semester {semester}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="small"
          >
            Update Course
          </Button>
        </form>
      </Container>
    </>
  );
};

export default UpdateCourse;
