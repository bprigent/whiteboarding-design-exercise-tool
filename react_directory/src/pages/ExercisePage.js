import React from 'react';
import ThreeSectionPage from '../components/ThreeSectionPage';
import ExerciseResult from '../components/ExerciseResult';
import Timer from '../components/Timer';
import Chat from '../components/Chat';

const ExercisePage = () => {
    return (
        <ThreeSectionPage
            leftContentTop={<Timer/>}
            leftContentBottom={<ExerciseResult/>}
            rightContent={<Chat/>}
        />
    );
};

export default ExercisePage;