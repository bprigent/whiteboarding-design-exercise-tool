import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import { useDispatch } from 'react-redux';
import { setPrompt, setStatus } from '../store/slices/exerciseSlice';
import { setConversationStatus } from '../store/slices/chatSlice';
import { setRemainingTime } from '../store/slices/timerSlice';
import { createExercise } from "../apiCalls/createExercise";
import TextPairing from './TextPairing';
import ButtonGroup from './ButtonGroup';
import { PrimaryButtonLarge } from './Buttons';

const Form = () => {

    // Handle local states for all form variants
    const [experience, setExperience] = useState('2to5');
    const [product, setProduct] = useState('digital');
    const [maturity, setMaturity] = useState('incremental');
    const [time, setTime] = useState(45);
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
            console.log(`timer is at: ${time}`)
            console.log(`experience is at: ${experience}`)
            console.log(`product is at: ${product}`)
            console.log(`maturity is at: ${maturity}`)
            dispatch(setRemainingTime(parseInt(time) * 60));
            navigate('/exercise');
            const serverResponse = await createExercise(dispatch, experience, product, maturity, time);
            dispatch(setPrompt(serverResponse)); 
            dispatch(setStatus('success'));
            dispatch(setConversationStatus('opened'));
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
                        { value: 30, label: '30 min' },
                        { value: 45, label: '45 min', defaultValue: true },
                        { value: 60, label: '60 min' },
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

