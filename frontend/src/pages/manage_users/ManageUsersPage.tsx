import { Table } from 'react-bootstrap';
import type { User } from '../../utils/types';
import { useContext, useEffect, useState } from 'react';
import { apiGetUsers } from '../../utils/api/users-api-utils';
import { AuthContext } from '../../context/AuthContext';

const ManageUsersPage = () => {
    const { callWithAuth } = useContext(AuthContext);

    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        callWithAuth(apiGetUsers)
            .then(users => setUsers(users));
    }, []);

    return (
        <>
            <h1>Manage Users</h1>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
            </Table>
        </>
    );
};

export default ManageUsersPage;