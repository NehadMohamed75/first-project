import { AppBar, Toolbar, IconButton } from "@mui/material";
import { Logout, SchoolOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../redux/features/AuthReducer";

const TeacherNavbar = () => {
    const dispatch = useAppDispatch()
    

    const handleLogout = () => {
        dispatch(logout())
        location.reload()
    }

  const navigate = useNavigate()
  const {id} = useParams()
  const navigateToHomeDashboard = () => {
    navigate(`/teachers/${id}/dashboard`)
  }

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={navigateToHomeDashboard}
          aria-label="logo"
        >
          <SchoolOutlined fontSize="large" /> 
        </IconButton>
        <div>
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

export default TeacherNavbar;
