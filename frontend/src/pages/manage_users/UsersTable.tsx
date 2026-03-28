import { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import type { User } from '../../utils/types';
import UserRow from './UserRow';
import { AuthContext } from '../../context/AuthContext';
import { apiDeleteUser } from '../../utils/api/users-api-utils';
import EditUserModal from './EditUserModal';

type UserAction = 'edit' | 'delete';

interface UsersTableProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>;
}

const UsersTable = ({ users, setUsers }: UsersTableProps) => {
    const { callWithAuth } = useContext(AuthContext);
    const { user: currentUser } = useContext(UserContext);

    const [action, setAction] = useState<UserAction | null>(null);
    const [actionedUser, setActionedUser] = useState<User | null>(null);

    const handleUserAction = (action: UserAction, user: User) => {
        switch (action) {
            case 'delete':
                // TODO - confirmation dialog
                void callWithAuth(apiDeleteUser, user.id)
                    .then(() => setUsers(users => users?.filter(u => u.id !== user.id)));
                break;
            default:
                setActionedUser(user);
                setAction(action);
                break;
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
                        <UserRow user={user} isLoggedIn={currentUser?.id === user.id} handleUserAction={handleUserAction} key={user.id} />
                    ))}
                </tbody>
            </Table>
            <EditUserModal show={action === 'edit'} handleClose={() => setAction(null)} user={actionedUser} />
        </>
    );
};

export default UsersTable;
export type { UserAction };
