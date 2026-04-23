import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'

interface CreateUserModalProps {
    show: boolean;
    handleClose: () => void;
}

const CreateUserModal = ({ show, handleClose }: CreateUserModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Create user
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isLoading}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateUserModal;
