import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import type { User } from '../../utils/types';
import { title } from '../../utils/user-utils';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiEditUser } from '../../utils/api/users-api-utils';

interface EditUserModalProps {
    show: boolean;
    user?: User;
    submitCallback: (user: User) => void;
    handleClose: () => void;
}

const EditUserModal = ({ show, user, submitCallback, handleClose }: EditUserModalProps) => {
    const { callWithAuth } = useContext(AuthContext);

    const [firstName, setFirstName] = useState(user?.firstName ?? '');
    const [lastName, setLastName] = useState(user?.lastName ?? '');
    const [error, setError] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        callWithAuth(apiEditUser, {
            id: user!.id,
            firstName,
            lastName,
        })
            .then((user) => {
                submitCallback(user);
                handleClose();
            })
            .catch(({ message }: Error) => setError(message))
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {user ? (`Edit ${title(user)}`) : 'Edit User'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {user
                        ? (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => {
                                            setError(null);
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
                                            setError(null);
                                            setLastName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                {error && (
                                    <Form.Group>
                                        <p className="text-danger">{error}</p>
                                    </Form.Group>
                                )}
                            </>
                        )
                        : <Spinner className="d-block mx-auto" />}
                </Modal.Body>
                <Modal.Footer>
                    {isLoading && (
                        <Spinner as="span" className="ms-3" />
                    )}
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditUserModal;
