import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import type { User } from '../../utils/types';
import UserRow from './UserRow';

interface UsersTableProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>;
}

const UsersTable = ({ users, setUsers }: UsersTableProps) => {
    const { user: currentUser } = useContext(UserContext);

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: User) => (
                    <UserRow user={user} isLoggedIn={currentUser?.id === user.id} setUsers={setUsers} key={user.id} />
                ))}
            </tbody>
        </Table>
    );
};

export default UsersTable;
