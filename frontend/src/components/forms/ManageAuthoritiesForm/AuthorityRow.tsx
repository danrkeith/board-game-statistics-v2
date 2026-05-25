import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import type { Authority } from '../../../utils/types';
import { capitalise, screamingSnakeCaseToSentence } from '../../../utils/string-utils';
import { InfoCircle } from 'react-bootstrap-icons';
import { useContext, useEffect, useState } from 'react';
import { AuthorityPrerequisitesContext } from '../../../context/AuthoritiesContext';

interface AuthorityRowProps {
    authority: Authority;
    authorities: Set<Authority>;
    disabled: boolean;
    toggleAuthority: (authority: Authority, value: boolean) => void;
    setError: (error: string | null) => void;
}

const AuthorityRow = ({ authority, authorities, disabled, toggleAuthority, setError }: AuthorityRowProps) => {
    const { prerequisites } = useContext(AuthorityPrerequisitesContext);

    useEffect(() => {
        if (disabled) {
            toggleAuthority(authority, false);
            setError(null);
        }
    }, [disabled]);

    const display = (authority : Authority) => capitalise(screamingSnakeCaseToSentence(authority));

    return (
        <tr key={authority}>
            <td>
                {!disabled && (
                    <Form.Check
                        type="checkbox"
                        id={authority}
                        checked={authorities.has(authority)}
                        onChange={(e) => {
                            toggleAuthority(authority, e.target.checked)
                            setError(null);
                        }}
                    />
                )}
            </td>
            <td>
                <div className="d-flex align-items-center">
                    {display(authority)}
                    {prerequisites && prerequisites[authority].length !== 0 && (
                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={(props) =>
                            <Tooltip {...props}>
                                <div>Prerequisites:</div>
                                {prerequisites[authority].map((prerequisite) => (
                                    <div key={prerequisite}>{display(prerequisite)}</div>
                                ))}
                            </Tooltip>
                        }>
                            <InfoCircle size={14} className="mx-2 text-info" />
                        </OverlayTrigger>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default AuthorityRow;
