import React, { useContext, useEffect, useState } from 'react';
import type { Authority } from '../utils/types';
import { AuthContext } from './AuthContext';
import { apiGetAuthorityPrerequisites } from '../utils/api/user-authorities-api-utils';

interface AuthoritiesContextType {
    getPrerequisites?: ((authority: Authority) => Authority[]);
}

interface AuthoritiesProviderProps {
    children?: React.ReactNode;
}

const AuthoritiesContext = React.createContext<AuthoritiesContextType>({});

const AuthoritiesProvider = ({ children }: AuthoritiesProviderProps) => {
    const {isLoading: authIsLoading, callWithAuth} = useContext(AuthContext);

    const [authorityPrerequisites, setAuthorityPrerequisites] = useState<Record<Authority, Authority[]>>();
    
    const getPrerequisites = (authority: Authority): Authority[] => 
        authorityPrerequisites?.[authority] || [];

    useEffect(() => {
        if (authIsLoading) {
            return;
        }

        void callWithAuth(apiGetAuthorityPrerequisites)
            .then(setAuthorityPrerequisites);
    }, [authIsLoading]);

    const contextValue = {
        getPrerequisites
    };

    return (
        <AuthoritiesContext.Provider value={contextValue}>
            {children}
        </AuthoritiesContext.Provider>
    );
};

export { AuthoritiesContext, AuthoritiesProvider };
