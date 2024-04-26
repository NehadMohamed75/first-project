import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useAppDispatch } from '../hooks/hooks';
import { createCourse } from '../redux/features/CourseReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import { useNavigate } from 'react-router-dom';
import StaffNavbar from '../components/StaffNavbar';

const CreateCourse = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [year, setYear] = useState(1);
  const [program, setProgram] = useState("cs");
  const [semester, setSemester] = useState(1);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createCourse({ 
        name: name,
        code: code,
        year: year as 1 | 2 | 3 | 4,
        semester: semester as 1 | 2,
        program: program as 'cs'|'is'|'ai'|'bi' | 'all'
    })).then(unwrapResult)
    .then(() => {
        showSuccessNotification("Course successfully created")
        navigate(-1)

    }).catch((error:Error) => {
        showErrorNotification(error.message)
    })
  };

  return (
    <>
      <StaffNavbar />
      <Container style={{ marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
          Add New Course
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
            <MenuItem key={1} value={'cs'}>
              Computer Science
            </MenuItem>
            <MenuItem key={1} value={'ai'}>
              Artificial Intelligence
            </MenuItem>
            <MenuItem key={1} value={'bi'}>
              BioInformatic
            </MenuItem>
            <MenuItem key={1} value={'is'}>
              Information System
            </MenuItem>
            <MenuItem key={1} value={'all'}>
              All
            </MenuItem>
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
            Add Course
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CreateCourse;
