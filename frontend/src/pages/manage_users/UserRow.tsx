import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import KebabDropdownToggle from '../../components/KebabDropdownToggle';
import { AuthContext } from '../../context/AuthContext';
import { apiDeleteUser } from '../../utils/api/users-api-utils';
import type { User } from '../../utils/types';
import { fullName } from '../../utils/user-utils';

interface UserRowProps {
    user: User;
    isLoggedIn: boolean;
    setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>;
}

const UserRow = ({ user, isLoggedIn, setUsers }: UserRowProps) => {
    const { callWithAuth } = useContext(AuthContext);

    const dropdownOnSelect = (eventKey: string | null) => {
        switch (eventKey) {
            case 'delete':
                void callWithAuth(apiDeleteUser, user.id)
                    .then(() => setUsers(users => users?.filter(u => u.id !== user.id)));
                break;
            default:
        }
    };

    return (
        <tr key={user.id}>
            <td>{fullName(user)}</td>
            <td>{user.email}</td>
            <td>
                <Dropdown onSelect={eventKey => dropdownOnSelect(eventKey)}>
                    <Dropdown.Toggle as={KebabDropdownToggle} />
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="edit" disabled>
                            Edit
                        </Dropdown.Item>
                        {!isLoggedIn && (
                            <Dropdown.Item eventKey="delete" className="text-danger">
                                Delete
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}

export default UserRow;