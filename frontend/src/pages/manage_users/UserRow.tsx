import { Badge, Dropdown } from 'react-bootstrap';
import KebabDropdownToggle from '../../components/dropdowns/KebabDropdownToggle';
import type { User } from '../../utils/types';
import { fullName } from '../../utils/user-utils';
import type { UserAction } from './UsersTable';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

interface UserRowProps {
    user: User;
    handleUserAction: (userAction: UserAction) => void;
}

const UserRow = ({ user, handleUserAction }: UserRowProps) => {
    const { user: currentUser } = useContext(UserContext);

    const isLoggedIn = currentUser?.id === user.id;

    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{fullName(user)}</td>
            <td>
                {user.email}
                {isLoggedIn && <Badge bg="secondary" className="mx-3">You</Badge>}
            </td>
            <td>
                <Dropdown onSelect={eventKey => handleUserAction({ user, action: eventKey as UserAction['action'] })} align="end">
                    <Dropdown.Toggle as={KebabDropdownToggle} />
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="EDIT">
                            Edit
                        </Dropdown.Item>
                        {currentUser?.authorities.includes('GRANT_AUTHORITIES') && (
                            <Dropdown.Item eventKey="MANAGE_AUTHORITIES">
                                Manage authorities
                            </Dropdown.Item>
                        )}
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
