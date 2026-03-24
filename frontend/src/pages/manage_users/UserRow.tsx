import { Dropdown } from 'react-bootstrap';
import KebabDropdownToggle from '../../components/KebabDropdownToggle';
import type { User } from '../../utils/types';
import { fullName } from '../../utils/user-utils';

interface UserRowProps {
    user: User;
    isLoggedIn: boolean;
    handleDropdownSelect: (eventKey: string, user: User) => void;
}

const UserRow = ({ user, isLoggedIn, handleDropdownSelect }: UserRowProps) => {
    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{fullName(user)}</td>
            <td>{user.email}</td>
            <td>
                <Dropdown onSelect={eventKey => handleDropdownSelect(eventKey!, user)}>
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
