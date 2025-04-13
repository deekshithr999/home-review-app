import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Rating
} from '@mui/material';

const SearchReviews = () => {
  const [address, setAddress] = useState('');
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/reviews?address=${encodeURIComponent(address)}`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews || []);
        setMessage('');
      } else {
        setReviews([]);
        setMessage(data.error || 'Something went wrong');
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
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/backgrounds/home_img_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1
      }}
    />

    {/* Content container */}
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        p: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        minHeight: '100vh'
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Search Reviews by Address
      </Typography>

      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <TextField
          label="Enter address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Search
        </Button>
      </form>

      {message && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}

      {reviews.length > 0 && (
        <>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" gutterBottom>
            {reviews.length} Review{reviews.length > 1 ? 's' : ''} Found:
          </Typography>

          <Typography variant="body2" gutterBottom>
            Average Rating: ⭐{" "}
            {(
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
             ).toFixed(1)} from {reviews.length} review{reviews.length > 1 ? 's' : ''}
          </Typography>


          {reviews.map((r, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
                <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    boxShadow: 3,
                    p: 2,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                    transform: 'scale(1.02)',
                    },
                }}
                >
                {r.image && (
                    <CardMedia
                    component="img"
                    image={`${process.env.REACT_APP_API_BASE_URL}/api/uploads/${r.image}`}
                    alt="Review"
                    sx={{
                        width: 140,
                        height: 140,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mr: 2,
                    }}
                    onError={(e) => (e.target.style.display = 'none')}
                    />
                )}

                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                    User: {r.username}
                    </Typography>

                    {/* Timestamp */}
                    {r.timestamp && (
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Posted on {new Date(r.timestamp).toLocaleString()}
                    </Typography>
                    )}

                    <Rating name="read-only" value={r.rating} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {r.comment}
                    </Typography>
                </CardContent>
                </Card>
                
            </Box>
            ))}

        </>
      )}
      </Box>
    </Box>
  );
};

export default SearchReviews;
