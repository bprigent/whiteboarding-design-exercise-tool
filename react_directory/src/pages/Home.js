import Image from '../components/Image';
import TwoColPage from '../components/TwoColPage';
import Form from '../components/Form';

function Home() {
    return (
        <TwoColPage
            leftContent={<Image/>}
            rightContent={<Form/>}
        />
    );
}

export default Home;