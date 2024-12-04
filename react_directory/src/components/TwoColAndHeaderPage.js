import React from 'react';
import { Box } from '@mui/material';

const TwoColAndHeaderPage = ({ headerContent, leftContent, rightContent }) => {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Stack header and main content vertically
                width: '100vw',
                height: '100vh', // Fill the entire viewport height
                backgroundColor: '#fdfdfd',
                padding: 2,
                
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    height: '80px', // Fixed height for the header
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    maxWidth: '1400px',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    
                }}
            >
                {headerContent} {/* Render content passed to the header */}
            </Box>

            {/* Main Content Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    flex: 1,
                    overflow: 'hidden',
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
                    {/* Left Column */}
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

                    {/* Right Column */}
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
        </Box>
    )
};


export default TwoColAndHeaderPage;
