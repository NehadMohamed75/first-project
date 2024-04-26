import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    const {role,currentUserData} = useAppSelector(state => state.auth_provider)

    const handleSignIn = () => {
        if(role == 'student'){
            navigate(`/students/${currentUserData._id}/dashboard`, {
                replace: true
            })
        }else if(role == 'teacher'){
            navigate(`/teachers/${currentUserData._id}/dashboard`, {
                replace: true
            })
        }else if(role == 'staff'){
            navigate(`/staffs/${currentUserData._id}/dashboard`, {
                replace: true
            })
        }else{
            navigate(`/start`, {
                replace: true
            })
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                401 Unauthorized
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                You are not authorized to view this page.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleSignIn}
                style={{ marginTop: '20px' }}
            >
                Go Home
            </Button>
        </Container>
    );
};

export default UnauthorizedPage;
