import React from 'react';
import TwoColAndHeaderPage from '../components/TwoColAndHeaderPage';
import ExerciseResult from '../components/ExerciseResult';
import Chat from '../components/chat/Chat';
import Header from '../components/Header';

const ExercisePage = () => {
    return (
        <TwoColAndHeaderPage
            headerContent={<Header/>}
            leftContent={<ExerciseResult/>}
            rightContent={<Chat/>}
        />
    );
};

export default ExercisePage;