import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Button
} from '@mui/material';


  

const MyReviews = ({ username }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/my-reviews?username=${username}`);
        const data = await res.json();
        if (res.ok) {
          setReviews(data.reviews || []);
        }
      } catch (err) {
        console.error('Failed to fetch my reviews', err);
      }
    };

    if (username) {
      fetchMyReviews();
    }
  }, [username]);

  const handleDelete = async (review) => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;
  
    try {
      const res = await fetch(`/${process.env.REACT_APP_API_BASE_URL}api/delete-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          address: review.address,
          comment: review.comment
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews(reviews.filter((r) => r.comment !== review.comment));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      alert("Error deleting review");
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
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/backgrounds/myreviews_bg.jpg)',
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        minHeight: '100vh'
      }}
    >
      <Typography variant="h5" gutterBottom>
        My Reviews
      </Typography>

      {reviews.length === 0 ? (
        <Typography variant="body1">You haven't posted any reviews yet.</Typography>
      ) : (
        reviews.map((r, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            <Card sx={{ display: 'flex', p: 2, boxShadow: 3 }}>
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
                    mr: 2
                  }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {r.address}
                </Typography>

                {/* Timestamp */}
                {r.timestamp && (
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Posted on {new Date(r.timestamp).toLocaleString()}
                </Typography>
                )}
                
                <Rating name="read-only" value={r.rating} readOnly />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {r.comment}
                </Typography>
                <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(r)}
                >
                    Delete
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))
      )}
    </Box>
    </Box>
  );
};

export default MyReviews;
