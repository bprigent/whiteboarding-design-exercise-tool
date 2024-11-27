import React from 'react';
import { Button } from '@mui/material';

const PrimaryButton = ({ children, onClick, ...props }) => (
  <Button
    onClick={onClick}
    variant="contained"
    sx={{
      width:'100%',
      backgroundColor: '#007bff',
      fontSize:'18px',
      color: '#fff',
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: '16px',
      padding: '24px 24px',
      '&:hover': {
        backgroundColor: '#116FE9',
      },
    }}
    {...props}
  >
    {children}
  </Button>
);

export default PrimaryButton;
