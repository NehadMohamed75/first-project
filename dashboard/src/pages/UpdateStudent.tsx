import { useState } from 'react';
import { Container, TextField, Button, MenuItem, ImageListItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import StaffNavbar from '../components/StaffNavbar';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';
import { updateStudent } from '../redux/features/StudentReducer';


const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const student = useAppSelector((state) => state.student_provider.currentStudent);

  const [fullName, setFullName] = useState(student ? student.full_name : "");
  const [academicNumber, setAcademicNumber] = useState(student ? student.academic_number : "");
  const [nationalId, setNationalId] = useState(student ? student.national_id : "");
  const [birthDate, setBirthDate] = useState(student ? moment(student.birth_date, "DD/MM/YYYY") : null);
  const [email, setEmail] = useState(student ? student.email : "");
  const [program, setProgram] = useState(student ? student.program : "");
  const [address, setAddress] = useState(student ? student.address : "");
  const [phone, setPhone] = useState(student ? student.phone_number : "");
  const [image, setImage] = useState(student ? {
    src: student.image,
    type: 'initial'
  } : null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOpen(false);

    const date = moment(birthDate).format("DD/MM/YYYY");

    const formData = new FormData();
    formData.append('national_id', nationalId);
    formData.append('academic_number', academicNumber);
    formData.append('full_name', fullName);
    formData.append('birth_date', date);
    formData.append('email', email);
    formData.append('program', program);
    formData.append('address', address);
    formData.append('phone_number', phone);
    if(image.type == 'uploaded'){
        formData.append('image', image.src);
    }

    await dispatch(updateStudent({ id: student._id, data: formData }))
      .then(unwrapResult)
      .then(() => {
        showSuccessNotification('Student updated successfully');
        navigate(-1)
      })
      .catch((error: Error) => {
        showErrorNotification(error.message);
      });
  };

  const handleImageUploadChange = (event: Event) => {
    const image = event.target.files[0];
    setImage({
        src: image,
        type: 'uploaded'
    });
  };

  
  const handleBeforeSubmit = (e: Event) => {
    e.preventDefault()
    handleClickOpen()
  };

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
                    src={image.type == 'initial' ? image.src : URL.createObjectURL(image.src)}
                  />
                </ImageListItem>)
                : <p>No Uploaded Image</p>
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
            onChange={(e) => setAcademicNumber(e.target.value)}
            sx={{ marginBottom: '12px' }}
            size='small'
            required
          />
          <TextField
            label="National ID"
            variant="outlined"
            fullWidth
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            sx={{ marginBottom: '12px' }}
            size='small'
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
            onChange={(e) => setProgram(e.target.value)}
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
          <Button type="submit" variant="contained" color="primary" fullWidth size='small'>Update</Button>
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
            Confirm Updating Student
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

export default UpdateStudent;
