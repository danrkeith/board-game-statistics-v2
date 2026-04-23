import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'

interface NewUserModalProps {
    show: boolean;
    handleClose: () => void;
}

const NewUserModal = ({ show, handleClose }: NewUserModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    New user
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" disabled={isLoading}>
                    Register user
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewUserModal;
