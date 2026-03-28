import { Dropdown } from 'react-bootstrap';
import KebabDropdownToggle from '../../components/KebabDropdownToggle';
import type { User } from '../../utils/types';
import { fullName } from '../../utils/user-utils';
import type { UserAction } from './UsersTable';

interface UserRowProps {
    user: User;
    isLoggedIn: boolean;
    handleUserAction: (userAction: UserAction) => void;
}

const UserRow = ({ user, isLoggedIn, handleUserAction }: UserRowProps) => {
    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{fullName(user)}</td>
            <td>{user.email}</td>
            <td>
                <Dropdown onSelect={eventKey => handleUserAction({ user, action: eventKey as UserAction['action'] })}>
                    <Dropdown.Toggle as={KebabDropdownToggle} />
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="EDIT">
                            Edit
                        </Dropdown.Item>
                        {!isLoggedIn && (
                            <Dropdown.Item eventKey="DELETE" className="text-danger">
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
