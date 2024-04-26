import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Announcement, Logout, School, SchoolOutlined, TableChart } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../redux/features/AuthReducer";

const StudentNavbar = () => {
  const dispatch = useAppDispatch()
  

  const handleLogout = () => {
    dispatch(logout())
    location.reload()
  }

  const navigate = useNavigate()
  const {id} = useParams()
  const navigateToHomeDashboard = () => {
    navigate(`/students/${id}/dashboard`)
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
            to={`/students/${id}/announcements`}
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
            aria-label="degrees"
            component={Link}
            to={`/students/${id}/degrees`}
          >
            <School />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: '0.875rem' }}> {/* Adjusted font size */}
              Degrees
            </Typography>
          </IconButton>
          
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="table"
            component={Link}
            to={`/students/${id}/table`}
          >
            <TableChart />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontSize: '0.875rem' }}> {/* Adjusted font size */}
              Table
            </Typography>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="error"
            style={{
                color: 'red'
            }}
            aria-label="announcements"
            onClick={handleLogout}
          >
            <Logout fontSize={'large'}/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;
