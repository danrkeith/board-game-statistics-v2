import React, { useContext, useEffect, useState } from 'react';
import type { Authority } from '../utils/types';
import { AuthContext } from './AuthContext';
import { apiGetAuthorityPrerequisites } from '../utils/api/user-authorities-api-utils';

interface AuthoritiesContextType {
    prerequisites?: Record<Authority, Authority[]>;
}

interface AuthoritiesProviderProps {
    children?: React.ReactNode;
}

const AuthorityPrerequisitesContext = React.createContext<AuthoritiesContextType>({});

const AuthorityPrerequisitesProvider = ({ children }: AuthoritiesProviderProps) => {
    const {isLoading: authIsLoading, callWithAuth} = useContext(AuthContext);

    const [prerequisites, setPrerequisites] = useState<Record<Authority, Authority[]>>();

    useEffect(() => {
        if (authIsLoading) {
            return;
        }

        void callWithAuth(apiGetAuthorityPrerequisites)
            .then(setPrerequisites);
    }, [authIsLoading]);

    const contextValue = {prerequisites};

    return (
        <AuthorityPrerequisitesContext.Provider value={contextValue}>
            {children}
        </AuthorityPrerequisitesContext.Provider>
    );
};

export { AuthorityPrerequisitesContext, AuthorityPrerequisitesProvider };
