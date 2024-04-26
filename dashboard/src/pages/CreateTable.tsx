import React, { useState } from 'react';
import { Box, Button, Container, Typography, TextField, Input, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createStudyTable } from '../redux/features/StudyTableReducer';
import { useAppDispatch } from '../hooks/hooks';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import StaffNavbar from '../components/StaffNavbar';

const CreateTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [semester,setSemester] = useState('1')
  const [year,setYear] = useState('1')
  const [file,setFile] = useState<File>(null)

  const handleSemesterChange = (value: string) => {
    setSemester(value)
  };

  const handleYearChange = (value: string) => {
    setYear(value)
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setFile(file)
  };

  const handleCreateTable = () => {
    const formData = new FormData();
    formData.append('semester', semester);
    formData.append('year', year);
    formData.append('file', file);

    dispatch(createStudyTable(formData))
      .unwrap()
      .then(() => {
        showSuccessNotification('works fine')
        navigate(-1)
      })
      .catch((error: Error) => {
        showErrorNotification(error.message)
      });
  };

  return (
    <>
        <StaffNavbar />
        <Container style={{ marginTop: '50px' }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="h1">
          Add Table
        </Typography>
      </Box>
      <Box>
        <TextField
          name="semester"
          label="Semester"
          value={semester}
          size='small'
          onChange={(e) => handleSemesterChange(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
          select
        >
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
        </TextField>
        <TextField
          name="year"
          label="Level"
          size='small'
          value={year}
          onChange={(e) => handleYearChange(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
          select
        >
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
            <MenuItem value={'3'}>3</MenuItem>
            <MenuItem value={'4'}>4</MenuItem>
        </TextField>
        {
            file && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <Typography variant='h6' style={{ marginRight: '12px' }}>{file.name}</Typography>
                    <Typography variant='h6' style={{ color: 'blueviolet' }}>{(file.size / 1024).toFixed(2)} KB</Typography>
                </div>
            )
        }
        <Button 
            size='small' 
            variant='contained'
            component="label"
            color="warning"
            fullWidth
        >
            Upload PDF File
        <input  
          id="pdf-file"
          type="file"
          hidden
          onChange={handleFileChange}
        />
        </Button>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateTable}
        sx={{ marginTop: 2 }}
        size='small'
        fullWidth
      >
        Add Table
      </Button>
    </Container>
    </>
  );
};

export default CreateTable;
