import { useState } from 'react';
import { Container, TextField, Button, MenuItem, ImageListItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import StaffNavbar from '../components/StaffNavbar';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import { useAppDispatch } from '../hooks/hooks';
import { createStudent } from '../redux/features/StudentReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showInfoNotification, showSuccessNotification } from '../utils/notifications';


const CreateStudent = () => {
  const [fullName, setFullName] = useState("");
  const [academicNumber, setAcademicNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const {id} = useParams()

  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch()

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


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOpen(false)

    if(image == null){
      showInfoNotification("Please Upload Image First")

      return;
    }

    const date = moment(birthDate._d).format("DD/MM/YYYY")
    

    const formData = new FormData()
    formData.append('national_id', nationalId)
    formData.append('academic_number',academicNumber)
    formData.append('full_name',fullName)
    formData.append('birth_date',date)
    formData.append('email',email)
    formData.append('program',program)
    formData.append('address',address)
    formData.append('phone_number',phone)
    formData.append('image',image)
    formData.append('created_by',id)

    await dispatch(createStudent(formData))
    .then(unwrapResult)
    .then(() => {
      showSuccessNotification('Student created successfully')
      navigate(-1)
    })
    .catch((error: Error) => {
      showErrorNotification(error.message)
    })
  };
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

  const handleProgramChange = (event) => {
    setProgram(event.target.value);
  };

  const handleImageUploadChange = (event: Event) => {
    const image = event.target.files[0]
    setImage(image)
  }
  return (
    <>
      <StaffNavbar />
      <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
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
            label="Name"
            variant="outlined"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ marginBottom: '12px' }}
            size='small'
            required
          />
          <TextField
            label="Academic Number"
            variant="outlined"
            fullWidth
            value={academicNumber}
            onChange={handleAcademicNumberChange}
            sx={{ marginBottom: '12px' }}
            size='small'
            error={Boolean(academicNumberError)}
            helperText={academicNumberError}
            inputProps={{
              maxLength: 7,
            }}
            required
          />
          <TextField
            label="National ID"
            variant="outlined"
            fullWidth
            value={nationalId}
            onChange={handleNationalIdChange}
            sx={{ marginBottom: '12px' }}
            size='small'
            error={Boolean(nationalIdError)}
            helperText={nationalIdError}
            inputProps={{
              maxLength: 14,
            }}
            required
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Birth Date"
              format="DD/MM/YYYY"
              value={birthDate}
              onChange={(newValue) => setBirthDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
              sx={{ marginBottom: '12px', width: '100%' }}
              size='small'
              required
            />
          </LocalizationProvider>
          <TextField
            label="Email"
            variant="outlined"
            type='email'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '12px' }}
            size='small'
            required
          />
          <TextField
            select
            label="Program"
            variant="outlined"
            fullWidth
            value={program}
            onChange={handleProgramChange}
            sx={{ marginBottom: '12px' }}
            size='small'
            required
          >
            <MenuItem value="cs">Computer Science</MenuItem>
            <MenuItem value="is">Information Systems</MenuItem>
            <MenuItem value="ai">Artificial Intelligence</MenuItem>
            <MenuItem value="bi">BioInformatics</MenuItem>
          </TextField>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ marginBottom: '12px' }}
            size='small'
            required
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ marginBottom: '12px' }}
            size='small'
            required
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
          <Button type="submit" variant="contained" color="primary" fullWidth size='small'>Create</Button>
        </form>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm Creating Student
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
  );
};

export default CreateStudent;
