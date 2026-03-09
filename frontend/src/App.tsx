import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import LoginPage from './pages/account/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { UserProvider } from './context/UserContext';
import ManageUsersPage from './pages/manage_users/ManageUsersPage';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const MANAGE_USERS_PATH = '/manage-users';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <Header />
                    <Container className="mt-4">
                        <Routes>
                            <Route path={HOME_PATH} element={<HomePage />} />
                            <Route path={LOGIN_PATH} element={<LoginPage />} />
                            <Route path={MANAGE_USERS_PATH} element={<ManageUsersPage />} />
                        </Routes>
                    </Container>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
