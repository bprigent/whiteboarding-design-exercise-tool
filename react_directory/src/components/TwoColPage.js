import React from 'react';
import { Box } from '@mui/material';

const TwoColPage = ({ leftContent, rightContent }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100vw',
                alignItems: 'stretch', // Ensure children stretch vertically
                height: '100vh', // Fill the entire viewport height
                minHeight: '100vh',
                backgroundColor: '#f9f9f9',
                padding: 2,
          }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1400px',
                    overflow: 'hidden', 
                    
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: '50vw',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '24px',
                        boxSizing: 'border-box',
                        overflow: 'hidden', 
                    }}
                >
                    {leftContent} {/* Render content passed to the left column */}
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: '50vw',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '24px',
                        boxSizing: 'border-box',
                        marginLeft: '1rem', 
                        overflow: 'hidden', 
                    }}
                >
                    {rightContent} {/* Render content passed to the right column */}
                </Box>
            </Box>
        </Box>
    );
};

export default TwoColPage;
