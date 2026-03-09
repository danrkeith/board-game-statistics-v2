import { Dropdown, Table } from 'react-bootstrap';
import type { User } from '../../utils/types';
import KebabDropdownToggle from '../../components/KebabDropdownToggle';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiDeleteUser } from '../../utils/api/users-api-utils';
import { UserContext } from '../../context/UserContext';

interface UsersTableProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>;
}

const UsersTable = ({ users, setUsers }: UsersTableProps) => {
    const { callWithAuth } = useContext(AuthContext);
    const { user: currentUser } = useContext(UserContext);

    const dropdownOnSelect = (user: User, eventKey: string | null) => {
        switch (eventKey) {
            case 'delete':
                void callWithAuth(apiDeleteUser, user.id)
                    .then(() => setUsers(users => users?.filter(u => u.id !== user.id)));
                break;
            default:
        }
    };

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
                    <tr key={user.id}>
                        <td>Placeholder Name</td>
                        <td>{user.email}</td>
                        <td>
                            <Dropdown onSelect={eventKey => dropdownOnSelect(user, eventKey)}>
                                <Dropdown.Toggle as={KebabDropdownToggle} />
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="edit" disabled>
                                        Edit
                                    </Dropdown.Item>
                                    {currentUser?.id !== user.id && (
                                        <Dropdown.Item eventKey="delete" className="text-danger">
                                            Delete
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UsersTable;
