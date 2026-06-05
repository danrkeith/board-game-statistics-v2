import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import type { Authority } from '../utils/types';
import ProtectedRoute from './ProtectedRoute';

interface AuthorityProtectedRouteProps {
    requiredAuthorities: Authority[];
}

const AuthorityProtectedRoute = ({ requiredAuthorities }: AuthorityProtectedRouteProps) => {
    const { isLoading, user, authorities } = useContext(UserContext);

    return (
        <ProtectedRoute isAuthenticated={
            isLoading || (user !== null && requiredAuthorities.every(
                auth => authorities.has(auth),
            ))
        }
        />
    );
};

export default AuthorityProtectedRoute;
