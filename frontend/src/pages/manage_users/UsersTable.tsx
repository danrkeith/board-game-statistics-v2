import { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import type { User } from '../../utils/types';
import UserRow from './UserRow';
import EditUserModal from './EditUserModal';
import type { UsersAction } from './ManageUsersPage';
import DeleteUserConfirmationModal from './DeleteUserConfirmationModal';

type UserAction = 'edit' | 'delete';

interface UsersTableProps {
    users: User[];
    usersDispatch: React.Dispatch<UsersAction>;
}

const UsersTable = ({ users, usersDispatch }: UsersTableProps) => {
    const { user: currentUser } = useContext(UserContext);

    const [action, setAction] = useState<UserAction | null>(null);
    const [actionedUser, setActionedUser] = useState<User | null>(null);

    const handleUserAction = (action: UserAction, user: User) => {
        setActionedUser(user);
        setAction(action);
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
            <EditUserModal show={action === 'edit'} user={actionedUser} submitCallback={user => usersDispatch({ type: 'UPDATE', user })} handleClose={() => setAction(null)} />
            <DeleteUserConfirmationModal show={action === 'delete'} user={actionedUser} confirmCallback={userId => usersDispatch({ type: 'REMOVE', userId })} handleClose={() => setAction(null)} />
        </>
    );
};

export default UsersTable;
export type { UserAction };
