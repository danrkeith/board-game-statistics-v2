import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Spinner } from 'react-bootstrap';

const HomePage = () => {
    const { isLoading, user } = useContext(UserContext);

    return (
        <>
            <h1>Home</h1>
            {isLoading
                ? (
                    <Spinner size="sm" />
                )
                : (
                    <p>
                        Welcome
                        {user?.firstName && ` ${user.firstName}`}
                        !
                    </p>
                )}
        </>
    );
};

export default HomePage;
