import React, { useEffect, useState } from 'react';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Paper, TablePagination, Avatar } from '@mui/material';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Announcement from '../interfaces/Announcement';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import StaffNavbar from '../components/StaffNavbar';
import { deleteAnnouncement, getAllAnnouncements, setCurrentAnnouncement } from '../redux/features/AnnouncementReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';

const StaffAnnouncements = () => {
  const announcements: Announcement[] = useAppSelector(state => state.announcement_provider.announcements);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllAnnouncements())
  }, [dispatch])

  const handleDelete = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedAnnouncement(null);
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteDialog();
    dispatch(deleteAnnouncement(selectedAnnouncement._id))
    .then(unwrapResult)
    .then(() => {
        showSuccessNotification("Announcement deleted successfully")
    }).catch((error:Error) => {
        showErrorNotification(error.message)
    })
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    function handleUpdateButtonClick(announcement: Announcement) {
        dispatch(setCurrentAnnouncement(announcement))
        navigate(`/staffs/${id}/announcements/${announcement._id}/update`)
    }

  return (
    <>
      <StaffNavbar />
      <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <Typography variant="h5">
          Administrative Employee Announcements
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/staffs/${id}/announcements/create`}
            size='small'
          >
            Add Announcement
          </Button>
        </div>
        <TableContainer component={Paper} elevation={3}>
          <Table size='small'>
            <TableHead>
              <TableRow selected>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announcements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((announcement, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                  <Avatar src={announcement.image} sx={{ width: 40, height: 40 }} />
                  </TableCell>
                  <TableCell align="center">{announcement.title}</TableCell>
                  <TableCell align="center">{announcement.description}</TableCell>
                  <TableCell align="center">{announcement.created_at}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" size='small' onClick={() => handleUpdateButtonClick(announcement)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" size='small' onClick={() => handleDelete(announcement)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={announcements.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Announcement</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this announcement?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default StaffAnnouncements;
