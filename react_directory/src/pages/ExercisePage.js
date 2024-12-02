import React from 'react';
import ThreeSectionPage from '../components/ThreeSectionPage';
import ExerciseResult from '../components/ExerciseResult';
import Timer from '../components/Timer';

const ExercisePage = () => {
    return (
        <ThreeSectionPage
            leftContentTop={<Timer/>}
            leftContentBottom={<ExerciseResult/>}
            rightContent={<ExerciseResult/>}
        />
    );
};

export default ExercisePage;