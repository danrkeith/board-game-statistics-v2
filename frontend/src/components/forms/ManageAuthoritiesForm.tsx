import { useEffect, useState } from 'react';
import { Authorities, type Authority, type User } from '../../utils/types';
import FlexibleForm, { type ModalOrFormProps } from './FlexibleForm';
import { Form, Spinner, Table } from 'react-bootstrap';
import { equal } from '../../utils/collection-utils';
import { capitalise, screamingSnakeCaseToSentence } from '../../utils/string-utils';

type ManageAuthoritiesFormProps = {
    user?: User;
    onSubmit: (authorities: Set<Authority>) => Promise<User>;
    submitCallback?: (user: User) => void;
} & ModalOrFormProps;


const ManageAuthoritiesForm = (props: ManageAuthoritiesFormProps) => {
    const { user, onSubmit, submitCallback, handleClose } = props;

    const [initialAuthorities, setInitialAuthorities] = useState<Set<Authority>>();
    const [authorities, setAuthorities] = useState<Set<Authority>>();
    const [isLoading, setIsLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setHasChanges(authorities !== undefined && initialAuthorities !== undefined && !equal(authorities, initialAuthorities));
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

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        onSubmit(authorities!)
            .then((user) => {
                submitCallback?.(user);
                setError(null);
            })
            .then(() => handleClose?.())
            .catch(({ message }: Error) => setError(message))
            .finally(() => setIsLoading(false));
    };

    return (
        <FlexibleForm
            {...props}
            submitButtonText='Save authorities'
            isLoading={isLoading}
            isValid={hasChanges}
            handleSubmission={handleSubmission}
        >
            {authorities ? (
                <>
                    <Form.Group>
                        <Table striped borderless>
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
                    </Form.Group>
                    {error && (
                        <Form.Group>
                            <p className="text-danger">{error}</p>
                        </Form.Group>
                    )}
                </>
            ) : (
                <Spinner className="d-block mx-auto" />
            )}
        </FlexibleForm>
    );
};

export default ManageAuthoritiesForm;
