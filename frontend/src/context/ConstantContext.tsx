import React, { useContext, useEffect, useState } from 'react';
import type { Authority } from '../utils/types';
import { AuthContext } from './AuthContext';
import { apiGetAuthorityPrerequisites } from '../utils/api/constant-api-utils';

interface ConstantContextType {
    authorityPrerequisites?: Map<Authority, Set<Authority>>;
}

interface ConstantProviderProps {
    children?: React.ReactNode;
}

const ConstantContext = React.createContext<ConstantContextType>({});

const ConstantProvider = ({ children }: ConstantProviderProps) => {
    const { isLoading: authIsLoading, isAuthenticated, callWithAuth } = useContext(AuthContext);

    const [authorityPrerequisites, setAuthorityPrerequisites] = useState<Map<Authority, Set<Authority>>>();

    useEffect(() => {
        if (authIsLoading) {
            return;
        }

        if (!isAuthenticated) {
            setAuthorityPrerequisites(undefined);
            return;
        }

        void callWithAuth(apiGetAuthorityPrerequisites)
            .then(setAuthorityPrerequisites);
    }, [authIsLoading, isAuthenticated, callWithAuth]);

    const contextValue = { authorityPrerequisites };

    return (
        <ConstantContext.Provider value={contextValue}>
            {children}
        </ConstantContext.Provider>
    );
};

export { ConstantContext, ConstantProvider };
