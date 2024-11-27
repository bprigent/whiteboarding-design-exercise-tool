import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import { useDispatch } from 'react-redux';
import { setPrompt, setStatus } from '../store/slices/exerciseSlice';
import { createExercise } from "../apiCalls/createExercise";
import TextPairing from './TextPairing';
import ButtonGroup from './ButtonGroup';
import {PrimaryButtonLarge} from './Buttons';

const Form = () => {

    // Handle local states for all form variants
    const [experience, setExperience] = useState('');
    const [product, setProduct] = useState('');
    const [maturity, setMaturity] = useState('');
    const [time, setTime] = useState('');
    const handleExperienceChange = (_, newExperience) => setExperience(newExperience);
    const handleProductChange = (_, newProduct) => setProduct(newProduct);
    const handleMaturityChange = (_, newMaturity) => setMaturity(newMaturity);
    const handleTimeChange = (_, newTime) => setTime(newTime);
    
    // Handle form submit
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = async () => {
        try {
            dispatch(setStatus('warming')); 
            dispatch(setPrompt('')); 
            navigate('/exercise');
            const serverResponse = await createExercise(dispatch, experience, product, maturity, time);
            dispatch(setPrompt(serverResponse)); 
            dispatch(setStatus('success'));
        } catch (error) {
            console.error("Error generating response:", error);
            dispatch(setPrompt('Error generating response.'));
            dispatch(setStatus('error'));
        }
    }


    return (
        <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                paddingX: 4, 
                paddingBottom: 4,
                paddingTop: 8, 
                height: '100%'
            }}
        >
            
            <TextPairing
                heading="Whiteboarding practice exercises for every designer"
                text="This tool leverages the power of LLMs to create customer whiteboarding prompts. It uses"
                link={{ href: 'https://llama.com', text: 'Llama 3.2' }}
                linkStyle={{ color: '#007bff', fontWeight: 'bold' }}
            />

            <Box sx={{flexGrow: 1}}>
                <ButtonGroup
                    label="Experience"
                    options={[
                        { value: 'under2', label: 'Under 2 years' },
                        { value: '2to5', label: 'Between 2 and 5 years', defaultValue: true },
                        { value: 'above5', label: 'Above 5 years' },
                    ]}
                    value={experience}
                    onChange={handleExperienceChange}
                />

                <ButtonGroup
                    label="Product"
                    options={[
                        { value: 'digital', label: 'Digital', defaultValue: true },
                        { value: 'physical', label: 'Physical' },
                    ]}
                    value={product}
                    onChange={handleProductChange}
                />
                
                <ButtonGroup
                    label="Maturity"
                    options={[
                        { value: 'incremental', label: 'Incremental change', defaultValue: true },
                        { value: '0to1', label: '0 to 1 project' },
                    ]}
                    value={maturity}
                    onChange={handleMaturityChange}
                />

                
                <ButtonGroup
                    label="Timer"
                    options={[
                        { value: '30min', label: '30 min' },
                        { value: '45min', label: '45 min', defaultValue: true },
                        { value: '60min', label: '60 min' },
                    ]}
                    value={time}
                    onChange={handleTimeChange}
                />
            </Box>
            <Box>
                <PrimaryButtonLarge onClick={handleClick}>
                    Create custom exercise
                </PrimaryButtonLarge>
            </Box>
        </Box>
    );
};

export default Form;

