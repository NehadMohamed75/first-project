import React, { useState } from 'react';
import { Box, Button, Container, Typography, TextField, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import StaffNavbar from '../components/StaffNavbar';
import { createStaff } from '../redux/features/StaffReducer';

const CreateStaff = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCreateStaff = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }

    dispatch(createStaff(formData))
      .unwrap()
      .then(() => {
        showSuccessNotification('Staff created successfully');
        navigate(-1);
      })
      .catch((error: Error) => {
        showErrorNotification(error.message);
      });
  };

  return (
    <>
      <StaffNavbar />
      <Container style={{ marginTop: '50px' }}>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" component="h1">
            Add Staff
          </Typography>
        </Box>
        <Box>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            size='small'
          />
          <TextField
            name="username"
            label="Username"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            size='small'
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            size='small'
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <Avatar src={image ? URL.createObjectURL(image) : ''} sx={{ width: 100, height: 100 }} />
            <Button
              size="small"
              variant="contained"
              component="label"
              color="warning"
              sx={{ marginLeft: '12px' }}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateStaff}
          sx={{ marginTop: 2 }}
          fullWidth
          size='small'
        >
          Add Administrative Employee
        </Button>
      </Container>
    </>
  );
};

export default CreateStaff;
