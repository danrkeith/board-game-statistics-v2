import { createContext, useEffect, useState } from 'react';
import { apiLogin } from '../api/auth-api-utils';

interface AuthContextType {
    isLoading: boolean;
    jwt: string | null;
    login: (credentials: Credentials) => Promise<void>;
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
    jwt: null,
    login: () => new Promise(() => console.error('Login function not attached')),
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [jwt, setJwt] = useState<string | null>(null);

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

    const contextValue: AuthContextType = {
        isLoading,
        jwt,
        login,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export type { Credentials };
export { AuthContext, AuthProvider };
