import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import LoginPage from './pages/account/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { UserProvider } from './context/UserContext';
import ManageUsersPage from './pages/manage_users/ManageUsersPage';
import RegisterPage from './pages/account/RegisterPage';
import AccountPage from './pages/account/AccountPage';

export const HOME_PATH = '/';
export const ACCOUNT_PATH = '/account';
export const LOGIN_PATH = '/login';
export const MANAGE_USERS_PATH = '/manage-users';
export const REGISTER_PATH = '/register';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <Header />
                    <Container className="mt-4">
                        <Routes>
                            <Route path={HOME_PATH} element={<HomePage />} />
                            <Route path={ACCOUNT_PATH} element={<AccountPage />} />
                            <Route path={LOGIN_PATH} element={<LoginPage />} />
                            <Route path={MANAGE_USERS_PATH} element={<ManageUsersPage />} />
                            <Route path={REGISTER_PATH} element={<RegisterPage />} />
                        </Routes>
                    </Container>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
