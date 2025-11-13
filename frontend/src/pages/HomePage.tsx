import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <h1>Home</h1>
            <p>Welcome{user && user.email}!</p>
        </>
    );
};

export default HomePage;
