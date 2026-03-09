import type { User } from '../../utils/types';
import { useContext, useEffect, useState } from 'react';
import { apiGetUsers } from '../../utils/api/users-api-utils';
import { AuthContext } from '../../context/AuthContext';
import UsersTable from './UsersTable';
import { Spinner } from 'react-bootstrap';

const ManageUsersPage = () => {
    const { isLoading, callWithAuth } = useContext(AuthContext);

    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        void callWithAuth(apiGetUsers)
            .then(users => setUsers(users));
    }, [isLoading, callWithAuth]);

    return (
        <>
            <h1>Manage Users</h1>
            {users === undefined
                ? (
                    <Spinner />
                )
                : (
                    <UsersTable users={users} setUsers={setUsers} />
                )}
        </>
    );
};

export default ManageUsersPage;
