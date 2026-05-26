import React, { useContext, useEffect, useState } from 'react';
import type { Authority } from '../utils/types';
import { AuthContext } from './AuthContext';
import { apiGetAuthorityPrerequisites } from '../utils/api/user-authorities-api-utils';

interface ConstantContextType {
    authorityPrerequisites?: Record<Authority, Authority[]>;
}

interface ConstantProviderProps {
    children?: React.ReactNode;
}

const ConstantContext = React.createContext<ConstantContextType>({});

const ConstantProvider = ({ children }: ConstantProviderProps) => {
    const { isLoading: authIsLoading, callWithAuth } = useContext(AuthContext);

    const [authorityPrerequisites, setAuthorityPrerequisites] = useState<Record<Authority, Authority[]>>();

    useEffect(() => {
        if (authIsLoading) {
            return;
        }

        void callWithAuth(apiGetAuthorityPrerequisites)
            .then(setAuthorityPrerequisites);
    }, [authIsLoading, callWithAuth]);

    const contextValue = { authorityPrerequisites };

    return (
        <ConstantContext.Provider value={contextValue}>
            {children}
        </ConstantContext.Provider>
    );
};

export { ConstantContext, ConstantProvider };
