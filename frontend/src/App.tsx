import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Header from './Header';
import LoginPage from './pages/account/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Container className="mt-4">
                    <Routes>
                        <Route path={HOME_PATH} element={<HomePage />} />
                        <Route path={LOGIN_PATH} element={<LoginPage />} />
                    </Routes>
                </Container>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
