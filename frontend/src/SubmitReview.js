import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Alert
} from '@mui/material';

const SubmitReview = ({ username }) => {
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);


  const handleSubmit = async (e) => {
    if (!address.trim() || !comment.trim() || rating === 0) {
        setMessage("Please fill out all fields and select a rating.");
        return;
      }
      
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('address', address);
    formData.append('rating', rating);
    formData.append('comment', comment);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/review`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || data.error || '');
      if (res.ok) {
        setAddress('');
        setRating(3);
        setComment('');
        setImage(null);
        setPreviewUrl(null); 
      }
    } catch (err) {
      setMessage('Error submitting review');
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
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/backgrounds/submit_reviews_bg.jpg)',
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
        Submit a Review
      </Typography>

      {message && (
        <Alert severity={message.includes('Error') ? 'error' : 'success'} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Home address"
          fullWidth
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Typography gutterBottom>Rating</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Comment"
          fullWidth
          multiline
          rows={3}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                if (file) {
                setPreviewUrl(URL.createObjectURL(file));
                } else {
                setPreviewUrl(null);
                }
            }}
            />

        </Button>
        {previewUrl && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
            Image Preview:
            </Typography>
            <Box
            component="img"
            src={previewUrl}
            alt="Preview"
            sx={{
                maxWidth: '100%',
                maxHeight: 200,
                mt: 1,
                borderRadius: 2,
                boxShadow: 2,
            }}
            />
        </Box>
        )}

        <Button type="submit" variant="contained" fullWidth>
          Submit Review
        </Button>
      </form>
    </Box>
    </Box>
  );
};

export default SubmitReview;
