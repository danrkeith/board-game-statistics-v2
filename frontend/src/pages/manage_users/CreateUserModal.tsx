import { Modal } from 'react-bootstrap'
import CreateUserForm from '../../components/forms/CreateUserForm';
import { apiCreateUser } from '../../utils/api/users-api-utils';
import type { User } from '../../utils/types';

interface CreateUserModalProps {
    show: boolean;
    submitCallback: (user: User) => void;
    handleClose: () => void;
}

const CreateUserModal = ({ show, submitCallback, handleClose }: CreateUserModalProps) => {
    const onSubmit = (firstName: string, lastName: string, email: string, password: string) =>
        apiCreateUser({ firstName, lastName, email, password })
            .then(submitCallback);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Create user
                </Modal.Title>
            </Modal.Header>
            <CreateUserForm isInModal submitButtonText="Create" onSubmit={onSubmit} handleClose={handleClose} />
        </Modal>
    )
}

export default CreateUserModal;
