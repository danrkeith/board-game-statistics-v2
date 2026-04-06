import { Navigate, Outlet } from 'react-router-dom';
import { HOME_PATH } from '../App';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
}

const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to={HOME_PATH} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
