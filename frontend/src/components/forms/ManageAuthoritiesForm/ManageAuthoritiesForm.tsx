import { useContext, useEffect, useState } from 'react';
import { Authorities, type Authority, type User } from '../../../utils/types';
import FlexibleForm, { type ModalOrFormProps } from '../FlexibleForm';
import { Form, Spinner, Table } from 'react-bootstrap';
import { equal } from '../../../utils/collection-utils';
import AuthorityRow from './AuthorityRow';
import { ConstantContext } from '../../../context/ConstantContext';

type ManageAuthoritiesFormProps = {
    user?: User;
    onSubmit: (authorities: Set<Authority>) => Promise<User>;
    submitCallback?: (user: User) => void;
} & ModalOrFormProps;

const ManageAuthoritiesForm = (props: ManageAuthoritiesFormProps) => {
    const { user, onSubmit, submitCallback, handleClose } = props;

    const { authorityPrerequisites } = useContext(ConstantContext);

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
            setAuthorities(user.authorities);
            setInitialAuthorities(user.authorities);
        }
    }, [user]);

    const toggleAuthority = (authority: Authority, value: boolean) => {
        setAuthorities((prev) => {
            const newAuthorities = new Set(prev);

            const removeDependents = (removed: Authority) => {
                authorityPrerequisites?.forEach((requiredAuthorities, candidate) => {
                    if (requiredAuthorities.has(removed)) {
                        newAuthorities.delete(candidate);
                        removeDependents(candidate);
                    }
                });
            };

            if (value) {
                newAuthorities.add(authority);
            }
            else {
                newAuthorities.delete(authority);
                removeDependents(authority);
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
            .catch(({ message }: Error) => {
                setAuthorities(initialAuthorities);
                setError(message);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <FlexibleForm
            {...props}
            submitButtonText="Save authorities"
            isLoading={isLoading}
            isValid={hasChanges}
            handleSubmission={handleSubmission}
        >
            {authorities
                ? (
                    <>
                        <Form.Group>
                            <Table striped borderless>
                                <tbody>
                                    {Authorities.map((authority: Authority) => {
                                        return (
                                            <AuthorityRow
                                                key={authority}
                                                authority={authority}
                                                authorities={authorities}
                                                disabled={
                                                    ![...(authorityPrerequisites?.get(authority) ?? new Set())]
                                                        .every(prerequisite => authorities.has(prerequisite))
                                                }
                                                toggleAuthority={toggleAuthority}
                                                setError={setError}
                                            />
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Form.Group>
                        {error && (
                            <Form.Group>
                                <p className="text-danger">{error}</p>
                            </Form.Group>
                        )}
                    </>
                )
                : (
                    <Spinner className="d-block mx-auto" />
                )}
        </FlexibleForm>
    );
};

export default ManageAuthoritiesForm;
