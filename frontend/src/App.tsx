import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/account/LoginPage';

const App = () => {
    return (
        <div className="m-5">
            <AuthProvider>
                <LoginPage />
            </AuthProvider>
        </div>
    );
};

export default App;
