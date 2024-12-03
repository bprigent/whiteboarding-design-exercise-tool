import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';


const LoadingScreen = ({ heading, sub }) => {
  
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4, // Space between elements
        padding: 1,
      }}
    >
    {/* Loading Animation */}
    <CircularProgress 
        size={40}
        thickness={2}
        sx={{
            color: '#000000'
        }}
    />

      {/* Heading */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {heading}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body2">{sub}</Typography>  
      </Box>
    </Box>
  );
};

export default LoadingScreen;
