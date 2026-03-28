import { useContext, useEffect, useReducer } from 'react';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { apiGetUsers } from '../../utils/api/users-api-utils';
import type { User } from '../../utils/types';
import UsersTable from './UsersTable';

interface UsersReducerActionSetAll {
    type: 'SET_ALL';
    users: User[];
}

interface UsersReducerActionUpdate {
    type: 'UPDATE';
    user: User;
}

interface UsersReducerActionRemove {
    type: 'REMOVE';
    userId: number;
}

type UsersReducerAction = UsersReducerActionSetAll | UsersReducerActionUpdate | UsersReducerActionRemove;

const ManageUsersPage = () => {
    const { isLoading, callWithAuth } = useContext(AuthContext);

    const usersReducer = (state: User[] | undefined, action: UsersReducerAction) => {
        switch (action.type) {
            case 'SET_ALL':
                return action.users;
            case 'UPDATE':
                return state?.map(u => u.id === action.user.id ? action.user : u);
            case 'REMOVE':
                return state?.filter(u => u.id !== action.userId);
            default:
                return state;
        }
    };

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
export type { UsersReducerAction };
