import React from 'react';
import TwoColPage from '../components/TwoColPage';
import Image from '../components/Image';
import Prompt from '../components/Prompt';

const ExercisePage = () => {

    return (
        <TwoColPage
            leftContent={<Image/>}
            rightContent={<Prompt/>}
        />
    );
};

export default ExercisePage;