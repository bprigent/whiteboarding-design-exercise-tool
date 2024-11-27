import { Button } from '@mui/material';
import Image from '../components/Image';
import TwoColPage from '../components/TwoColPage';

function Home() {
    return (
        <TwoColPage
            leftContent={<Image/>}
            rightContent={
                <div>
                    <h1>Designer, this is a conversational whiteboarding tool, powered by AI.</h1>
                    <Button href="/create-new">Create prompt</Button>
                </div>
            }
        />
    );
}

export default Home;