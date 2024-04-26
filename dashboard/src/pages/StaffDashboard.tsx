import React, { useEffect } from 'react';
import StaffNavbar from '../components/StaffNavbar';
import { Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { Group, School, Description, Announcement, People, TableChart } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getStaffDashboardStatistics } from '../redux/features/StatisticsReducer';

const StaffDashboard = () => {
  const dispatch = useAppDispatch()
  const statistics = useAppSelector(state => state.statistics_provider.statistics)

  useEffect(() => {
    dispatch(getStaffDashboardStatistics())
  }, [dispatch])
  return (
    <>
      <StaffNavbar />
      <Container sx={{ marginTop: '50px' }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Total Teachers Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#F3E5F5' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: '#9C27B0', width: 56, height: 56, marginBottom: 2 }}>
                  <Group fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="div" gutterBottom align="center">
                  Total Faculty Members
                </Typography>
                <Typography variant="h4" component="div" align="center">
                  {statistics.teachers_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Total Students Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#FFEB3B' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: '#FFC107', width: 56, height: 56, marginBottom: 2 }}>
                  <School fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="div" gutterBottom align="center">
                  Total Students
                </Typography>
                <Typography variant="h4" component="div" align="center">
                {statistics.students_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Total Courses Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#81C784' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: '#4CAF50', width: 56, height: 56, marginBottom: 2 }}>
                  <Description fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="div" gutterBottom align="center">
                  Total Courses
                </Typography>
                <Typography variant="h4" component="div" align="center">
                  {statistics.courses_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Announcements Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#64B5F6' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: '#2196F3', width: 56, height: 56, marginBottom: 2 }}>
                  <Announcement fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="div" gutterBottom align="center">
                  Announcements
                </Typography>
                <Typography variant="h4" component="div" align="center">
                {statistics.announcements_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Staff Members Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#FFAB91' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: '#FF5722', width: 56, height: 56, marginBottom: 2 }}>
                  <People fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="div" gutterBottom align="center">
                  Administrative Employees
                </Typography>
                <Typography variant="h4" component="div" align="center">
                {statistics.staffs_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Tables Box */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#C5E1A5' }}>
              <CardContent>
                <Avatar sx={{ backgroundColor: '#8BC34A', width: 56, height: 56, marginBottom: 2 }}>
                  <TableChart fontSize="large" />
                </Avatar>
                <Typography variant="h6" component="div" gutterBottom align="center">
                  Tables
                </Typography>
                <Typography variant="h4" component="div" align="center">
                {statistics.tables_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default StaffDashboard;
