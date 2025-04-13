import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

import LoginForm from './LoginForm';
import SearchReviews from './SearchReviews';
import SubmitReview from './SubmitReview';
import MyReviews from './MyReviews';


function App() {

  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');

  
  return (
    <Router>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🏡 Review My Home
        </Typography>

        {username && (
          <Typography
            sx={{
              color: 'white',
              fontWeight: 500,
              fontSize: '1rem',
              marginRight: '1rem',
            }}
          >
            Welcome, {username}
          </Typography>
        )}

        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/submit">Submit Review</Button>
        <Button color="inherit" component={Link} to="/my-reviews">My Reviews</Button>
        {username ? (
          <Button color="inherit" onClick={() => {
            setUsername('');
            localStorage.removeItem('username');
            window.location.href = '/login';
          }}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        )}
      </Toolbar>

      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>

          <Route path="/" element={<SearchReviews />} />

          <Route
            path="/submit"
            element={
              username ? (
                <SubmitReview username={username} />
              ) : (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  Please log in to submit a review.
                </Typography>
              )
            }
          />


          <Route path="/my-reviews" element={<MyReviews username={username} />} />

          <Route
            path="/login"
            element={
              <LoginForm
                setUsername={setUsername}
                onLogin={() => window.location.href = '/'} // redirect to home
              />
            }
          />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
