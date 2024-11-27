import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const TextPairing = ({ heading, text, link, linkStyle }) => (
  <Box mb={2}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      {heading}
    </Typography>
    <Typography>
      {text}{' '}
      {link && (
        <Link href={link.href} underline="hover" sx={linkStyle}>
          {link.text}
        </Link>
      )}
    </Typography>
  </Box>
);

export default TextPairing;
