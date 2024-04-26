import { Container, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { loginStaff } from "../redux/features/AuthReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { showErrorNotification, showSuccessNotification } from "../utils/notifications";

const StaffLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleLogin = async (e:Event) => {
    e.preventDefault()

    if (!username || !password) {
      setUsernameError(!username); // Show error if username is empty
      setPasswordError(!password); // Show error if password is empty
      return;
    }

    // Clear error states if fields are not empty
    setUsernameError(false);
    setPasswordError(false);

    await dispatch(loginStaff({
      username: username,
      password: password
    }))
    .then(unwrapResult)
    .then((response) => {
        
        showSuccessNotification('Login successful')
        navigate(`/staffs/${response.id}/dashboard`, {
            replace: true
        })
    }).catch((error: Error) => {
        showErrorNotification(error.message)
  })
  };

  return (
    <>
      <Container className="root">
        <Typography variant="h4" gutterBottom>Administrative Employee Login</Typography>
        <form onSubmit={handleLogin}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          fullWidth
          variant="outlined"
          size="small"
          error={usernameError} // Show error state if username is empty
          helperText={usernameError ? "Username is required" : ""}
          style={{ marginBottom: '12px' }}
          required
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          error={passwordError} // Show error state if username is empty
          helperText={passwordError ? "Password is required" : ""}
          fullWidth
          variant="outlined"
          size="small"
          style={{ marginBottom: '12px' }}
          required
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth size="small">Login</Button>
        </form>
      </Container>
    </>
  );
};

export default StaffLogin;
