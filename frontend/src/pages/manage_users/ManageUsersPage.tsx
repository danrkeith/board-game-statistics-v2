import { useContext, useEffect, useReducer } from 'react';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { apiGetUsers } from '../../utils/api/users-api-utils';
import type { User } from '../../utils/types';
import UsersTable from './UsersTable';

interface UsersActionSetAll {
    type: 'SET_ALL';
    users: User[];
}

interface UsersActionUpdate {
    type: 'UPDATE';
    user: User;
}

interface UsersActionRemove {
    type: 'REMOVE';
    userId: number;
}

type UsersAction = UsersActionSetAll | UsersActionUpdate | UsersActionRemove;

const ManageUsersPage = () => {
    const { isLoading, callWithAuth } = useContext(AuthContext);

    const usersReducer = (state: User[] | undefined, action: UsersAction) => {
        switch (action.type) {
            case 'SET_ALL':
                const setAllAction = action as UsersActionSetAll;
                return setAllAction.users;
            case 'UPDATE':
                const updateAction = action as UsersActionUpdate;
                return state?.map(u => u.id === updateAction.user.id ? updateAction.user : u);
            case 'REMOVE':
                const removeAction = action as UsersActionRemove;
                return state?.filter(u => u.id !== removeAction.userId);
            default:
                return state;
        }
    }

    const [users, usersDispatch] = useReducer(usersReducer, undefined);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        void callWithAuth(apiGetUsers)
            .then(users => usersDispatch({ type: 'SET_ALL', users: users }));
    }, [isLoading, callWithAuth]);

    return (
        <>
            <h1>Manage users</h1>
            {users === undefined
                ? (
                    <Spinner className="d-block mx-auto" />
                )
                : (
                    <UsersTable users={users} usersDispatch={usersDispatch} />
                )}
        </>
    );
};

export default ManageUsersPage;
export type { UsersAction };
