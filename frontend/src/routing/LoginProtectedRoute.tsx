import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ProtectedRoute from './ProtectedRoute';

const LoginProtectedRoute = () => {
    const { isLoading, user } = useContext(UserContext);

    return <ProtectedRoute isAuthenticated={isLoading || user !== null} />;
};

export default LoginProtectedRoute;
