import { Button, Container, Typography } from "@mui/material";
import './Welcome.css'
import { useNavigate } from "react-router-dom";


const StartPage = () => {
  const navigate = useNavigate()

  const handleTeacherLogin = () => {
    navigate('/teacher/login')
  };

  const handleStudentLogin = () => {
    navigate('/student/login')
  };

  const handleStaffLogin = () => {
    navigate('/staff/login')
  };

  return (
    <Container className='root'>
      {/* <SchoolIcon className={classes.logo} color="primary" /> */}
      <Typography variant="h4" gutterBottom>Learning Management System</Typography>
      <Button
        variant="contained"
        color="primary"
        className={'button'}
        onClick={handleTeacherLogin}
      >
        Login as Faculty Member
      </Button>
      <Button
        variant="contained"
        color="success"
        className={'button'}
        onClick={handleStudentLogin}
      >
        Login as Student
      </Button>
      <Button
        variant="contained"
        color="warning"
        className={'button'}
        onClick={handleStaffLogin}
      >
        Login as Admin
      </Button>
    </Container>
  );
};

export default StartPage;
