import type React from 'react';
import type { User } from '../model';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext, } from './AuthContext';
import { apiMe } from '../api/users-api-utils';

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
    const { jwt, callWithAuth } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        console.log("Here");
        setIsLoading(true);

        if (jwt === null) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        callWithAuth(apiMe)
            .then((user) => setUser(user))
            .finally(() => setIsLoading(false));
    }, [jwt]);

    const contextValue = {
        isLoading,
        user,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
