import React from 'react';
import { CircularProgress, Box, Typography, Paper } from '@mui/material';


const LoadingScreen = ({ heading, tips }) => {
  
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4, // Space between elements
        padding: 2,
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

      {/* Tips Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tips.map((tip, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: 1.5,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
            }}
          >
            {tip.icon}
            <Typography variant="body2">{tip.text}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default LoadingScreen;
