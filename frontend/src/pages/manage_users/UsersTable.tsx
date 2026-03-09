import { Dropdown, Table } from 'react-bootstrap';
import type { User } from '../../utils/types';
import KebabDropdownToggle from '../../components/KebabDropdownToggle';

interface UsersTableProps {
    users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
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
                    <tr>
                        <td>Placeholder Name</td>
                        <td>{user.email}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle as={KebabDropdownToggle} />
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        This
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        That
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UsersTable;