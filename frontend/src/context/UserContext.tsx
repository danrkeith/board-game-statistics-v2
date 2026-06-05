import type React from 'react';
import type { Authority, User } from '../utils/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { apiGetMe } from '../utils/api/users-api-utils';
import { apiGetUserAuthorities } from '../utils/api/user-authorities-api-utils';

interface UserContextType {
    isLoading: boolean;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    authorities: Set<Authority>;
    setAuthorities: React.Dispatch<React.SetStateAction<Set<Authority>>>;
}

interface UserProviderProps {
    children?: React.ReactNode;
}

const UserContext = createContext<UserContextType>({
    isLoading: true,
    user: null,
    setUser: () => console.error('UserContext.updateUser function not attached'),
    authorities: new Set<Authority>(),
    setAuthorities: () => console.error('UserContext.setAuthorities function not attached'),
});

const UserProvider = ({ children }: UserProviderProps) => {
    const { isLoading: authIsLoading, isAuthenticated, callWithAuth, logout } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [authorities, setAuthorities] = useState<Set<Authority>>(new Set<Authority>());

    useEffect(() => {
        setIsLoading(true);

        if (authIsLoading) {
            return;
        }

        if (!isAuthenticated) {
            setUser(null);
            setAuthorities(new Set<Authority>());
            setIsLoading(false);
            return;
        }

        void callWithAuth(apiGetMe)
            .then(setUser);
            // Continue loading, since authorities are not fetched yet
    }, [authIsLoading, isAuthenticated, callWithAuth, logout]);

    useEffect(() => {
        if (user === null) {
            setAuthorities(new Set<Authority>());
            return;
        }

        void callWithAuth(apiGetUserAuthorities, user.id)
            .then(setAuthorities)
            .then(() => setIsLoading(false));
    }, [user]);

    const contextValue = {
        isLoading,
        user,
        setUser,
        authorities,
        setAuthorities,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
