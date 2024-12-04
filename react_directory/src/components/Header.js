import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { setPrompt, setStatus } from "../store/slices/exerciseSlice";
import TimerMini from './TimerMini';
import { OrangeButton } from './Buttons';
import { useNavigate } from 'react-router-dom';



const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancel = () => {
        dispatch(setPrompt(''));
        dispatch(setStatus('idle'));
        navigate('/create-new');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Typography 
                variant="h4" 
                component="h1"
                sx={{
                    flexGrow: 1,
                    fontWeight: 700,
                }}
            >
                Exercise
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    margin: '0px',
                    padding: '0px',
                }}
            >
                <TimerMini />
                <OrangeButton onClick={handleCancel}>
                    Stop exercise
                </OrangeButton>
            </Box>
            
        </Box>

    );  
};

export default Header;