import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ImageListItem, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import StaffNavbar from "../components/StaffNavbar"
import { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { createAnnouncement } from "../redux/features/AnnouncementReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { showErrorNotification, showSuccessNotification } from "../utils/notifications";
import { useNavigate } from "react-router-dom";

const CreateAnnouncement = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("normal");
    const [is_pinned, set_is_pinned] = useState('no');
    const [image, setImage] = useState(null);
    const navigate = useNavigate()
    
    const dispatch = useAppDispatch()
    
    const handleSubmit = async () => {
      handleClose()

        if(image == null){
          showErrorNotification("Upload image first")
          return
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('importance', importance)
        formData.append('is_pinned', is_pinned)
        formData.append('image', image)

        await dispatch(
            createAnnouncement(formData)
        ).then(unwrapResult)
        .then(() => {
          showSuccessNotification('Announcement created successfully')
          navigate(-1)
        }).catch((error: Error) => {
          showErrorNotification(error.message)
        })
    }

    const handleImportanceChange = (event: SelectChangeEvent) => {
        setImportance(event.target.value)
    }

    const handlePinChange = (event: SelectChangeEvent) => {
        set_is_pinned(event.target.value)
    }

    const handleImageUploadChange = (event: Event) => {
        const image = event.target.files[0]
        setImage(image)
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleBeforeSubmit = (e: Event) => {
      e.preventDefault()
      handleClickOpen()
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <>
        <StaffNavbar />
        <Container sx={{ marginTop: '50px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <Typography component={'h5'} variant="body1">
            Add Announcement
          </Typography>
          </div>
        <form onSubmit={handleBeforeSubmit}>
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
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: '12px' }}
            size='small'
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: '12px' }}
            size='small'
            multiline
            required
          />
          <Select
            fullWidth
            onChange={handleImportanceChange}
            size="small"
            sx={{ marginBottom: '12px' }}
            defaultValue={importance}
          >
            <MenuItem value={'normal'}>Normal</MenuItem>
            <MenuItem value={'warning'}>Warning</MenuItem>
            <MenuItem value={'high'}>High</MenuItem>
          </Select>
          
          <Select
            fullWidth
            onChange={handlePinChange}
            size="small"
            sx={{ marginBottom: '12px' }}
            defaultValue={is_pinned}
          >
            <MenuItem value={'no'}>Not Pinned</MenuItem>
            <MenuItem value={'yes'}>Pinned</MenuItem>
          </Select>

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

          <Button type="submit" variant="contained" color="primary" fullWidth size='small'>Create</Button>
        </form>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm Creating Announcement
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}


export default CreateAnnouncement