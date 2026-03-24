import { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import type { User } from '../../utils/types';
import UserRow from './UserRow';
import { AuthContext } from '../../context/AuthContext';
import { apiDeleteUser } from '../../utils/api/users-api-utils';
import EditUserModal from './EditUserModal';

interface UsersTableProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>;
}

const UsersTable = ({ users, setUsers }: UsersTableProps) => {
    const { callWithAuth } = useContext(AuthContext);
    const { user: currentUser } = useContext(UserContext);

    const [editUser, setEditUser] = useState<User | null>(null);
    
    const handleDropdownSelect = (eventKey: string, user: User) => {
        switch (eventKey) {
            case 'edit':
                setEditUser(user);
                break;
            case 'delete':
                void callWithAuth(apiDeleteUser, user.id)
                    .then(() => setUsers(users => users?.filter(u => u.id !== user.id)));
                break;
            default:
        }
    };

    return (
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => (
                        <UserRow user={user} isLoggedIn={currentUser?.id === user.id} handleDropdownSelect={handleDropdownSelect} key={user.id} />
                    ))}
                </tbody>
            </Table>
            <EditUserModal show={!!editUser} onHide={() => setEditUser(null)} user={editUser} />
        </>
    );
};

export default UsersTable;
