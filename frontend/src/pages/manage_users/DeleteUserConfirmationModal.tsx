import { Button, Modal, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { apiDeleteUser } from '../../utils/api/users-api-utils';
import type { User } from '../../utils/types';
import { title } from '../../utils/user-utils';

interface DeleteUserConfirmationModalProps {
    show: boolean;
    user: User | null;
    confirmCallback: (userId: number) => void;
    handleClose: () => void;
}

const DeleteUserConfirmationModal = ({ show, user, confirmCallback, handleClose }: DeleteUserConfirmationModalProps) => {
    const { callWithAuth } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = () => {
        callWithAuth(apiDeleteUser, user!.id)
            .then(() => confirmCallback(user!.id))
            .then(handleClose)
            .catch(({ message }: Error) => setError(message))
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {user ? (`Delete ${title(user)}`) : 'Delete User'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this user?</p>
                {error && (
                    <p className="text-danger">{error}</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                {isLoading && (
                    <Spinner as="span" className="ms-3" />
                )}
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm} disabled={isLoading}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUserConfirmationModal;
