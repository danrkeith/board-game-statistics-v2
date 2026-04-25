import { Form, Table } from 'react-bootstrap';
import { Authorities, type Authority } from '../../../utils/types';
import { capitalise, screamingSnakeCaseToSentence } from '../../../utils/string-utils';

interface AuthoritiesTableProps {
    selected: Authority[];
}

const AuthoritiesTable = ({ selected }: AuthoritiesTableProps) => {
    return (
        <Table striped>
            <tbody>
                {Authorities.map((authority: Authority) => (
                    <tr key={authority}>
                        <td>
                            <Form.Check
                                type="checkbox"
                                id={authority}
                                checked={selected.includes(authority)}
                            />
                        </td>
                        <td>{capitalise(screamingSnakeCaseToSentence(authority))}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AuthoritiesTable;
