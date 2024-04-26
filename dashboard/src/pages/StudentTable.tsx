import { Button, Container, IconButton, Stack, Typography } from '@mui/material';
import StudentNavbar from '../components/StudentNavbar';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Student from '../interfaces/Student';
import { useEffect, useState } from 'react';
import { getAllStudyTables } from '../redux/features/StudyTableReducer';

import {Document, Page} from 'react-pdf'
import { ChevronLeft, ChevronRight, Download } from '@mui/icons-material';

const StudentTable = () => {
  const dispatch = useAppDispatch()
  const student = useAppSelector(state => state.auth_provider.currentUserData) as Student

  useEffect(() => {
    dispatch(getAllStudyTables())
  }, [dispatch])
  
  const tables = useAppSelector(state => state.study_table_provider.tables).filter(table => {
    return table.semester == student.semester 
    && table.year == student.year
  })
  

  const currentTable = tables.length > 0 ? tables[0] : null

  

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  };

  const handlePrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  return (
    <>
      <StudentNavbar />
      {
        currentTable != null ? 
        (
          <Container sx={{ marginTop: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={pageNumber <= 1}
            onClick={handlePrevPage}
            startIcon={<ChevronLeft />}
            size='small'
          >
            Previous
          </Button>
          <Typography variant="body1">
            Page {pageNumber} of {numPages}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={pageNumber >= numPages}
            onClick={handleNextPage}
            endIcon={<ChevronRight />}
            size='small'
          >
            Next
          </Button>
        </Stack>

        <a href={currentTable.pdf_file} download style={{
              textDecoration: 'none',
              color: 'black',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Download color='primary'/>
              Download
            </a>
        </div>
        <Document
          file={currentTable.pdf_file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page 
            pageNumber={pageNumber}
            renderTextLayer={false} renderAnnotationLayer={false} scale={1} 
          />
        </Document>
      </Container>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'black'
          }}>
            <Typography variant='h6'>
              No Study Table Yet
            </Typography>
          </div>
        )
      }
    </>
  );
};

export default StudentTable;
