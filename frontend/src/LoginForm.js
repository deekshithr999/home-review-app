import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Paper
} from '@mui/material';



const LoginForm = ({ setUsername, onLogin }) => {
  const [mode, setMode] = useState('login'); // login or register
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usernameInput.trim() || !password.trim()) {
      setMessage('Username and password cannot be empty.');
      return;
    }

    const endpoint = `/api/${mode === 'login' ? 'login' : 'register'}`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Something went wrong');
      } else {
        setMessage('');
        setUsername(usernameInput);
        localStorage.setItem('username', usernameInput);
        onLogin();
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (

    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
    {/* Full-screen background */}
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/backgrounds/login_img_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1
      }}
    />

    {/* Form container */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        position: 'relative',
        zIndex: 1
      }}
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          {mode === 'login' ? 'Login to Your Account' : 'Create a New Account'}
        </Typography>

        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(e, newMode) => newMode && setMode(newMode)}
          fullWidth
          sx={{ mb: 3 }}
        >
          <ToggleButton value="login" fullWidth>
            Login
          </ToggleButton>
          <ToggleButton value="register" fullWidth>
            Register
          </ToggleButton>
        </ToggleButtonGroup>

        {message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
          />
          <Button type="submit" variant="contained" fullWidth size="large">
            {mode === 'login' ? 'Login' : 'Register'}
          </Button>
        </form>
      </Paper>
    </Box>
    </Box>
  );
};

export default LoginForm;
