import React from 'react';
import TwoColPage from '../components/TwoColPage';
import Image from '../components/Image';
import ExerciseResult from '../components/ExerciseResult';

const ExercisePage = () => {

    return (
        <TwoColPage
            leftContent={<Image/>}
            rightContent={<ExerciseResult/>}
        />
    );
};

export default ExercisePage;