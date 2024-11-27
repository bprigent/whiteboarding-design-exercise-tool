import React from 'react';
import { Button } from '@mui/material';

export const PrimaryButtonLarge = ({ children, onClick, ...props }) => (
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

export const OrangeButton = ({ children, onClick, ...props }) => (
  <Button
    onClick={onClick}
    variant="contained"
    sx={{
      width:'100%',
      backgroundColor: '#F28118',
      fontSize:'15px',
      color: '#fff',
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: '12px',
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: '#F28118',
      },
    }}
    {...props}
  >
    {children}
  </Button>
);
