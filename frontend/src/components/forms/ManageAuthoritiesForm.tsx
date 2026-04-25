import { useEffect, useState } from 'react';
import { Authorities, type Authority, type User } from '../../utils/types';
import FlexibleForm, { type ModalOrFormProps } from './FlexibleForm';
import { Form, Spinner, Table } from 'react-bootstrap';
import { equal } from '../../utils/collection-utils';
import { capitalise, screamingSnakeCaseToSentence } from '../../utils/string-utils';

type ManageAuthoritiesFormProps = {
    user?: User;
    onSubmit: (firstName: string, lastName: string) => Promise<User>;
    submitCallback?: (user: User) => void;
} & ModalOrFormProps;


const ManageAuthoritiesForm = (props: ManageAuthoritiesFormProps) => {
    const { user, handleClose, submitCallback } = props;

    const [initialAuthorities, setInitialAuthorities] = useState<Set<Authority>>();
    const [authorities, setAuthorities] = useState<Set<Authority>>();
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(authorities !== undefined && initialAuthorities !== undefined && !equal(authorities, initialAuthorities));
    }, [authorities, initialAuthorities]);

    useEffect(() => {
        if (user) {
            setAuthorities(new Set(user.authorities));
            setInitialAuthorities(new Set(user.authorities));
        }
    }, [user]);

    const toggleAuthority = (authority: Authority, value: boolean) => {
        setAuthorities((prev) => {
            const newAuthorities = new Set(prev);

            if (value) {
                newAuthorities.add(authority);
            } else {
                newAuthorities.delete(authority);
            }
            
            return newAuthorities;
        });
    };

    return (
        <FlexibleForm
            {...props}
            submitButtonText='Save authorities'
            isLoading={isLoading}
            isValid={isValid}
            handleSubmission={() => {}}
        >
            {authorities ? (
                <Table striped>
                    <tbody>
                        {Authorities.map((authority: Authority) => (
                            <tr key={authority}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        id={authority}
                                        checked={authorities.has(authority)}
                                        onChange={(e) => toggleAuthority(authority, e.target.checked)}
                                    />
                                </td>
                                <td>{capitalise(screamingSnakeCaseToSentence(authority))}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Spinner className="d-block mx-auto" />
            )}
        </FlexibleForm>
    );
};

export default ManageAuthoritiesForm;
