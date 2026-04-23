import { Form, Spinner } from 'react-bootstrap';
import FlexibleForm, { type ModalOrFormProps } from './FlexibleForm';
import { useEffect, useState } from 'react';
import type { User } from '../../utils/types';

type EditUserFormProps = {
    user?: User;
    onSubmit: (firstName: string, lastName: string) => Promise<User>;
    submitCallback?: (user: User) => void;
} & ModalOrFormProps;

const EditUserForm = (props: EditUserFormProps) => {
    const { user, onSubmit, handleClose, submitCallback } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const hasChanges = firstName !== user?.firstName || lastName !== user?.lastName;

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const onInputChange = () => {
        setError(null);
        setShowSuccess(false);
    };

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        onSubmit(firstName, lastName)
            .then((user) => {
                submitCallback?.(user);
                setError(null);
            })
            .then(() => {
                if (handleClose) {
                    handleClose();
                } else {
                    setShowSuccess(true);
                }
            })
            .catch(({ message }: Error) => {
                setError(message);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <FlexibleForm
            {...props}
            submitButtonText="Save changes"
            isLoading={isLoading}
            isValid={hasChanges}
            handleSubmission={handleSubmission}
        >
            {user
                ? (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => {
                                    onInputChange();
                                    setFirstName(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                    onInputChange();
                                    setLastName(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Email address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                disabled
                                value={user.email}
                            />
                        </Form.Group>
                        {error && (
                            <Form.Group>
                                <p className="text-danger">{error}</p>
                            </Form.Group>
                        )}
                        {showSuccess && (
                            <Form.Group>
                                <p className="text-success">Updated successfully</p>
                            </Form.Group>
                        )}
                    </>
                ) : <Spinner className="d-block mx-auto" />
            }
        </FlexibleForm>
    );
};

export default EditUserForm;
