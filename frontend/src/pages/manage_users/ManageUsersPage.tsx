import { useContext, useEffect, useReducer, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { apiGetUsers } from '../../utils/api/users-api-utils';
import type { User } from '../../utils/types';
import UsersTable from './UsersTable';
import CreateUserModal from './CreateUserModal';

interface UsersReducerActionSetAll {
    type: 'SET_ALL';
    users: User[];
}

interface UsersReducerActionUpdate {
    type: 'UPDATE';
    user: User;
}

interface UsersReducerActionAdd {
    type: 'ADD';
    user: User;
}

interface UsersReducerActionRemove {
    type: 'REMOVE';
    userId: number;
}

type UsersReducerAction = UsersReducerActionSetAll | UsersReducerActionUpdate | UsersReducerActionAdd | UsersReducerActionRemove;

const ManageUsersPage = () => {
    const { isLoading, callWithAuth } = useContext(AuthContext);

    const usersReducer = (state: User[] | undefined, action: UsersReducerAction) => {
        switch (action.type) {
            case 'SET_ALL':
                return action.users;
            case 'ADD':
                return [...state ?? [], action.user];
            case 'UPDATE':
                return state?.map(u => u.id === action.user.id ? action.user : u);
            case 'REMOVE':
                return state?.filter(u => u.id !== action.userId);
            default:
                return state;
        }
    };

    const [users, usersDispatch] = useReducer(usersReducer, undefined);

    const [action, setAction] = useState<'CREATE_USER' | null>(null);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        void callWithAuth(apiGetUsers)
            .then(users => usersDispatch({ type: 'SET_ALL', users: users }));
    }, [isLoading, callWithAuth]);

    return (
        <div className="mb-5">
            <h1>Manage users</h1>
            {users === undefined
                ? (
                    <Spinner className="d-block mx-auto" />
                )
                : (
                    <>
                        <UsersTable users={users} usersDispatch={usersDispatch} />
                        <Button onClick={() => setAction('CREATE_USER')}>Create user</Button>
                    </>
                )}
            <CreateUserModal show={action === 'CREATE_USER'} submitCallback={user => usersDispatch({ type: 'ADD', user })} handleClose={() => setAction(null)} />
        </div>
    );
};

export default ManageUsersPage;
export type { UsersReducerAction };
