import { createContext, useEffect, useState } from 'react';
import { apiLogin } from '../api/auth-api-utils';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isLoading: boolean;
    isLoggedIn: boolean;
    jwt: string | null;
    login: (credentials: Credentials) => Promise<void>;
    logout: (to: string) => void;
}

interface Credentials {
    email: string;
    password: string;
}

interface AuthProviderProps {
    children?: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    isLoading: true,
    isLoggedIn: false,
    jwt: null,
    login: () => new Promise(() => console.error('Login function not attached')),
    logout: () => console.error('Logout function not attached'),
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jwt, setJwt] = useState<string | null>(null);
    const navigate = useNavigate();

    const isLoggedIn = jwt !== null;

    useEffect(() => {
        setJwt(sessionStorage.getItem('jwt'));
        setIsLoading(false);
    }, []);

    const login = (credentials: Credentials): Promise<void> => {
        setIsLoading(true);

        return apiLogin(credentials)
            .then(({ jwt }) => {
                sessionStorage.setItem('jwt', jwt);
                setJwt(jwt);
            })
            .finally(() => setIsLoading(false));
    };

    const logout = (to: string) => {
        setJwt(null);
        navigate(to);
    }

    const contextValue: AuthContextType = {
        isLoading,
        isLoggedIn,
        jwt,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export type { Credentials };
export { AuthContext, AuthProvider };
