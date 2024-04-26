import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { updateAnnouncement } from '../redux/features/AnnouncementReducer';
import Announcement from '../interfaces/Announcement';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import StaffNavbar from '../components/StaffNavbar';

const UpdateAnnouncement = () => {
  const dispatch = useAppDispatch();
  const announcement: Announcement = useAppSelector(state => state.announcement_provider.currentAnnouncement);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()

  const [image, setImage] = useState(announcement ? {
    src: announcement.image,
    type: 'initial'
  } : null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)

    if(image.type == 'uploaded'){
      formData.append('image', image.src);
    }
    dispatch(updateAnnouncement({
        id: announcement._id,
        data: formData
    })).then(unwrapResult)
    .then(() => {
        showSuccessNotification('Successfully updated announcement')
        navigate(-1)
    }).catch((error:Error) => {
        showErrorNotification(error.message)
    })
  };

  useEffect(() => {
    if(announcement != null){
        setTitle(announcement.title)
        setDescription(announcement.description)
    }
  }, [announcement])

  const handleImageUploadChange = (event: Event) => {
    const image = event.target.files[0];
    setImage({
        src: image,
        type: 'uploaded'
    });
  };


  return (
    <>
        <StaffNavbar />
        <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      <Typography variant="h5"gutterBottom>
        Update Announcement
      </Typography>
      <form onSubmit={handleSubmit}>
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
                    src={image.type == 'initial' ? image.src : URL.createObjectURL(image.src)}
                  />
                </ImageListItem>)
                : <p>No Uploaded Image</p>
            }
          </Container>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          size='small'
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: '12px' }}
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          size='small'
          sx={{ marginBottom: '12px' }}
        />
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
          Update Announcement
        </Button>
      </form>
    </Container>
    </>
  );
};

export default UpdateAnnouncement;
