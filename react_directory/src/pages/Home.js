import Nav from '../components/Nav';
import PromptForm from '../components/PromptForm';
import Result from '../components/Results';

function Home() {
    return (
    <div>
        <Nav />
        <h1>Welcome to my tool folks!</h1>
        <PromptForm />
        <Result />
    </div>
    );
}

export default Home;