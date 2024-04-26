import { useState, useEffect } from 'react';
import { Box, Button, Container, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, IconButton, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { deleteStudyTable, getAllStudyTables, setCurrentStudyTable } from '../redux/features/StudyTableReducer';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import StudyTable from '../interfaces/StudyTable';
import StaffNavbar from '../components/StaffNavbar';

const StudyTables = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Confirmation dialog state
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [tableToDelete, setTableToDelete] = useState<StudyTable | null>(null);

  // Fetch all study tables on component mount
  useEffect(() => {
    dispatch(getAllStudyTables());
  }, [dispatch]);

  // Get study tables from redux store
  const { tables, loading, error } = useAppSelector(state => state.study_table_provider);

  // Function to handle opening the delete confirmation dialog
  const handleOpenDeleteConfirmation = (table: StudyTable) => {
    setTableToDelete(table);
    setDeleteConfirmationOpen(true);
  };

  // Function to handle closing the delete confirmation dialog
  const handleCloseDeleteConfirmation = () => {
    setTableToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  // Function to handle confirming and deleting a study table
  const handleConfirmDelete = () => {
    if (tableToDelete) {
      dispatch(deleteStudyTable(tableToDelete._id));
      handleCloseDeleteConfirmation();
    }
  };

  // Function to handle editing a study table
  const handleEditTable = (table: StudyTable) => {
    dispatch(setCurrentStudyTable(table));
    navigate(`/staffs/${id}/tables/${table._id}/update`);
  };

  // Function to handle viewing the PDF file of a study table
  const handleViewPdf = (table: StudyTable) => {
    dispatch(setCurrentStudyTable(table));
    navigate(`/staffs/${id}/tables/${table._id}/view`);
  };

  // Group tables by year
  const groupedTables = tables.reduce((acc, table) => {
    const year = table.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(table);
    return acc;
  }, {});

  return (
    <>
      <StaffNavbar />
      <Container>
        <div style={{ 
            marginBottom: '20px', 
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center' 
        }}>
          <Typography variant="h6">
            Study Tables
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/staffs/${id}/tables/create`)}
            size='small'
            >
                Add New Table
            </Button>
        </div>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography>Error: {error}</Typography>}
        {Object.entries(groupedTables).map(([year, tables]) => (
          <Box key={year} sx={{ marginTop: 4 }} padding={2} component={Paper} elevation={3}>
            <Typography variant="h5" gutterBottom>
              Year {year}
            </Typography>
            <List sx={{ width: '100%' }}>
              {(tables as StudyTable[]).map((table: StudyTable) => (
                <Box key={table._id}>
                  <ListItem disablePadding>
                    <ListItemText
                      primary={`Semester: ${table.semester}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" color="primary" onClick={() => handleViewPdf(table)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton edge="end" color="primary" onClick={() => handleEditTable(table)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" color="error" onClick={() => handleOpenDeleteConfirmation(table)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Box>
        ))}
        {/* Delete confirmation dialog */}
        <Dialog
          open={deleteConfirmationOpen}
          onClose={handleCloseDeleteConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this study table?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteConfirmation} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default StudyTables;
