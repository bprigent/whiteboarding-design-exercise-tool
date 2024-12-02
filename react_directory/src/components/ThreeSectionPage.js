import React from 'react';
import { Box } from '@mui/material';

const ThreeSectionPage = ({ leftContentTop, leftContentBottom, rightContent }) => {

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
                    gap: '24px',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1400px',
                    overflow: 'hidden', 
                    
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        width: '50vw',
                        boxSizing: 'border-box',
                    }}
                >
                   <Box
                        sx={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e5e5',
                            borderRadius: '24px',
                            boxSizing: 'border-box',
                            overflow: 'hidden', 
                        }}
                    >
                        {leftContentTop}
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e5e5',
                            borderRadius: '24px',
                            boxSizing: 'border-box',
                            overflow: 'hidden', 
                        }}
                    >
                        {leftContentBottom}
                    </Box>
                </Box>
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
                    {rightContent} {/* Render content passed to the right column */}
                </Box>
            </Box>
        </Box>
    );
};

export default ThreeSectionPage;
