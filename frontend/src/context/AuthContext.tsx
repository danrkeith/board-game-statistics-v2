import { createContext, useEffect, useState } from 'react';
import { apiLogin } from '../utils/api/auth-api-utils';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../App';

interface AuthContextType {
    isLoading: boolean;
    jwt: string | null;
    login: (credentials: Credentials) => Promise<void>;
    logout: () => void;
    callWithAuth<ResT>(this: void, apiFunc: (jwt: string) => Promise<ResT>): Promise<ResT>;
    callWithAuth<ReqT, ResT>(this: void, apiFunc: (jwt: string, body: ReqT) => Promise<ResT>, body: ReqT): Promise<ResT>;
}

interface Credentials {
    email: string;
    password: string;
}

interface AuthProviderProps {
    children?: React.ReactNode;
}

const JWT_STORAGE_KEY = 'jwt';

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

    const navigate = useNavigate();

    useEffect(() => {
        setJwt(sessionStorage.getItem(JWT_STORAGE_KEY));
        setIsLoading(false);
    }, []);

    const login = (credentials: Credentials): Promise<void> => {
        setIsLoading(true);

        return apiLogin(credentials)
            .then(({ jwt }) => {
                sessionStorage.setItem(JWT_STORAGE_KEY, jwt);
                setJwt(jwt);
            })
            .finally(() => setIsLoading(false));
    };

    const logout = () => {
        sessionStorage.removeItem(JWT_STORAGE_KEY);
        setJwt(null);
        void navigate(HOME_PATH);
    };

    const callWithAuth = <ReqT, ResT>(apiFunc: (jwt: string, body?: ReqT) => Promise<ResT>, body?: ReqT): Promise<ResT> => {
        if (jwt === null) {
            const error = new Error(`Api call to ${apiFunc.name} requires auth`);
            console.error(error);
            return Promise.reject(error);
        }

        if (body === undefined) {
            return (apiFunc as (jwt: string) => Promise<ResT>)(jwt)
                .catch((error: Error) => {
                    if (error.cause === 'ExpiredJwtException') {
                        logout();
                    }
                    return Promise.reject(error);
                });
        }
        else {
            return (apiFunc as (jwt: string, body: ReqT) => Promise<ResT>)(jwt, body);
        }
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
