import { useState } from 'react';
import { Container, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { loginStudent } from '../redux/features/AuthReducer';
import { useAppDispatch } from '../hooks/hooks';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import { unwrapResult } from '@reduxjs/toolkit';

const StudentLogin = () => {
  const [nationalId, setNationalId] = useState("");
  const [academicNumber, setAcademicNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const [nationalIdError, setNationalIdError] = useState('');
  const [academicNumberError, setAcademicNumberError] = useState('');

  const handleNationalIdChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) { // Ensure value is numeric
      setNationalId(value);
      if (value.length == 14) { // Ensure value is less than or equal to 14 characters
        setNationalIdError('');
      } else {
        setNationalIdError('National ID must be 14 numbers');
      }
    } else {
      setNationalIdError('National ID must contain only numbers');
    }
  };

  const handleAcademicNumberChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) { // Ensure value is numeric
      setAcademicNumber(value);
      if (value.length == 7) { // Ensure value is less than or equal to 14 characters
        setAcademicNumberError('');
      } else {
        setAcademicNumberError('Academic Number must be 7 numbers');
      }
    } else {
      setAcademicNumberError('Academic Number must contain only numbers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginStudent({
      academic_number: academicNumber,
      national_id: nationalId
    })).then(unwrapResult)
    .then((response) => {
        
        showSuccessNotification('Login successful')
        navigate(`/students/${response.id}/dashboard`, {
            replace: true
        })
    }).catch((error: Error) => {
        showErrorNotification(error.message)
    })
  };

  return (
    <>
      <Container className='root'>
        <Typography variant="h4" gutterBottom>Student Login</Typography>

        <form onSubmit={handleSubmit}>
        <TextField
            value={academicNumber}
            onChange={handleAcademicNumberChange}
            label="Academic Number"
            fullWidth
            variant="outlined"
            error={Boolean(academicNumberError)}
            inputProps={{
              minLength: 7,
              maxLength: 7
            }}
            helperText={academicNumberError}
            size='small'
            style={{ marginBottom: '12px' }}
            required
          />

          <TextField
            value={nationalId}
            onChange={handleNationalIdChange}
            label="National ID"
            fullWidth
            variant="outlined"
            error={Boolean(nationalIdError)}
            helperText={nationalIdError}
            style={{ marginBottom: '12px' }}
            inputProps={{
              minLength: 14,
              maxLength: 14
            }}
            size='small'
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth size='small'>
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default StudentLogin;
