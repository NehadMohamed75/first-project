import { Grid, Paper, Typography, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";
import { ArrowBack } from "@mui/icons-material";
import { useEffect } from "react";
import { getAllAnnouncements } from "../redux/features/AnnouncementReducer";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {announcements,loading,error} = useAppSelector(state => state.announcement_provider)

  useEffect(() => {
    dispatch(getAllAnnouncements())
  }, [dispatch])

  return (
    <>
      <StudentNavbar />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
                 display: 'flex',
                 alignItems: 'center'
            }}>
                <IconButton onClick={() => navigate(-1)} aria-label="back">
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" component="h2">Announcements</Typography>
            </div>

        <Grid container spacing={2} style={{ flex: 1 }}>
          {announcements.map((announcement) => (
            <Grid item xs={12} sm={6} md={4} key={announcement._id} style={{ marginBottom: '20px' }}>
              <Paper elevation={3} style={{ padding: '10px', height: '100%' }}>
                <img src={announcement.image} alt={announcement.title} style={{ width: '100%', height: '240px', objectFit: 'contain', marginBottom: '10px' }} />
                <Typography variant="subtitle1" component="h3" gutterBottom>{announcement.title}</Typography>
                <Typography variant="body2" gutterBottom>{announcement.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default AnnouncementsPage;
