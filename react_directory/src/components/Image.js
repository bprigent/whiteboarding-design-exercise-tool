import React from "react";
import { Box, Link, Typography } from '@mui/material';
import photo from './photo.jpg'; 

const Image = () => {

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%', 
                overflow: 'hidden', 
            }}
        >
            <Box
                sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url(${photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1, 
                }}
            >
                <Link 
                    href="https://www.bprigent.com"
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer" // Security best practice
                    sx={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        color: '#ffffff',
                        padding: '12px 12px',
                        textDecoration: 'none',
                        zIndex: 2,
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: '700',
                            lineHeight: '1.2',
                        }}
                    >
                        Benjamin Prigent
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '11px',
                            fontWeight: '500',
                            lineHeight: '1.2',
                        }}
                    >
                        Digital Product Builder
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default Image;