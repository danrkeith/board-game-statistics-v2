import { Table } from 'react-bootstrap';
import { Authorities, type Authority } from '../../../utils/types';

interface AuthoritiesTableProps {
    authorities: Authority[];
}

const AuthoritiesTable = ({ authorities }: AuthoritiesTableProps) => {
    return (
        <Table striped>
            <tbody>
                {Authorities.map((authority: Authority) => (
                    <tr key={authority}>
                        <td>{authority}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AuthoritiesTable;
