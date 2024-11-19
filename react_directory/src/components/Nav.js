import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link>
            </nav>
        </div>
    );
}

export default Nav;