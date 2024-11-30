import React from 'react';
import TwoColPage from '../components/TwoColPage';
import Image from '../components/Image';
import Form from '../components/Form';

const FormPage = () => {
    return (
        <TwoColPage
            leftContent={<Image/>}
            rightContent={<Form/>}
        />
    );
};

export default FormPage;
