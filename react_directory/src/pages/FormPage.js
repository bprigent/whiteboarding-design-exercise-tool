import React from 'react';
import { Typography } from '@mui/material';
import TwoColPage from '../components/TwoColPage';

const FormPage = () => {

    return (
        <TwoColPage
            leftContent={
                <Typography variant="body1">
                    Test
                </Typography>
            }
            rightContent={
                <Typography variant="body1">
                    Test
                </Typography>
            }
        />
    );
};

export default FormPage;
