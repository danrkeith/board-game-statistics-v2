import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import LoginPage from './pages/account/LoginPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { UserProvider } from './context/UserContext';
import ManageUsersPage from './pages/manage_users/ManageUsersPage';
import RegisterPage from './pages/account/RegisterPage';
import AccountSettingsPage from './pages/account/AccountPage';
import LoginProtectedRoute from './routing/LoginProtectedRoute';
import AuthorityProtectedRoute from './routing/AuthorityProtectedRoute';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';

export const SETTINGS_PATH = '/settings';

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
                            <Route path={REGISTER_PATH} element={<RegisterPage />} />

                            <Route element={<LoginProtectedRoute />}>
                                <Route path={SETTINGS_PATH} element={<AccountSettingsPage />} />

                                <Route element={<AuthorityProtectedRoute requiredAuthorities={['MANAGE_USERS']} />}>
                                    <Route path={MANAGE_USERS_PATH} element={<ManageUsersPage />} />
                                </Route>
                            </Route>
                            
                            <Route path="*" element={<Navigate to={HOME_PATH} />} />
                        </Routes>
                    </Container>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
