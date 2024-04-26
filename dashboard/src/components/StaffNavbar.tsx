import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { SchoolOutlined, Group, Person, People, Announcement, Subject, Logout, EventAvailable } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../redux/features/AuthReducer";

const StaffNavbar = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    location.reload()
  }

  const navigate = useNavigate()
  const {id} = useParams()
  const navigateToHomeDashboard = () => {
    navigate(`/staffs/${id}/dashboard`)
  }

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={navigateToHomeDashboard}
        >
          <SchoolOutlined fontSize="large" /> 
        </IconButton>
        <div>
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="announcements"
            component={Link}
            to={`/staffs/${id}/announcements`}
          >
            <Announcement />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: '0.875rem' }}> {/* Adjusted font size */}
              Announcements
            </Typography>
          </IconButton>
          
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="students"
            component={Link}
            to={`/staffs/${id}/students`}
          >
            <People />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: '0.875rem' }}>
              Students
            </Typography>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="teachers"
            component={Link}
            to={`/staffs/${id}/teachers`}
          >
            <Person />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: '0.875rem' }}>
            Faculty Members
            </Typography>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="staffs"
            component={Link}
            to={`/staffs/${id}/staffs`}
          >
            <Group />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: '0.875rem' }}>
            Administrative Employees
            </Typography>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="staffs"
            component={Link}
            to={`/staffs/${id}/courses`}
          >
            <Subject />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: '0.875rem' }}>
              Courses
            </Typography>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="staffs"
            component={Link}
            to={`/staffs/${id}/tables`}
          >
            <EventAvailable />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: '0.875rem' }}>
              Tables
            </Typography>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="error"
            style={{
                color: 'red'
            }}
            aria-label="logout"
            onClick={handleLogout}
          >
            <Logout fontSize={'large'}/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default StaffNavbar;
