import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Link, Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { setPrompt, setStatus } from '../store/slices/exerciseSlice';
import { createExercise } from "../apiCalls/createExercise";

const ExerciseForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            dispatch(setStatus('working')); 
            dispatch(setPrompt('')); 
            navigate('/exercise');
            const serverResponse = await createExercise();
            dispatch(setPrompt(serverResponse)); 
            dispatch(setStatus('success'));
          } catch (error) {
            dispatch(setPrompt('Error generating response.'));
            dispatch(setStatus('error')); 
          }
    }


    return (
        <Box sx={{padding: 4}}>
            <Typography 
                variant="h4" 
                component="h1"
                sx={{fontWeight: '800'}}
            >
                Tailored Whiteboarding practice for every designer
            </Typography>
            <Typography variant="body2">
                This tool leverage the power of LLMs to create customer whiteboarding prompts. It uses <Link href='https://www.llama.com/'>Llama 3.2</Link>. 
            </Typography>
            <Button onClick={handleClick}>
                Create custom exercise
            </Button>
        </Box>
    );
};

export default ExerciseForm;

