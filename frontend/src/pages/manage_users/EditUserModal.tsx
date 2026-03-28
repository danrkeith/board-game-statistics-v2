import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import type { User } from '../../utils/types';
import { fullName } from '../../utils/user-utils';
import { useState } from 'react';

interface EditUserModalProps {
    show: boolean;
    handleClose: () => void;
    user: User | null;
}

const EditUserModal = ({ show, handleClose, user }: EditUserModalProps) => {
    const [firstName, setFirstName] = useState(user?.firstName ?? '');
    const [lastName, setLastName] = useState(user?.lastName ?? '');
    const [error, setError] = useState<string | null>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {user ? (fullName(user) ? `Edit ${fullName(user)}` : `Edit User ${user.id}`) : 'Edit User'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {user ? (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Jane"
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
                                    placeholder="Doe"
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
                    ) : <Spinner className="d-block mx-auto" />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={!user}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={!user}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditUserModal;
