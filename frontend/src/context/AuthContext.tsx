import { createContext, useEffect, useState } from 'react';
import { apiLogin } from '../api/auth-api-utils';

interface AuthContextType {
    isLoading: boolean;
    jwt: string | null;
    login: (credentials: Credentials) => Promise<void>;
    logout: () => void;
    callWithAuth: <ReqT,ResT>(apiFunc: (jwt: string, body?: ReqT) => Promise<ResT>, body?: ReqT) => Promise<ResT>;
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
    login: () => new Promise(() => console.error('AuthContext.login function not attached')),
    logout: () => console.error('AuthContext.logout function not attached'),
    callWithAuth: () => new Promise(() => console.error('AuthContext.passAuthTo function not attached')),
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

    const logout = () => {
        setJwt(null);
    };

    const callWithAuth = <ReqT,ResT>(apiFunc: (jwt: string, body?: ReqT) => Promise<ResT>, body?: ReqT): Promise<ResT> => {
        if (jwt === null) {
            const error = new Error(`Api call to ${apiFunc.name} requires auth`);
            console.error(error);
            return Promise.reject(error);
        }

        return apiFunc(jwt, body);
    };

    const contextValue: AuthContextType = {
        isLoading,
        jwt,
        login,
        logout,
        callWithAuth,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export type { Credentials };
export { AuthContext, AuthProvider };
