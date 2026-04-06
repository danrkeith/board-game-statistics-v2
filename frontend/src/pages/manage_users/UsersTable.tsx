import { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import type { User } from '../../utils/types';
import UserRow from './UserRow';
import EditUserModal from './EditUserModal';
import type { UsersReducerAction } from './ManageUsersPage';
import DeleteUserConfirmationModal from './DeleteUserConfirmationModal';

interface UserAction {
    user: User;
    action: 'EDIT' | 'DELETE';
}

interface UsersTableProps {
    users: User[];
    usersDispatch: React.Dispatch<UsersReducerAction>;
}

const UsersTable = ({ users, usersDispatch }: UsersTableProps) => {
    const { user: currentUser, setUser: setCurrentUser } = useContext(UserContext);

    const [userAction, setUserAction] = useState<UserAction | null>(null);

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
                        <UserRow
                            user={user}
                            isLoggedIn={currentUser?.id === user.id}
                            handleUserAction={setUserAction}
                            key={user.id}
                        />
                    ))}
                </tbody>
            </Table>
            <EditUserModal
                show={userAction?.action === 'EDIT'}
                user={userAction?.user}
                submitCallback={(user) => {
                    usersDispatch({ type: 'UPDATE', user });
                    if (currentUser?.id === user.id) {
                        setCurrentUser(user);
                    }
                }}
                handleClose={() => setUserAction(null)}
            />
            <DeleteUserConfirmationModal
                show={userAction?.action === 'DELETE'}
                user={userAction?.user}
                confirmCallback={userId => usersDispatch({ type: 'REMOVE', userId })}
                handleClose={() => setUserAction(null)}
            />
        </>
    );
};

export default UsersTable;
export type { UserAction };
