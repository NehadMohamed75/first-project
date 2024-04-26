import { useState } from 'react';
import { Box, Button, Container, Typography, IconButton, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import StudyTable from '../interfaces/StudyTable';
import { useAppSelector } from '../hooks/hooks';
import { ArrowBack, ChevronLeft, ChevronRight } from '@mui/icons-material';
import StaffNavbar from '../components/StaffNavbar';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const table: StudyTable = useAppSelector(state => state.study_table_provider.currentTable);

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
      <StaffNavbar />
      <Container>
        <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" onClick={() => navigate(`/staffs/${id}/tables`)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1">
            View Table
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', marginBottom: 2, maxHeight: '70vh', overflowY: 'auto' }}>
          <Document
            file={table.pdf_file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={1} />
          </Document>
        </Box>
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
      </Container>
    </>
  );
};

export default ViewTable;
