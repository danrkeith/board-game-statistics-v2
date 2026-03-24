import { Button, Modal, Spinner } from 'react-bootstrap';
import type { User } from '../../utils/types';
import { fullName } from '../../utils/user-utils';

interface EditUserModalProps {
    show: boolean;
    handleClose: () => void;
    user: User | null;
}

const EditUserModal = ({ show, handleClose, user }: EditUserModalProps) => {
    const handleSave = () => {
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {user ? (fullName(user) ? `Edit ${fullName(user)}` : `Edit User ${user.id}`) : 'Edit User'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? 'Not yet implemented' : <Spinner className="d-block mx-auto" />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={!user}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={!user}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;
