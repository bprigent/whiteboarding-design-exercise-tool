import React from 'react';
import TwoColPage from '../components/TwoColPage';
import Image from '../components/Image';
import ExerciseForm from '../components/ExerciseForm';

const FormPage = () => {

    return (
        <TwoColPage
            leftContent={<Image/>}
            rightContent={<ExerciseForm/>}
        />
    );
};

export default FormPage;
