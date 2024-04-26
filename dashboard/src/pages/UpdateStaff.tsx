import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, TextField, Avatar, ImageListItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { updateStaff } from '../redux/features/StaffReducer';
import StaffNavbar from '../components/StaffNavbar';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import { unwrapResult } from '@reduxjs/toolkit';

const UpdateStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const staff = useAppSelector(state => state.staff_provider.currentStaff)
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(staff ? {
    src: staff.image,
    type: 'initial'
  } : null);

  // Fetch staff data on component mount
  useEffect(() => {
    if(staff != null){
        setName(staff.name);
        setUsername(staff.username);
        setPassword(staff.password);
    }
  }, [staff]);

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleImageChange = (e: Event) => {
    const image = e.target.files[0];
    setImage({
        src: image,
        type: 'uploaded'
    });
  };

  const handleUpdateStaff = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);
    if(image.type == 'uploaded'){
        formData.append('image', image.src);
    }

    dispatch(updateStaff({ 
        id: staff._id,
        data: formData
     }))
      .then(unwrapResult)
      .then(() => {
        showSuccessNotification('updated successfully');
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
          <Typography variant="h4" component="h1">
            Update Administrative Employee
          </Typography>
        </Box>
        
        <div style={{ padding: '12px',display:'flex',justifyContent: 'center', alignItems:'center' }}>
        <Avatar src={image.type == 'uploaded' ? URL.createObjectURL(image.src) : staff.image} sx={{ width: 100, height: 100 }} />
        </div>

        <Box>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            fullWidth
            size='small'
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="username"
            label="Username"
            value={username}
            size='small'
            onChange={(e) => handleUsernameChange(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
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
            <Button
              size="small"
              variant="contained"
              component="label"
              color="warning"
              fullWidth
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateStaff}
          sx={{ marginTop: 2 }}
          size='small'
          fullWidth
        >
          Update Staff
        </Button>
      </Container>
    </>
  );
};

export default UpdateStaff;
