import { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import AuthoritiesTable from './AuthoritiesTable';
import type { User } from '../../../utils/types';
import { possessive } from '../../../utils/string-utils';
import { title } from '../../../utils/user-utils';

interface ManageAuthoritiesModalProps {
    show: boolean;
    user?: User;
    handleClose: () => void;
}

const ManageAuthoritiesModal = ({ show, user, handleClose }: ManageAuthoritiesModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Manage {user && possessive(title(user))} authorities
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => {e.preventDefault();}}>
                <Modal.Body>
                    {user ? (
                        <AuthoritiesTable selected={user.authorities} />
                    ) : (
                        <Spinner className="d-block mx-auto" />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {isLoading && (
                        <Spinner as="span" className="ms-3" />
                    )}
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        Save authorities
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ManageAuthoritiesModal;
