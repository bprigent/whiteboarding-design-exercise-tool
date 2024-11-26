import { Button } from '@mui/material';
import Nav from '../components/Nav';
import PromptForm from '../components/PromptForm';
import Result from '../components/Results';

function Home() {
    return (
    <div>
        <Nav />
        <h1>Designer, this is a conversational whiteboarding tool, powered by AI.</h1>
        <PromptForm />
        <Result />
        <Button href="/create-new">Create prompt</Button>
    </div>
    );
}

export default Home;