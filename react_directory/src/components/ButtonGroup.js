import React, { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';


const ButtonGroup = ({ label, options, value, onChange }) => {

    const [selectedValue, setSelectedValue] = useState(value || ''); // Start with provided value or empty

    useEffect(() => {
        // Automatically set default option if no value is provided
        if (!value) {
          const defaultOption = options.find((option) => option.defaultValue);
          if (defaultOption) {
            setSelectedValue(defaultOption.value);
            onChange(defaultOption.value); // Notify parent about the default selection
          }
        }
      }, [value, options, onChange]);

    const handleChange = (_, newValue) => {
        // Prevent deselecting (newValue is null when clicking the selected button)
        if (newValue !== null) {
            setSelectedValue(newValue);
            onChange(newValue); // Pass the new value to the parent
        }
    };

    return (
        <Box mb={3}>
            <Typography 
                variant="subtitle2"
                gutterBottom
                sx={{
                color: '#787878', 
                fontWeight: 'regular', 
                }}
            >
            {label}
            </Typography>
            <ToggleButtonGroup
                value={selectedValue}
                exclusive
                onChange={handleChange}
                sx={{ display: 'flex', gap: 0 }}
            >
            {options.map((option) => (
                <ToggleButton
                key={option.value}
                value={option.value}
                sx={{
                    borderRadius: '6px',
                    border: '1px solid #E5E5E5',
                    textTransform: 'none',
                    padding: '8px 16px',
                    color: '#787878',
                    '&:hover': {
                    backgroundColor: '#ffffff', 
                    color: '#000000', 
                    border: '1px solid #E5E5E5',
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#E5EEFF',
                        color: '#1976d2', 
                        border: '1px solid #E5E5E5',
                        '&:hover': {
                            backgroundColor: '#E5EEFF', 
                            color: '#1976d2', 
                            border: '1px solid #E5E5E5',
                        },
                    },
                }}
                >
                {option.label}
                </ToggleButton>
            ))}
            </ToggleButtonGroup>
        </Box>
    )
};

export default ButtonGroup;
