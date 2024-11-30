import React from 'react';
import TwoColPage from '../components/TwoColPage';
import ExerciseResult from '../components/ExerciseResult';
import Timer from '../components/Timer';

const ExercisePage = () => {
    return (
        <TwoColPage
            leftContent={<Timer/>}
            rightContent={<ExerciseResult/>}
        />
    );
};

export default ExercisePage;