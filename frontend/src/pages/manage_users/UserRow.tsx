import { Dropdown } from 'react-bootstrap';
import KebabDropdownToggle from '../../components/KebabDropdownToggle';
import type { User } from '../../utils/types';
import { fullName } from '../../utils/user-utils';
import type { UserAction } from './UsersTable';

interface UserRowProps {
    user: User;
    isLoggedIn: boolean;
    handleUserAction: (action: UserAction, user: User) => void;
}

const UserRow = ({ user, isLoggedIn, handleUserAction }: UserRowProps) => {
    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{fullName(user)}</td>
            <td>{user.email}</td>
            <td>
                <Dropdown onSelect={eventKey => handleUserAction(eventKey as UserAction, user)}>
                    <Dropdown.Toggle as={KebabDropdownToggle} />
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="edit">
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
    );
};

export default UserRow;
