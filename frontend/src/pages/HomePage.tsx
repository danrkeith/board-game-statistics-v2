import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <>
            <h1>Home</h1>
            <p>Welcome!</p>
            <p>User is { isLoggedIn || 'not' } logged in</p>
        </>
    );
}

export default HomePage;