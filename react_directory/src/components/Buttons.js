import React from 'react';
import { Button, Icon } from '@mui/material';
import * as Icons from '@mui/icons-material'; // Import all icons for dynamic rendering
import PropTypes from 'prop-types';


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


export const WhiteButton = ({ children, icon, onClick, ...props }) => {
  
  const IconComponent = Icons[icon] || null; // Get the icon dynamically or default to null

  return (
    <Button
      onClick={onClick}
      startIcon={
        IconComponent && (
            <IconComponent sx={{ fontSize: '12px', color: 'lightgrey' }} />
        )
      }
      variant="contained"
      sx={{
        width:'100%',
        backgroundColor: '#fff',
        fontSize:'15px',
        color: '#000',
        textTransform: 'none',
        fontWeight: 'bold',
        borderRadius: '12px',
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: '#fdfdfd',
        },
      }}
      {...props}
    >
      {children}
    </Button>
)};

// Prop Types for the WhiteButton
WhiteButton.propTypes = {
  children: PropTypes.node.isRequired, // Content inside the button
  icon: PropTypes.string, // Name of the icon as a string (e.g., "Trash")
  onClick: PropTypes.func, // Function to handle the onClick event
};

// Default Props
WhiteButton.defaultProps = {
  icon: null,
  onClick: undefined,
};



export const IconButton = ({onClick, disabled, icon} ) => {

  const IconComponent = Icons[icon] || null;

  if (!IconComponent) {
    console.error(`Icon "${icon}" not found in Material UI icons.`);
    return null; // Don't render the button if the icon is invalid
  }

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      sx={{
        minWidth: '56px', // Ensures the button is circular
        minHeight: '56px', // Same height and width for a perfect circle
        width: '56px',
        height: '56px',
        borderRadius: '40px',
        border: '1px solid #e5e5e5', // Grey border
        color: '#000000', // Grey icon color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
          borderColor: '#1976d2', 
          color: '#ffffff', 
          backgroundColor: '#1976d2', 
        },
      }}
    >
      <IconComponent/>
    </Button>
  );
};