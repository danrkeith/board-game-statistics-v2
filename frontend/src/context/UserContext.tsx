import type React from 'react';
import type { User } from '../utils/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { apiGetMe } from '../utils/api/users-api-utils';

interface UserContextType {
    isLoading: boolean;
    user: User | null;
}

interface UserProviderProps {
    children?: React.ReactNode;
}

const UserContext = createContext<UserContextType>({
    isLoading: true,
    user: null,
});

const UserProvider = ({ children }: UserProviderProps) => {
    const { isLoading: authIsLoading, jwt, callWithAuth, logout } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setIsLoading(true);

        if (authIsLoading) {
            return;
        }

        if (jwt === null) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        void callWithAuth(apiGetMe)
            .then(user => setUser(user))
            .catch(({ cause }: Error) => {
                if (cause === 'ExpiredJwtException') {
                    console.log('JWT expired, logging out');
                    logout();
                }
            })
            .finally(() => setIsLoading(false));
    }, [authIsLoading, callWithAuth, logout, jwt]);

    const contextValue = {
        isLoading,
        user,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
